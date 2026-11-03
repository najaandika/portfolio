import { useEffect } from 'react';

/**
 * Narrow-screen photo depth: move the image 32px across the viewport while
 * scrolling. The clipped portrait card remains fixed, and the entrance
 * animation stays on its separate outer wrapper.
 */
export default function useHeroMobileParallax(portraitRef) {
  useEffect(() => {
    const frame = portraitRef.current;
    const image = frame?.querySelector('.hero-portrait-image');
    if (!frame || !image) return undefined;

    // No simulated mouse hover, forced gyroscope motion or parallax on desktop.
    const media = window.matchMedia(
      '(max-width: 700px) and (prefers-reduced-motion: no-preference)',
    );

    let disposed = false;
    let generation = 0;
    let tween;
    let gsapCore;

    const cleanup = () => {
      generation += 1;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      tween = undefined;

      // Removing the inline transform restores the original mobile image
      // scale from CSS; it also avoids a stale offset on resize or reduced motion.
      if (gsapCore) gsapCore.set(image, { clearProps: 'transform,willChange' });
      else {
        image.style.removeProperty('transform');
        image.style.removeProperty('will-change');
      }
    };

    const activate = async () => {
      if (disposed || !media.matches || tween) return;
      const ticket = ++generation;
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (disposed || !media.matches || ticket !== generation) return;

        gsapCore = gsap;
        gsap.registerPlugin(ScrollTrigger);
        gsap.set(image, { willChange: 'transform' });

        // A more perceptible 32px drift, still within the clipping frame.
        // 1.13x scale keeps the photograph covering the frame at both ends.
        tween = gsap.fromTo(image,
          { y: -16, scale: 1.13 },
          {
            y: 16,
            scale: 1.13,
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              start: 'top 85%',
              end: 'bottom 20%',
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });
        ScrollTrigger.refresh();
      } catch (error) {
        if (!disposed) {
          console.error('Hero mobile parallax could not load', error);
          cleanup();
        }
      }
    };

    const onMediaChange = () => {
      cleanup();
      if (media.matches) void activate();
    };

    media.addEventListener('change', onMediaChange);
    void activate();

    return () => {
      disposed = true;
      media.removeEventListener('change', onMediaChange);
      cleanup();
    };
  }, [portraitRef]);
}
