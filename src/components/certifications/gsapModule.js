// Preload GSAP in its own chunk so the modal opens quickly without adding
// the animation engine to the critical-path React bundle.
const gsapModulePromise = import('gsap').catch(() => null);

export { gsapModulePromise };
