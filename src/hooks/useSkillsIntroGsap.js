import { useLayoutEffect } from 'react';

/**
 * One scroll-triggered editorial entrance for the Skills intro.
 * TechMarquee has its own hook and is intentionally never touched here.
 */
export default function useSkillsIntroGsap(introRef) {
  useLayoutEffect(() => {
    const root = introRef.current;
    if (!root) return undefined;

    const kicker = root.querySelector('[data-skills-reveal="kicker"]');
    const title = root.querySelector('[data-skills-reveal="title"]');
    const titleText = root.querySelector('.expertise-title-text');
    const first = root.querySelector('[data-skills-reveal="desc1"]');
    const second = root.querySelector('[data-skills-reveal="desc2"]');
    const link = root.querySelector('[data-skills-reveal="cta"]');
    const arrow = link?.querySelector('[data-skills-arrow]');
    if (!kicker || !title || !titleText || !first || !second || !link || !arrow) return undefined;

    const items = [kicker, title, first, second, link];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    let disposed = false;
    let completed = false;
    let started = false;
    let gsapCore;
    let entrance;
    let observer;
    const unbind = [];

    const clearStyles = () => {
      if (gsapCore) {
        gsapCore.killTweensOf([...items, titleText, arrow]);
        gsapCore.set([...items, titleText, arrow], {
          clearProps: 'opacity,visibility,transform,willChange',
        });
      } else {
        [...items, titleText, arrow].forEach((element) => {
          element.style.removeProperty('opacity');
          element.style.removeProperty('visibility');
          element.style.removeProperty('transform');
          element.style.removeProperty('will-change');
        });
      }
    };

    const finish = () => {
      if (disposed || completed) return;
      completed = true;
      observer?.disconnect();
      root.dataset.skillsIntroReady = 'true';
      clearStyles();
    };

    if (reducedMotion.matches) {
      root.dataset.skillsIntroReady = 'true';
      return () => { delete root.dataset.skillsIntroReady; };
    }

    // Hide only the intro copy before the first paint; leave the marquee alone.
    // With JavaScript disabled, the normal CSS still renders all copy.
    items.forEach((item) => { item.style.opacity = '0'; });

    const setup = async () => {
      try {
        const { gsap } = await import('gsap');
        if (disposed) return;
        gsapCore = gsap;
        if (reducedMotion.matches) {
          finish();
          return;
        }

        const mobile = window.innerWidth <= 700;
        gsap.set([kicker, first, second, link], {
          autoAlpha: 0,
          y: mobile ? 8 : 12,
          willChange: 'transform, opacity',
        });
        gsap.set(titleText, {
          autoAlpha: 0,
          y: mobile ? 16 : 22,
          willChange: 'transform, opacity',
        });
        gsap.set(title, { autoAlpha: 1 });

        const play = () => {
          if (disposed || completed || started) return;
          if (reducedMotion.matches) {
            finish();
            return;
          }
          started = true;
          observer?.disconnect();

          entrance = gsap.timeline({ onComplete: finish });
          entrance
            .to(kicker, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0)
            .to(titleText, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.12)
            .to(first, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.30)
            .to(second, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.45)
            .to(link, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.66);
        };

        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) play();
        }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
        observer.observe(root);

        const hoverArrow = (active) => {
          if (disposed || reducedMotion.matches || !finePointer.matches) return;
          gsap.to(arrow, {
            x: active ? 3 : 0,
            y: active ? -3 : 0,
            duration: 0.22,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: active ? undefined : () => gsap.set(arrow, { clearProps: 'transform' }),
          });
        };
        const onEnter = () => hoverArrow(true);
        const onLeave = () => hoverArrow(false);
        link.addEventListener('pointerenter', onEnter);
        link.addEventListener('pointerleave', onLeave);
        link.addEventListener('focus', onEnter);
        link.addEventListener('blur', onLeave);
        unbind.push(() => {
          link.removeEventListener('pointerenter', onEnter);
          link.removeEventListener('pointerleave', onLeave);
          link.removeEventListener('focus', onEnter);
          link.removeEventListener('blur', onLeave);
        });
      } catch (error) {
        if (!disposed) {
          console.error('Skills intro reveal could not load', error);
          finish();
        }
      }
    };

    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      entrance?.kill();
      finish();
    };

    reducedMotion.addEventListener('change', onMotionChange);
    void setup();

    return () => {
      disposed = true;
      entrance?.kill();
      observer?.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
      unbind.forEach((remove) => remove());
      clearStyles();
      delete root.dataset.skillsIntroReady;
    };
  }, [introRef]);
}
