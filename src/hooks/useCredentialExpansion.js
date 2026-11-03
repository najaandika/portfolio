import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { gsapModulePromise } from '../components/certifications/gsapModule';

const getCompactLimit = () => (
  window.innerWidth <= 700 ? 3 : window.innerWidth <= 1050 ? 4 : 6
);

export default function useCredentialExpansion(filter) {
  const gridRef = useRef(null);
  const expandTimelineRef = useRef(null);
  const expandLockRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [compactLimit, setCompactLimit] = useState(getCompactLimit);
  const compactLimitRef = useRef(compactLimit);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const nextLimit = getCompactLimit();
      // Mobile browser chrome can resize the viewport's HEIGHT while scrolling.
      // Only reconfigure the grid when the actual column breakpoint changes.
      if (nextLimit === compactLimitRef.current) return;
      compactLimitRef.current = nextLimit;
      if (expandTimelineRef.current) {
        expandTimelineRef.current.kill();
        expandTimelineRef.current = null;
        const grid = gridRef.current;
        void gsapModulePromise.then((module) => {
          if (!module || !grid) return;
          const { gsap } = module;
          gsap.set(grid, { clearProps: 'height,overflow' });
          gsap.set(grid.querySelectorAll('.credential-card'), { clearProps: 'opacity,visibility,transform,boxShadow' });
        });
        expandLockRef.current = false;
        setIsExpanding(false);
      }
      setCompactLimit(nextLimit);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => () => {
    expandTimelineRef.current?.kill();
    expandTimelineRef.current = null;
  }, []);

  async function toggleExpanded() {
    if (expandLockRef.current || filter !== 'all') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setExpanded((current) => !current);
      return;
    }
    expandLockRef.current = true;
    setIsExpanding(true);
    try {
      const module = await gsapModulePromise;
      if (!module) {
        setExpanded((current) => !current);
        return;
      }
      const { gsap } = module;
      const grid = gridRef.current;
      if (!grid) return;

      const cards = [...grid.querySelectorAll('.credential-card')];
      const extras = cards.slice(compactLimit);
      gsap.killTweensOf([grid, ...extras]);
      gsap.set(extras, { clearProps: 'opacity,visibility,transform,boxShadow' });
      const startHeight = grid.getBoundingClientRect().height;

      const finish = () => {
        gsap.set(extras, { clearProps: 'opacity,visibility,transform,boxShadow' });
        gsap.set(grid, { clearProps: 'height,overflow' });
        expandTimelineRef.current = null;
        expandLockRef.current = false;
        setIsExpanding(false);
        void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh());
      };

      if (!expanded) {
        // React commits before measuring: avoids Flip's duplicate transforms and
        // stale hidden-card opacity left behind after repeated toggles.
        flushSync(() => setExpanded(true));
        const endHeight = grid.getBoundingClientRect().height;
        gsap.set(grid, { height: startHeight, overflow: 'hidden' });
        gsap.set(extras, { autoAlpha: 0, y: 12 });

        expandTimelineRef.current = gsap.timeline({ onComplete: finish })
          .to(grid, { height: endHeight, duration: 0.53, ease: 'power2.inOut' }, 0)
          .to(extras, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.035, ease: 'power2.out' }, 0.09);
      } else {
        // Measure the bottom of the last retained card without abruptly hiding
        // the extra rows. Fade and shrink together in ONE GSAP timeline.
        const lastCard = cards[compactLimit - 1];
        const endHeight = lastCard.getBoundingClientRect().bottom - grid.getBoundingClientRect().top;
        const scrollState = { y: window.scrollY };
        const scrollTarget = Math.max(0, scrollState.y - (startHeight - endHeight));
        gsap.set(grid, { height: startHeight, overflow: 'hidden' });
        expandTimelineRef.current = gsap.timeline({
          onComplete: () => {
            flushSync(() => setExpanded(false));
            finish();
          },
        })
          .to(grid, { height: endHeight, duration: 0.53, ease: 'power2.inOut' }, 0)
          // Keep the control at a stable viewport position as the preceding
          // rows contract; avoids a sudden scroll clamp near the page bottom.
          .to(scrollState, {
            y: scrollTarget,
            duration: 0.53,
            ease: 'power2.inOut',
            // Force the per-frame position immediately. Global
            // scroll-behavior:smooth would otherwise queue a second animation
            // and make the viewport lag behind the shrinking grid.
            onUpdate: () => window.scrollTo({ top: scrollState.y, behavior: 'instant' }),
          }, 0)
          .to(extras, { autoAlpha: 0, y: -8, duration: 0.2, stagger: 0.025, ease: 'power1.in' }, 0);
      }
    } catch (error) {
      console.error('Certifications expand animation could not load', error);
      setExpanded((current) => !current);
    } finally {
      // The timeline owns the lock until onComplete; failures release it here.
      if (!expandTimelineRef.current) {
        expandLockRef.current = false;
        setIsExpanding(false);
      }
    }
  }

  return { gridRef, expanded, setExpanded, compactLimit, isExpanding, toggleExpanded };
}
