import { useEffect } from 'react';

/**
 * Desktop-only, pointer-driven depth for the actual portrait.
 * Animates a separate inner card so the Hero entrance transform cannot
 * compete with GSAP. No looping or gyroscope animation.
 */
export default function useHeroPortraitTilt(cardRef) {
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const media = window.matchMedia(
      '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    let disposed = false;
    let gsapCore;
    let removeListeners;
    let loading = false;

    const reset = () => {
      removeListeners?.();
      removeListeners = undefined;
      if (!gsapCore) return;
      gsapCore.killTweensOf(card);
      gsapCore.set(card, { clearProps: 'transform,boxShadow,willChange' });
    };

    const enable = async () => {
      if (!media.matches || disposed || loading || removeListeners) return;
      loading = true;
      try {
        const { gsap } = await import('gsap');
        if (disposed || !media.matches) return;
        gsapCore = gsap;

        gsap.set(card, {
          transformPerspective: 1100,
          transformOrigin: 'center center',
          force3D: true,
        });

        const tiltX = gsap.quickTo(card, 'rotationX', {
          duration: 0.45, ease: 'power3.out',
        });
        const tiltY = gsap.quickTo(card, 'rotationY', {
          duration: 0.45, ease: 'power3.out',
        });

        const onMove = (event) => {
          const bounds = card.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          const relativeX = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
          const relativeY = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
          tiltX(-relativeY * 3);
          tiltY(relativeX * 3);
        };
        const onEnter = () => {
          gsap.to(card, {
            boxShadow: '0 30px 56px rgba(8,47,61,0.19)',
            duration: 0.32,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };
        const onLeave = () => {
          tiltX(0);
          tiltY(0);
          gsap.to(card, {
            boxShadow: '0 20px 48px rgba(8,47,61,0.13)',
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };
        card.addEventListener('pointermove', onMove, { passive: true });
        card.addEventListener('pointerenter', onEnter);
        card.addEventListener('pointerleave', onLeave);

        removeListeners = () => {
          card.removeEventListener('pointermove', onMove);
          card.removeEventListener('pointerenter', onEnter);
          card.removeEventListener('pointerleave', onLeave);
        };
      } catch (error) {
        console.error('Hero portrait tilt could not load', error);
      } finally {
        loading = false;
      }
    };

    const onMediaChange = () => {
      reset();
      if (media.matches) void enable();
    };
    media.addEventListener('change', onMediaChange);
    void enable();

    return () => {
      disposed = true;
      media.removeEventListener('change', onMediaChange);
      reset();
    };
  }, [cardRef]);
}
