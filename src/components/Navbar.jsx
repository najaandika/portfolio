import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import { navigateToPortfolioSection } from '../utils/navigateToPortfolioSection';

export default function Navbar() {
  const { t } = useLanguage();
  const pendingMobileTarget = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
    <>
        <header className="portfolio-navbar" data-menu-open={menuOpen}>
          <div className="portfolio-navbar-inner">
          <a
            href="#home"
            title={t.hero.homeTitle}
            aria-label={`Naja. — ${t.hero.homeTitle}`}
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

    </>
  );
}
