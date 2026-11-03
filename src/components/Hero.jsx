import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import useHeroPortraitTilt from '../hooks/useHeroPortraitTilt';
import useHeroMobileParallax from '../hooks/useHeroMobileParallax';
import useHeroIntroGsap from '../hooks/useHeroIntroGsap';
import { CodeIcon, GraduationCapIcon } from './Icons';
import LanguageSwitcher from './LanguageSwitcher';
import { navigateToPortfolioSection } from '../utils/navigateToPortfolioSection';

export default function Hero() {
  const { t } = useLanguage();
  const portraitRef = useRef(null);
  const copyRef = useRef(null);
  const pendingMobileTarget = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  useHeroPortraitTilt(portraitRef);
  useHeroMobileParallax(portraitRef);
  useHeroIntroGsap(copyRef, t.hero.name, t.hero.role, t.hero.bio);

  useEffect(() => {
    const sectionIds = ['skills', 'projects', 'education', 'experience', 'certifications'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    function clearActiveNearTop() {
      if (window.scrollY < 320) setActiveSection('');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
        clearActiveNearTop();
      },
      { threshold: [0.18, 0.35, 0.6], rootMargin: '-24% 0px -48% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', clearActiveNearTop, { passive: true });
    clearActiveNearTop();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', clearActiveNearTop);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = document.getElementById('mobile-navigation');
    panel?.querySelector('a[href^="#"]')?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.querySelector('button[aria-controls="mobile-navigation"]')?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const focusable = [...panel.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    const media = window.matchMedia('(min-width: 1024px)');
    const onDesktop = () => { if (media.matches) setMenuOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    media.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
      media.removeEventListener('change', onDesktop);
    };
  }, [menuOpen]);

  // The overlay locks body scrolling. Navigate only after its cleanup has
  // unlocked the page, otherwise a smooth-scroll anchor can silently fail.
  useEffect(() => {
    if (menuOpen || !pendingMobileTarget.current) return undefined;
    const target = pendingMobileTarget.current;
    pendingMobileTarget.current = null;
    const frame = window.requestAnimationFrame(() => {
      void navigateToPortfolioSection(target);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [menuOpen]);

  const handleMobileNavigation = (event, target) => {
    event.preventDefault();
    pendingMobileTarget.current = target;
    setMenuOpen(false);
  };

  const handleDesktopNavigation = (event, target) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey) return;
    event.preventDefault();
    void navigateToPortfolioSection(target);
  };

  return (
    <div id="home" className="notion-grid flex relative min-h-[740px] flex-col bg-[#f6f5ee] px-5 md:px-12 lg:px-20 xl:px-[120px] pb-0" style={{ paddingTop: 'var(--portfolio-header-height)' }}>
        <header className="portfolio-navbar" data-menu-open={menuOpen}>
          <div className="portfolio-navbar-inner">
          <a
            href="#home"
            title={t.hero.homeTitle}
            aria-label={t.hero.homeTitle}
            onClick={(event) => menuOpen
              ? handleMobileNavigation(event, 'home')
              : handleDesktopNavigation(event, 'home')}
            className="portfolio-navbar-brand"
          >
            Naja<span aria-hidden="true">.</span>
          </a>

          <nav className="portfolio-navbar-links" aria-label={t.hero.desktopNavLabel}>
            {t.nav.map((item) => {
              const isActive = activeSection === item.target;

              return (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(event) => handleDesktopNavigation(event, item.target)}
                  aria-current={isActive ? 'location' : undefined}
                  data-active={isActive}
                  className="portfolio-navbar-link"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="portfolio-navbar-actions">
            <div className="portfolio-navbar-language">
              <LanguageSwitcher />
            </div>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? t.hero.menuClose : t.hero.menuOpen}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            className="portfolio-navbar-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="portfolio-navbar-menu-lines" aria-hidden="true">
              <span/><span/><span/>
            </span>
          </button>
          </div>
        </header>

        {menuOpen && (
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={t.hero.mobileNavLabel}
            className="portfolio-navbar-panel"
          >
            <p className="mb-5 font-['Poppins'] text-xs font-medium uppercase tracking-[0.09em] text-[#176f69]">
              {t.hero.menuEyebrow}
            </p>
            <nav aria-label={t.hero.mobileNavLabel} className="flex flex-col border-t border-[#dce6e2]">
              {t.nav.map((item, index) => (
                <a
                  key={item.target}
                  href={'#' + item.target}
                  onClick={(event) => handleMobileNavigation(event, item.target)}
                  aria-current={activeSection === item.target ? 'location' : undefined}
                  className="portfolio-navbar-panel-link flex min-h-[60px] items-center gap-4 border-b border-[#dce6e2] py-2 font-['Poppins'] text-[#0b3442] transition-colors hover:text-[#176f69]"
                >
                  <span className="w-7 text-xs font-medium text-[#176f69]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-[clamp(22px,4.8vw,26px)] font-medium tracking-[-0.035em]">{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="portfolio-navbar-panel-footer mt-auto flex items-center pt-8">
              <LanguageSwitcher />
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row bg-[#f6f5ee] flex-1 gap-8 lg:gap-[42px]">
          <div ref={copyRef} className="hero-copy flex w-full lg:w-[60%] flex-col pt-10 lg:pt-[92px] pb-8 lg:pb-[58px] px-0 gap-[17px]">
            <div className="flex flex-col gap-[9px]">
              <p data-hero-reveal className="w-fit text-[#176f69] font-['Poppins'] text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.09em]">{t.hero.greeting}</p>
              <h1 data-hero-reveal aria-label={`${t.hero.name}.`} className="w-fit max-w-full text-[#0b3442] font-['Poppins'] text-[clamp(38px,5vw,64px)] font-bold leading-[1.04] tracking-[-0.05em]">
                <span className="hero-typewriter-space" aria-hidden="true">
                  <span className="hero-typewriter-reserve">{t.hero.name}</span>
                  <span data-hero-typewriter-name className="hero-typewriter-live" />
                </span><span aria-hidden="true" className="text-[#176f69]">.</span>
              </h1>
              <p data-hero-reveal className="flex items-center gap-2.5 pt-1 text-[#176f69] font-['Poppins'] text-[14px] sm:text-[16px] font-semibold leading-[1.5]">
                <span className="hero-role-icon block size-5 shrink-0" aria-hidden="true"><CodeIcon /></span>
                <span className="sr-only">{t.hero.role}</span>
                <span className="hero-typewriter-space" aria-hidden="true">
                  <span className="hero-typewriter-reserve" aria-hidden="true">{t.hero.role}</span>
                  <span data-hero-typewriter-role className="hero-typewriter-live" aria-hidden="true" />
                </span>
              </p>
            </div>
            <p data-hero-reveal aria-label={t.hero.bio} className="max-w-[450px] text-[#34505a] font-['Poppins'] text-[14px] sm:text-[15px] leading-[1.75]">
              <span aria-hidden="true">
                {t.hero.bio.trim().split(/\s+/).map((word, index) => (
                  <span key={index}>
                    <span data-hero-bio-word className="hero-bio-word">{word}</span>{' '}
                  </span>
                ))}
              </span>
            </p>
            <div data-hero-reveal className="flex h-fit flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center gap-3">
              <button data-hero-cta type="button" onClick={() => void navigateToPortfolioSection('projects')} className="group flex w-full min-[380px]:w-[162px] h-[46px] shrink-0 justify-center items-center gap-2 bg-[#176f69] shadow-[0px_8px_20px_rgba(23,111,105,0.18)] rounded-full px-4 hover:bg-[#145a55] hover:shadow-[0px_12px_26px_rgba(23,111,105,0.26)] transition-[background-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69]">
                <span className="text-white font-['Poppins'] text-xs font-semibold leading-normal">{t.hero.viewWork}</span>
                <svg data-hero-arrow viewBox="0 0 24 24" className="size-4 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10" /></svg>
              </button>
              <a data-hero-cta href="https://cv-naja-andika.figma.site/" target="_blank" rel="noopener noreferrer" title={t.hero.cvTitle} aria-label={t.hero.cvTitle} className="group flex w-full min-[380px]:w-[152px] h-[46px] shrink-0 justify-center items-center gap-2 bg-[#f6f5ee] border rounded-full px-4 border-[#176f69] hover:bg-[#176f69] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69]">
                <span className="text-[#176f69] font-['Poppins'] text-xs font-semibold leading-normal group-hover:text-white transition-colors">{t.hero.viewCv}</span>
                <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-[#176f69] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>
              </a>
            </div>
            <div data-hero-reveal className="flex w-fit max-w-full items-center gap-3 border-t border-[#dce6e2] pt-4">
              <span className="hero-education-icon block size-[26px] shrink-0 text-[#176f69]" aria-hidden="true"><GraduationCapIcon /></span>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-[#0b3442] font-['Poppins'] text-[12px] sm:text-[13px] font-semibold leading-[1.35]">{t.hero.badgeEducation}</span>
                <span className="text-[#56706f] font-['Poppins'] text-[11px] leading-[1.35]">{t.hero.badgeDegree}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full lg:w-[40%] flex-col shrink-0 items-center lg:items-end justify-end">
            <div className="hero-enter-photo hero-portrait-entrance aspect-[4/5] w-full max-w-[460px] shrink-0">
              <div ref={portraitRef} className="hero-portrait-tilt h-full w-full">
                <img
                  src="/images/hero-640.webp"
                  srcSet="/images/hero-480.webp 480w, /images/hero-640.webp 640w, /images/hero-960.webp 960w, /images/hero-1200.webp 1200w"
                  sizes="(min-width: 1440px) 480px, (min-width: 1280px) calc((100vw - 240px) * 0.4), (min-width: 1024px) calc((100vw - 160px) * 0.4), (min-width: 768px) min(460px, calc(100vw - 96px)), min(460px, calc(100vw - 40px))"
                  alt="Naja Andika"
                  width="1200"
                  height="1600"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="hero-portrait-image block h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
