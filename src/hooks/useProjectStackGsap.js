import { useEffect } from 'react';
import { isPortfolioNavigationActive } from '../utils/navigateToPortfolioSection';

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
    let scrollFrame = 0;
    let deferredActivation = false;
    let deferredRefresh = false;

    const isMobile = () => window.innerWidth < 768;
    const stickyTop = () => (isMobile() ? 90 : 104);

    // Full cards must remain legible and all buttons reachable while sticky.
    const fitsViewport = () =>
      !reduceMotion.matches &&
      cards.every((card) => card.offsetHeight + stickyTop() + 16 <= window.innerHeight);

    const isNearby = () => {
      const { top, bottom } = stack.getBoundingClientRect();
      // Do not activate sticky card gaps after navigation has already passed
      // Projects. Growing the stack above Certifications pushes the active
      // section back down and makes the next swipe feel stuck or reversed.
      const entryBoundary = Math.max(stickyTop() + 24, window.innerHeight * 0.5);
      return bottom > entryBoundary && top < window.innerHeight + 700;
    };

    const removeMotion = () => {
      if (context) {
        context.revert();
        context = null;
      }
      stack.classList.remove('project-stack--animated');
      stack.style.removeProperty('--project-stack-top');
      scrollTrigger = null;
      deferredRefresh = false;
    };

    const activate = async () => {
      if (disposed || !fitsViewport()) {
        removeMotion();
        return;
      }
      // Adding sticky gaps on mobile changes the document height. Never
      // initialize them while another component controls the viewport.
      if (isPortfolioNavigationActive()) {
        if (!context) deferredActivation = true;
        return;
      }
      if (context) return;
      if (loading || !isNearby()) return;

      loading = true;
      try {
        // Only load the animation library when the Projects section approaches.
        const [gsapModule, triggerModule] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (disposed || !fitsViewport() || !isNearby()) return;
        // The GSAP chunks may resolve after navigation has already started.
        if (isPortfolioNavigationActive()) {
          deferredActivation = true;
          return;
        }

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
        deferredActivation = false;
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
        else if (context) {
          if (isPortfolioNavigationActive()) {
            deferredRefresh = true;
            return;
          }
          stack.style.setProperty('--project-stack-top', stickyTop() + 'px');
          scrollTrigger?.refresh();
        } else void activate();
      });
    };

    const onNavigationSettled = (event) => {
      if (disposed) return;
      if (deferredRefresh && context) {
        deferredRefresh = false;
        stack.style.setProperty('--project-stack-top', stickyTop() + 'px');
        scrollTrigger?.refresh();
      }
      // If the user navigated TO Projects, activate after landing there.
      // Navigating past Projects (e.g. Footer -> Hero) must not change gaps.
      if (deferredActivation && event.detail?.id === 'projects') {
        deferredActivation = false;
        void activate();
      }
    };

    const onScrollAfterNavigation = () => {
      if (!deferredActivation || isPortfolioNavigationActive() || scrollFrame) return;
      // Resume a skipped lazy initialization when the user next browses
      // manually. Regular scroll activity still gets the sticky stack effect.
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        if (deferredActivation) void activate();
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
    window.addEventListener('scroll', onScrollAfterNavigation, { passive: true });
    window.addEventListener('portfolio:navigation-settled', onNavigationSettled);
    reduceMotion.addEventListener('change', update);

    return () => {
      disposed = true;
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      observer?.disconnect();
      cardObserver?.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', onScrollAfterNavigation);
      window.removeEventListener('portfolio:navigation-settled', onNavigationSettled);
      reduceMotion.removeEventListener('change', update);
      removeMotion();
    };
  }, [stackRef, contentKey]);
}
