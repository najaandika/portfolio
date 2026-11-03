import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/useLanguage';
import Reveal from './Reveal';
import { CredlyIcon, GithubMarkIcon, LinkedinIcon, GmailIcon } from './Icons';

const socials = [
  {
    label: 'Email',
    href: 'mailto:naja.andika3000@gmail.com',
    Icon: GmailIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/najaandika',
    Icon: GithubMarkIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/naja-andika-447234317',
    Icon: LinkedinIcon,
  },
  {
    label: 'Credly',
    href: 'https://www.credly.com/users/naja-andika',
    Icon: CredlyIcon,
  },
];

async function animateScrollTo(targetY) {
  const target = Math.max(0, Math.round(targetY));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: target, behavior: 'instant' });
    return;
  }

  // Global CSS smooth-scroll must be suspended while GSAP controls scroll.
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  const restore = () => { root.style.scrollBehavior = previousScrollBehavior; };

  try {
    const [gsapModule, scrollModule] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollToPlugin'),
    ]);
    const gsap = gsapModule.gsap || gsapModule.default;
    gsap.registerPlugin(scrollModule.ScrollToPlugin);
    gsap.to(window, {
      scrollTo: { y: target, autoKill: false },
      duration: 1,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onComplete: restore,
      onInterrupt: restore,
    });
  } catch {
    window.scrollTo({ top: target, behavior: 'instant' });
    restore();
  }
}

function backToTop() {
  void animateScrollTo(0);
}

export default function Footer() {
  const { t } = useLanguage();
  const footer = t.footer;
  const socialRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const link = ctaRef.current;
    const underline = link?.querySelector('.footer-editorial-hi-underline');
    const arrow = link?.querySelector('.footer-editorial-cta-arrow');
    if (!link || !underline || !arrow) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    let disposed = false;
    let hovered = false;
    let gsapCore;

    const animate = async () => {
      if (reduceMotion.matches || !canHover.matches) return;
      const { gsap } = await import('gsap');
      if (disposed || reduceMotion.matches || !canHover.matches) return;
      gsapCore = gsap;
      gsap.to(underline, {
        scaleX: hovered ? 1 : 0.76,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(arrow, {
        x: hovered ? 2 : 0,
        y: hovered ? -2 : 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const enter = () => { hovered = true; void animate(); };
    const leave = () => { hovered = false; void animate(); };
    link.addEventListener('pointerenter', enter);
    link.addEventListener('pointerleave', leave);

    return () => {
      disposed = true;
      link.removeEventListener('pointerenter', enter);
      link.removeEventListener('pointerleave', leave);
      if (gsapCore) {
        gsapCore.killTweensOf([underline, arrow]);
        gsapCore.set([underline, arrow], { clearProps: 'transform' });
      }
    };
  }, []);

  useEffect(() => {
    const container = socialRef.current;
    if (!container) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const targets = [...container.querySelectorAll('a > span')];
    const hovered = new WeakSet();
    const unbind = [];
    let disposed = false;
    let gsapCore;

    const animate = async (target) => {
      if (reduceMotion.matches || !canHover.matches) return;
      const { gsap } = await import('gsap');
      if (disposed || reduceMotion.matches || !canHover.matches) return;
      gsapCore = gsap;
      const isHovered = hovered.has(target);
      gsap.to(target, {
        y: isHovered ? -3 : 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
        onComplete: isHovered ? undefined : () => gsap.set(target, { clearProps: 'transform' }),
      });
    };

    container.querySelectorAll('a').forEach((link) => {
      const target = link.querySelector('span');
      if (!target) return;
      const enter = () => { hovered.add(target); void animate(target); };
      const leave = () => { hovered.delete(target); void animate(target); };
      link.addEventListener('pointerenter', enter);
      link.addEventListener('pointerleave', leave);
      unbind.push(() => {
        link.removeEventListener('pointerenter', enter);
        link.removeEventListener('pointerleave', leave);
      });
    });

    return () => {
      disposed = true;
      unbind.forEach((cleanup) => cleanup());
      if (gsapCore) {
        gsapCore.killTweensOf(targets);
        gsapCore.set(targets, { clearProps: 'transform' });
      }
    };
  }, []);

  return (
    <Reveal>
      <footer id="contact" className="editorial-footer" aria-label={footer.infoTitle}>
        <div className="footer-editorial-container">
          <div className="footer-editorial-overline">
            <span>{footer.eyebrow}</span>
            <span>{footer.studioNote}</span>
          </div>

          <div className="footer-editorial-intro">
            <div className="footer-editorial-headline">
              <p className="footer-editorial-kicker">{footer.contactLabel}</p>
              <h2>
                <span>{footer.headline1}</span>
                <span>{footer.headline2}</span>
              </h2>
              <a
                ref={ctaRef}
                className="footer-editorial-cta"
                href="https://wa.me/6282125461418"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.hero.whatsappTitle}
              >
                <span>{footer.startBy} <strong className="footer-editorial-hi">{footer.sayingHi}<span className="footer-editorial-hi-underline" aria-hidden="true" /></strong></span>
                <span className="footer-editorial-cta-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="footer-editorial-info">
              <p className="footer-editorial-kicker">{footer.whatIDoLabel}</p>
              <h3 className="footer-editorial-service-title">{footer.whatIDoHeading}</h3>
              <p className="footer-editorial-service-description">{footer.whatIDoDescription}</p>
              <div className="footer-editorial-focus">
                <p className="footer-editorial-kicker">{footer.focusLabel}</p>
                <ul>
                  <li>{footer.focusDevelopment}</li>
                  <li>{footer.focusDesign}</li>
                </ul>
              </div>
              <p className="footer-editorial-location">
                <span>{footer.basedIn}</span>
                {footer.location}
              </p>
            </div>
          </div>

          <div className="footer-editorial-wordmark" aria-label="Naja Andika">
            NAJA<span aria-hidden="true">.</span>
          </div>

          <div className="footer-editorial-bottom">
            <div className="footer-editorial-copyright">
              <span>{footer.copyright}</span>
              <span className="footer-editorial-divider" aria-hidden="true" />
              <span>{footer.bottomNote}</span>
            </div>

            <div ref={socialRef} className="footer-editorial-socials" role="group" aria-label={footer.socialLabel}>
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  data-social={label.toLowerCase()}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  title={label}
                >
                  <span aria-hidden="true"><Icon /></span>
                </a>
              ))}
            </div>

            <button type="button" className="footer-editorial-backtop" onClick={backToTop}>
              {footer.backToTop}
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </footer>
    </Reveal>
  );
}
