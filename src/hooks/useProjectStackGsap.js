import { useEffect } from 'react';

/**
 * An OTO-style sticky stack, using GSAP / ScrollTrigger for scroll-scrubbed
 * scaling. Desktop and mobile share the same behavior when a whole card fits
 * in the viewport. Short screens and reduced-motion users get normal scroll.
 */
export default function useProjectStackGsap(stackRef, contentKey) {
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const cards = [...stack.querySelectorAll('.project-stack-card')];
    if (cards.length < 2) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let loading = false;
    let context = null;
    let scrollTrigger = null;
    let resizeFrame = 0;

    const isMobile = () => window.innerWidth < 768;
    const stickyTop = () => (isMobile() ? 90 : 104);

    // Full cards must remain legible and all buttons reachable while sticky.
    const fitsViewport = () =>
      !reduceMotion.matches &&
      cards.every((card) => card.offsetHeight + stickyTop() + 16 <= window.innerHeight);

    const isNearby = () => {
      const { top, bottom } = stack.getBoundingClientRect();
      return bottom > -700 && top < window.innerHeight + 700;
    };

    const removeMotion = () => {
      if (context) {
        context.revert();
        context = null;
      }
      stack.classList.remove('project-stack--animated');
      stack.style.removeProperty('--project-stack-top');
      scrollTrigger = null;
    };

    const activate = async () => {
      if (disposed || !fitsViewport()) {
        removeMotion();
        return;
      }
      if (context) {
        stack.style.setProperty('--project-stack-top', stickyTop() + 'px');
        scrollTrigger?.refresh();
        return;
      }
      if (loading || !isNearby()) return;

      loading = true;
      try {
        // Only load the animation library when the Projects section approaches.
        const [gsapModule, triggerModule] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (disposed || !fitsViewport()) return;

        const gsap = gsapModule.gsap || gsapModule.default;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        scrollTrigger = ScrollTrigger;
        stack.style.setProperty('--project-stack-top', stickyTop() + 'px');
        stack.classList.add('project-stack--animated');

        context = gsap.context(() => {
          cards.slice(0, -1).forEach((card, index) => {
            gsap.fromTo(
              card,
              { scale: 1 },
              {
                // Keep small-screen text a little larger beneath the next card.
                // The next card arrives later thanks to mobile spacing in CSS.
                scale: () => (isMobile() ? 0.965 : 0.945),
                ease: 'none',
                immediateRender: false,
                scrollTrigger: {
                  trigger: cards[index + 1],
                  // Start the mobile shrink only after the next card reaches
                  // the center region, rather than while its image is entering.
                  start: () => (isMobile() ? 'top 52%' : 'top 62%'),
                  end: () => 'top ' + (stickyTop() + 12) + 'px',
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                },
              }
            );
          });
        }, stack);

        ScrollTrigger.refresh();
      } catch (error) {
        removeMotion();
        console.error('Project stack animation could not load', error);
      } finally {
        loading = false;
      }
    };

    const update = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        if (!fitsViewport()) removeMotion();
        else void activate();
      });
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(() => { void activate(); }, { rootMargin: '700px 0px' })
      : null;

    observer?.observe(stack);
    if (!observer) void activate();

    const cardObserver = 'ResizeObserver' in window
      ? new ResizeObserver(update)
      : null;
    cards.forEach((card) => cardObserver?.observe(card));

    window.addEventListener('resize', update);
    reduceMotion.addEventListener('change', update);

    return () => {
      disposed = true;
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      observer?.disconnect();
      cardObserver?.disconnect();
      window.removeEventListener('resize', update);
      reduceMotion.removeEventListener('change', update);
      removeMotion();
    };
  }, [stackRef, contentKey]);
}
