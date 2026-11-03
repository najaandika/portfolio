import { useEffect } from 'react';

// The Poppins stylesheet is intentionally loaded asynchronously in index.html.
// Prepare the headline's font before revealing its first typed letter, but
// never block the Hero for long on a slow/blocked third-party font request.
async function waitForHeadlineFont(name) {
  const load = async () => {
    const stylesheet = document.querySelector('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
    if (stylesheet && stylesheet.media !== 'all') {
      await new Promise((resolve) => {
        stylesheet.addEventListener('load', resolve, { once: true });
        stylesheet.addEventListener('error', resolve, { once: true });
      });
    }
    await document.fonts?.load('700 64px Poppins', name);
  };
  await Promise.race([
    load().catch(() => {}),
    new Promise((resolve) => window.setTimeout(resolve, 650)),
  ]);
}

/**
 * A single, accessible GSAP timeline for the Hero entrance.
 * The name and role are typed character-by-character using TextPlugin.
 * Hidden layout copies preserve their full widths, so no CLS occurs.
 */
export default function useHeroIntroGsap(scopeRef, name, role, bio) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    const items = [...scope.querySelectorAll('[data-hero-reveal]')];
    const nameEl = scope.querySelector('[data-hero-typewriter-name]');
    const roleEl = scope.querySelector('[data-hero-typewriter-role]');
    const bioWords = [...scope.querySelectorAll('[data-hero-bio-word]')];
    const buttons = [...scope.querySelectorAll('[data-hero-cta]')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
    let disposed = false;
    let gsapCore;
    let entrance;
    const unsubscribers = [];

    const showCompleteText = () => {
      if (nameEl) nameEl.textContent = name;
      if (roleEl) roleEl.textContent = role;
      scope.removeAttribute('data-hero-typing');
    };

    const markReady = () => {
      showCompleteText();
      scope.dataset.heroReady = 'true';
      gsapCore?.set(items, { clearProps: 'opacity,visibility,transform' });
      gsapCore?.set(bioWords, { clearProps: 'opacity,visibility,transform' });
    };

    const stopMotion = (reveal = false) => {
      entrance?.kill();
      entrance = undefined;
      if (gsapCore) {
        const arrows = buttons.map((button) => button.querySelector('[data-hero-arrow]')).filter(Boolean);
        gsapCore.killTweensOf([...items, ...bioWords, ...buttons, ...arrows, nameEl, roleEl].filter(Boolean));
        gsapCore.set([...buttons, ...arrows], { clearProps: 'transform' });
        gsapCore.set(bioWords, { clearProps: 'opacity,visibility,transform' });
      }
      if (reveal) markReady();
    };

    const run = async () => {
      if (reduced.matches) {
        markReady();
        return;
      }
      try {
        const [{ gsap }, { TextPlugin }] = await Promise.all([
          import('gsap'),
          import('gsap/TextPlugin'),
          waitForHeadlineFont(name),
        ]);
        // Obsolete async work must not interfere with React StrictMode's
        // second mounted effect, or erase newly rendered typewriter content.
        if (disposed) return;
        if (reduced.matches) {
          markReady();
          return;
        }
        gsapCore = gsap;
        gsap.registerPlugin(TextPlugin);
        const mobile = window.innerWidth < 701;

        if (scope.dataset.heroReady !== 'true' && nameEl && roleEl && items.length === 6) {
          const [greeting, heading, roleLine, bio, actions, education] = items;
          nameEl.textContent = '';
          roleEl.textContent = '';
          scope.dataset.heroTyping = 'name';

          const nameStart = mobile ? 0.20 : 0.25;
          const nameEnd = nameStart + (mobile ? 0.74 : 0.95);
          const roleStart = nameEnd + 0.10;
          // Keep the bio discoverable early for LCP while the name and role
          // continue their independent typewriter animations.
          const bioStart = mobile ? 0.42 : 0.55;
          const bioStagger = 0.26 / Math.max(1, bioWords.length - 1);

          gsap.set(mobile ? items.filter((item) => item !== bio) : items, { autoAlpha: 0, y: mobile ? 10 : 16 });
          if (!mobile) gsap.set(bioWords, { autoAlpha: 0, y: 8 });
          entrance = gsap.timeline({ onComplete: markReady });
          entrance
            .to(greeting, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 0)
            .to(heading, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out' }, 0.11)
            .to(nameEl, {
              text: { value: name, delimiter: '' },
              duration: mobile ? 0.74 : 0.95,
              ease: 'none',
            }, nameStart)
            .to(roleLine, { autoAlpha: 1, y: 0, duration: 0.31, ease: 'power2.out' }, nameEnd - 0.05)
            .call(() => { scope.dataset.heroTyping = 'role'; }, null, roleStart)
            .to(roleEl, {
              text: { value: role, delimiter: '' },
              duration: mobile ? 0.67 : 0.76,
              ease: 'none',
            }, roleStart)
            .to(bio, { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out' }, bioStart)
            .to(bioWords, {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              stagger: bioStagger,
              ease: 'power2.out',
            }, bioStart + 0.06)
            .to([actions, education], {
              autoAlpha: 1,
              y: 0,
              duration: mobile ? 0.37 : 0.44,
              stagger: mobile ? 0.07 : 0.10,
              ease: 'power2.out',
            }, bioStart + 0.55);
        } else {
          markReady();
        }

        buttons.forEach((button) => {
          const arrow = button.querySelector('[data-hero-arrow]');
          const animate = (active) => {
            if (!hoverable.matches || reduced.matches || disposed) return;
            gsap.to(button, {
              y: active ? -2 : 0,
              duration: 0.22,
              ease: 'power2.out',
              overwrite: 'auto',
              onComplete: active ? undefined : () => gsap.set(button, { clearProps: 'transform' }),
            });
            if (arrow) gsap.to(arrow, {
              x: active ? 2 : 0,
              y: active ? -2 : 0,
              duration: 0.2,
              ease: 'power2.out',
              overwrite: 'auto',
              onComplete: active ? undefined : () => gsap.set(arrow, { clearProps: 'transform' }),
            });
          };
          const onEnter = () => animate(true);
          const onLeave = () => animate(false);
          button.addEventListener('pointerenter', onEnter);
          button.addEventListener('pointerleave', onLeave);
          unsubscribers.push(() => {
            button.removeEventListener('pointerenter', onEnter);
            button.removeEventListener('pointerleave', onLeave);
          });
        });
      } catch (error) {
        if (!disposed) {
          console.error('Hero text animation could not load', error);
          markReady();
        }
      }
    };

    const onReducedChange = () => {
      if (reduced.matches) stopMotion(true);
    };
    reduced.addEventListener('change', onReducedChange);
    void run();

    return () => {
      disposed = true;
      reduced.removeEventListener('change', onReducedChange);
      unsubscribers.forEach((cleanup) => cleanup());
      stopMotion();
    };
  }, [scopeRef, name, role, bio]);
}
