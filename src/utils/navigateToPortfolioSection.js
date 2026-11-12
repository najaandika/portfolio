/**
 * Scroll to a portfolio section using a GSAP-driven numeric proxy.
 * The destination is recomputed every frame, so activation of lazy
 * scroll-driven project stacks cannot leave the user midway down the page.
 * We temporarily suspend CSS smooth-scrolling during the tween.
 */
let activeTween = null;
let activeCleanup = null;
let navigationRequest = 0;

// Project stacking must not change document height midway through a
// programmatic scroll. It can initialize after the destination has settled.
export const isPortfolioNavigationActive = () => activeCleanup !== null;

export async function navigateToPortfolioSection(id, { updateHash = true, duration = 0.95 } = {}) {
  const destination = document.getElementById(id);
  if (!destination) return;

  const request = ++navigationRequest;
  activeTween?.kill();
  activeCleanup?.();

  if (updateHash && window.location.hash !== '#' + id) {
    window.history.pushState(null, '', '#' + id);
  }

  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';

  const getTargetY = () => (
    id === 'home' ? 0
      : Math.max(0, Math.round(
        destination.getBoundingClientRect().top + window.scrollY
        - (document.querySelector('.portfolio-navbar')?.getBoundingClientRect().height ?? 74) - 24,
      ))
  );

  let settleTimer = null;
  let stableChecks = 0;
  const cleanup = () => {
    if (activeCleanup !== cleanup) return;
    if (settleTimer !== null) window.clearTimeout(settleTimer);
    window.removeEventListener('wheel', interruptOnUserScroll);
    window.removeEventListener('touchstart', interruptOnUserScroll);
    root.style.scrollBehavior = previousBehavior;
    activeCleanup = null;
    activeTween = null;
  };
  const interruptOnUserScroll = () => {
    if (request !== navigationRequest) return;
    // Invalidate even an in-flight dynamic import of GSAP. Otherwise its
    // awaited continuation can restart scrolling after the user swipes.
    navigationRequest += 1;
    activeTween?.kill();
    cleanup();
  };
  activeCleanup = cleanup;
  window.addEventListener('wheel', interruptOnUserScroll, { passive: true });
  window.addEventListener('touchstart', interruptOnUserScroll, { passive: true });

  const applyScroll = (top) => window.scrollTo({ top, behavior: 'instant' });

  const finish = () => {
    if (request !== navigationRequest) return;
    applyScroll(getTargetY());
    cleanup();
    window.dispatchEvent(new CustomEvent('portfolio:navigation-settled', { detail: { id } }));
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish();
    return;
  }

  try {
    const gsapModule = await import('gsap');
    if (request !== navigationRequest) return;
    const gsap = gsapModule.gsap || gsapModule.default;

    const checkStable = () => {
      if (request !== navigationRequest) return;
      const remaining = Math.abs(getTargetY() - window.scrollY);
      if (remaining > 4) {
        stableChecks = 0;
        animate(0.32, 'power2.out');
        return;
      }
      stableChecks += 1;
      if (stableChecks >= 6) {
        finish();
        return;
      }
      settleTimer = window.setTimeout(checkStable, 90);
    };

    const animate = (duration, ease) => {
      const startY = window.scrollY;
      const progress = { value: 0 };
      activeTween = gsap.to(progress, {
        value: 1,
        duration,
        ease,
        onUpdate: () => {
          if (request !== navigationRequest) return;
          // The target may move when Projects activates its sticky stack.
          const y = startY + (getTargetY() - startY) * progress.value;
          applyScroll(y);
        },
        onComplete: () => {
          if (request !== navigationRequest) return;
          settleTimer = window.setTimeout(checkStable, 90);
        },
      });
    };

    animate(duration, 'power2.inOut');
  } catch {
    finish();
  }
}
