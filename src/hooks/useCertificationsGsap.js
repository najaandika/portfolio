import { useEffect, useRef } from 'react';

/**
 * GSAP enhancement for Certifications. Keep all cards visible before the
 * animation is ready; only pre-hide cards that are still BELOW the viewport.
 * This prevents visible cards from flashing on first load, on deep links, or
 * when filters re-render the grid.
 */
export default function useCertificationsGsap(sectionRef, filter) {
  const revealed = useRef(new Set());
  const introRevealed = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
    const cards = [...section.querySelectorAll('.credential-card')];
    const intro = section.querySelector('.credentials-intro');
    const introItems = intro
      ? [intro.querySelector('.credentials-intro-title'), intro.querySelector('.credentials-intro-aside')].filter(Boolean)
      : [];
    const arrows = cards.map((card) => card.querySelector('.credential-card-action-icon')).filter(Boolean);

    let disposed = false;
    let loading = false;
    let ready = false;
    let context;
    let gsapCore;
    let cleanupListeners = [];

    function clear() {
      cleanupListeners.forEach((cleanup) => cleanup());
      cleanupListeners = [];
      context?.revert();
      context = undefined;
      if (gsapCore) {
        gsapCore.killTweensOf([...cards, ...introItems, ...arrows]);
        gsapCore.set([...cards, ...introItems], { clearProps: 'opacity,visibility,transform,boxShadow' });
        gsapCore.set(arrows, { clearProps: 'transform' });
      }
    }

    async function enable() {
      if (disposed || reduced.matches || context || loading) return;
      loading = true;

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (disposed || reduced.matches) return;
        gsapCore = gsap;
        gsap.registerPlugin(ScrollTrigger);

        const isMobile = window.innerWidth < 701;
        const columns = isMobile ? 1 : window.innerWidth < 1051 ? 2 : 3;

        context = gsap.context(() => {
          if (intro && !introRevealed.current) {
            // Already onscreen? Keep it visible instead of flashing it to 0.
            if (intro.getBoundingClientRect().top < window.innerHeight * 0.90) {
              introRevealed.current = true;
            } else {
              gsap.fromTo(introItems, { autoAlpha: 0, y: 15 }, {
                autoAlpha: 1, y: 0,
                duration: 0.58, stagger: 0.09, ease: 'power2.out',
                immediateRender: true,
                scrollTrigger: { trigger: intro, start: 'top 89%', once: true },
                onStart: () => { introRevealed.current = true; },
                onComplete: () => gsap.set(introItems, { clearProps: 'opacity,visibility,transform' }),
              });
            }
          }

          cards.forEach((card, index) => {
            const id = card.dataset.credentialId;
            if (!card.hidden && !revealed.current.has(id)) {
              const rect = card.getBoundingClientRect();
              if (rect.top < window.innerHeight * 0.92) {
                // Don't hide an already-visible card just to animate it.
                revealed.current.add(id);
              } else {
                gsap.fromTo(card, {
                  autoAlpha: 0,
                  y: isMobile ? 12 : 18,
                }, {
                  autoAlpha: 1,
                  y: 0,
                  duration: isMobile ? 0.44 : 0.60,
                  delay: isMobile ? 0 : (index % columns) * 0.055,
                  ease: 'power2.out',
                  immediateRender: true,
                  scrollTrigger: { trigger: card, start: 'top 90%', once: true },
                  onStart: () => { revealed.current.add(id); },
                  onComplete: () => gsap.set(card, { clearProps: 'opacity,visibility,transform' }),
                });
              }
            }

            if (!hoverable.matches) return;

            const action = card.querySelector('.credential-card-action');
            const arrow = card.querySelector('.credential-card-action-icon');
            const enter = () => {
              if (card.hidden) return;
              gsap.to(card, {
                y: -4,
                boxShadow: '0 18px 38px rgba(8,47,61,0.10)',
                duration: 0.22,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            };
            const leave = () => {
              gsap.to(card, {
                y: 0,
                boxShadow: '0 0 0 rgba(8,47,61,0)',
                duration: 0.22,
                ease: 'power2.out',
                overwrite: 'auto',
                onComplete: () => gsap.set(card, { clearProps: 'transform,boxShadow' }),
              });
            };
            const arrowEnter = () => {
              if (arrow) gsap.to(arrow, {
                x: 2, y: -2, duration: 0.18, ease: 'power2.out', overwrite: 'auto',
              });
            };
            const arrowLeave = () => {
              if (arrow) gsap.to(arrow, {
                x: 0, y: 0, duration: 0.18, ease: 'power2.out', overwrite: 'auto',
              });
            };

            card.addEventListener('pointerenter', enter);
            card.addEventListener('pointerleave', leave);
            action?.addEventListener('pointerenter', arrowEnter);
            action?.addEventListener('pointerleave', arrowLeave);
            cleanupListeners.push(() => {
              card.removeEventListener('pointerenter', enter);
              card.removeEventListener('pointerleave', leave);
              action?.removeEventListener('pointerenter', arrowEnter);
              action?.removeEventListener('pointerleave', arrowLeave);
            });
          });
        }, section);

        ScrollTrigger.refresh();
      } catch (error) {
        clear();
        console.error('Certifications animation could not load', error);
      } finally {
        loading = false;
      }
    }

    // Prepare cards well before the section enters the viewport.
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          ready = true;
          observer.disconnect();
          void enable();
        }
      }, { rootMargin: '950px 0px' })
      : null;

    if (observer) observer.observe(section);
    else {
      ready = true;
      void enable();
    }

    const onMotionChange = () => {
      if (reduced.matches) clear();
      else if (ready) void enable();
    };
    reduced.addEventListener('change', onMotionChange);

    return () => {
      disposed = true;
      observer?.disconnect();
      reduced.removeEventListener('change', onMotionChange);
      clear();
    };
  }, [sectionRef, filter]);
}
