import { useLayoutEffect } from 'react';

/**
 * One-shot editorial entrance for Education, independent of Experience.
 * Progressive enhancement: content stays visible if GSAP is unavailable.
 */
export default function useEducationCardGsap(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const layout = section.querySelector('.journey-education-layout');
    const heading = section.querySelector('.journey-education-intro .journey-heading');
    const lead = section.querySelector('.journey-education-intro .journey-lead');
    const card = section.querySelector('.journey-education-card');
    const topLabel = card?.querySelector('.journey-degree-label');
    const period = card?.querySelector('.journey-card-period');
    const degree = card?.querySelector('.journey-degree-content h3');
    const university = card?.querySelector('.journey-university');
    const faculty = card?.querySelector('.journey-faculty');
    const icon = card?.querySelector('.journey-degree-icon');
    const gpa = card?.querySelector('.journey-academic-stat');
    const focus = card?.querySelector('.journey-academic-focus');

    if (!layout || !heading || !lead || !card ||
        !topLabel || !period || !degree || !university ||
        !faculty || !icon || !gpa || !focus) return undefined;

    const details = [topLabel, period, degree, university, faculty, icon, gpa, focus];
    const all = [heading, lead, card, ...details];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const allowsHover = window.matchMedia(
      '(min-width: 701px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );

    let disposed = false;
    let finished = false;
    let playing = false;
    let gsap;
    let timeline;
    let observer;
    const cleanupListeners = [];

    const clear = () => {
      if (gsap) {
        gsap.killTweensOf(all);
        gsap.set(all, { clearProps: 'opacity,visibility,transform,willChange,boxShadow,borderColor' });
      } else {
        all.forEach((node) => {
          ['opacity', 'visibility', 'transform', 'will-change', 'box-shadow', 'border-color']
            .forEach((prop) => node.style.removeProperty(prop));
        });
      }
    };

    const complete = () => {
      if (disposed || finished) return;
      finished = true;
      observer?.disconnect();
      section.dataset.educationAnimated = 'true';
      clear();
    };

    // With reduced motion enabled, the unanimated HTML/CSS remains visible.
    if (prefersReduced.matches) {
      section.dataset.educationAnimated = 'true';
      return () => { delete section.dataset.educationAnimated; };
    }

    // useLayoutEffect sets the initial state before the browser paints.
    all.forEach((node) => { node.style.opacity = '0'; });

    const init = async () => {
      try {
        const module = await import('gsap');
        if (disposed) return; // Ignore obsolete StrictMode mounts.
        gsap = module.gsap || module.default;

        if (prefersReduced.matches) {
          complete();
          return;
        }

        const mobile = window.innerWidth <= 700;
        gsap.set([heading, lead], { autoAlpha: 0, y: mobile ? 10 : 16 });
        gsap.set(card, { autoAlpha: 0, y: mobile ? 14 : 24, scale: mobile ? 0.995 : 0.985 });
        gsap.set(details, { autoAlpha: 0, y: mobile ? 6 : 10 });

        const play = () => {
          if (disposed || finished || playing) return;
          if (prefersReduced.matches) {
            complete();
            return;
          }
          playing = true;
          observer?.disconnect();
          const unit = mobile ? 0.8 : 1;

          timeline = gsap.timeline({ onComplete: complete });
          timeline
            .to(heading, { autoAlpha: 1, y: 0, duration: 0.60 * unit, ease: 'power3.out' }, 0)
            .to(lead, { autoAlpha: 1, y: 0, duration: 0.45 * unit, ease: 'power2.out' }, 0.13 * unit)
            .to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 * unit, ease: 'power3.out' }, 0.24 * unit)
            .to([topLabel, period], {
              autoAlpha: 1, y: 0, duration: 0.32 * unit,
              stagger: 0.08 * unit, ease: 'power2.out',
            }, 0.53 * unit)
            .to([degree, university, faculty], {
              autoAlpha: 1, y: 0, duration: 0.40 * unit,
              stagger: 0.10 * unit, ease: 'power2.out',
            }, 0.72 * unit)
            .to(icon, { autoAlpha: 1, y: 0, duration: 0.36 * unit, ease: 'power2.out' }, 0.80 * unit)
            .to([gpa, focus], {
              autoAlpha: 1, y: 0, duration: 0.35 * unit,
              stagger: 0.11 * unit, ease: 'power2.out',
            }, 1.06 * unit);
        };

        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) play();
        }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });
        observer.observe(layout);

        const animateHover = (active) => {
          if (disposed || !finished || !allowsHover.matches) return;
          gsap.to(card, {
            y: active ? -4 : 0,
            boxShadow: active
              ? '0 24px 52px rgba(11, 52, 66, 0.13)'
              : '0 17px 45px rgba(11, 52, 66, 0.07)',
            borderColor: active ? '#b6d1c9' : '#dce6e2',
            duration: active ? 0.30 : 0.36,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: active ? undefined : () => {
              if (!disposed) gsap.set(card, { clearProps: 'transform,boxShadow,borderColor' });
            },
          });
        };

        const onEnter = () => animateHover(true);
        const onLeave = () => animateHover(false);
        card.addEventListener('pointerenter', onEnter);
        card.addEventListener('pointerleave', onLeave);
        cleanupListeners.push(() => {
          card.removeEventListener('pointerenter', onEnter);
          card.removeEventListener('pointerleave', onLeave);
        });
      } catch (error) {
        if (!disposed) {
          console.error('Education reveal could not load', error);
          complete();
        }
      }
    };

    const onMotionChange = () => {
      if (!prefersReduced.matches) return;
      timeline?.kill();
      if (gsap) {
        gsap.killTweensOf(card);
        gsap.set(card, { clearProps: 'transform,boxShadow,borderColor' });
      }
      // Finish immediately if motion becomes restricted during entrance.
      complete();
    };
    prefersReduced.addEventListener('change', onMotionChange);
    void init();

    return () => {
      disposed = true;
      timeline?.kill();
      observer?.disconnect();
      prefersReduced.removeEventListener('change', onMotionChange);
      cleanupListeners.forEach((remove) => remove());
      clear();
      delete section.dataset.educationAnimated;
    };
  }, [sectionRef]);
}
