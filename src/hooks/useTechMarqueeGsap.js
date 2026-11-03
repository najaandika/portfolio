import { useEffect } from 'react';

/**
 * Two seamless GSAP loops. Each track has two equal-width groups, so moving
 * exactly one group width is visually identical at the repeat boundary.
 * Animation is progressive enhancement: the source lists remain visible
 * and readable without GSAP and in prefers-reduced-motion mode.
 */
export default function useTechMarqueeGsap(rootRef, locale) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const rows = [...root.querySelectorAll('.tech-marquee-row')];
    const viewports = rows.map((row) => row.querySelector('.tech-marquee-viewport'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let disposed = false;
    let visible = false;
    let loading = false;
    let gsap = null;
    let context = null;
    let resizeFrame = 0;
    const animations = new Map();
    const hovering = new Set();
    const focusing = new Set();

    const pauseState = () => {
      rows.forEach((row) => {
        const tween = animations.get(row);
        if (!tween) return;
        if (document.hidden || !visible || hovering.has(row) || focusing.has(row)) {
          tween.pause();
        } else {
          tween.resume();
        }
      });
    };

    const clear = () => {
      context?.revert();
      context = null;
      animations.clear();
      root.classList.remove('tech-marquee--running');
    };

    const start = async () => {
      if (disposed || reducedMotion.matches || !visible || loading || context) return;
      loading = true;
      try {
        // Wait for the actual Poppins glyph widths before measuring the loop.
        const [module] = await Promise.all([import('gsap'), document.fonts.ready]);
        if (disposed || reducedMotion.matches || !visible) return;
        gsap = module.gsap || module.default;

        context = gsap.context(() => {
          rows.forEach((row) => {
            const track = row.querySelector('.tech-marquee-track');
            const group = row.querySelector('.tech-marquee-group');
            const width = group.getBoundingClientRect().width;
            if (!width) return;

            const isMobile = window.innerWidth <= 700;
            const speed = row.dataset.direction === 'left'
              ? (isMobile ? 30 : 46)
              : (isMobile ? 22 : 34);

            const tween = gsap.fromTo(
              track,
              { x: row.dataset.direction === 'left' ? 0 : -width },
              {
                x: row.dataset.direction === 'left' ? -width : 0,
                duration: width / speed,
                ease: 'none',
                repeat: -1,
                immediateRender: true,
              },
            );
            animations.set(row, tween);
          });
        }, root);

        root.classList.add('tech-marquee--running');
        pauseState();
      } catch (error) {
        clear();
        console.error('Tech marquee could not start', error);
      } finally {
        loading = false;
      }
    };

    const refresh = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        if (!visible || reducedMotion.matches) {
          clear();
          return;
        }
        clear();
        void start();
      });
    };

    const handlers = [];
    viewports.forEach((viewport, index) => {
      const row = rows[index];
      const onEnter = () => {
        hovering.add(row);
        pauseState();
      };
      const onLeave = () => {
        hovering.delete(row);
        pauseState();
      };
      const onFocus = () => {
        focusing.add(row);
        pauseState();
      };
      const onBlur = (event) => {
        if (!viewport.contains(event.relatedTarget)) {
          focusing.delete(row);
          pauseState();
        }
      };

      viewport.addEventListener('mouseenter', onEnter);
      viewport.addEventListener('mouseleave', onLeave);
      viewport.addEventListener('focusin', onFocus);
      viewport.addEventListener('focusout', onBlur);
      handlers.push(() => {
        viewport.removeEventListener('mouseenter', onEnter);
        viewport.removeEventListener('mouseleave', onLeave);
        viewport.removeEventListener('focusin', onFocus);
        viewport.removeEventListener('focusout', onBlur);
      });
    });

    const onVisible = (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        if (!context) void start();
        else pauseState();
      } else {
        pauseState();
      }
    };
    const observer = new IntersectionObserver(onVisible, {
      rootMargin: '200px 0px',
      threshold: 0,
    });
    observer.observe(root);

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(refresh) : null;
    viewports.forEach((viewport) => resizeObserver?.observe(viewport));
    rows.forEach((row) => resizeObserver?.observe(row.querySelector('.tech-marquee-group')));
    const onMotionChange = () => {
      if (reducedMotion.matches) clear();
      else if (visible) void start();
    };
    const onVisibility = () => pauseState();

    window.addEventListener('resize', refresh);
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener('change', onMotionChange);

    return () => {
      disposed = true;
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      resizeObserver?.disconnect();
      handlers.forEach((remove) => remove());
      window.removeEventListener('resize', refresh);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', onMotionChange);
      clear();
    };
  }, [rootRef, locale]);
}
