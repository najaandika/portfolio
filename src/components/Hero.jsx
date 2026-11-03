import { useRef } from 'react';
import { useLanguage } from '../context/useLanguage';
import useHeroPortraitTilt from '../hooks/useHeroPortraitTilt';
import useHeroMobileParallax from '../hooks/useHeroMobileParallax';
import useHeroIntroGsap from '../hooks/useHeroIntroGsap';
import { CodeIcon, GraduationCapIcon } from './Icons';
import { navigateToPortfolioSection } from '../utils/navigateToPortfolioSection';

export default function Hero() {
  const { t } = useLanguage();
  const portraitRef = useRef(null);
  const copyRef = useRef(null);
  useHeroPortraitTilt(portraitRef);
  useHeroMobileParallax(portraitRef);
  useHeroIntroGsap(copyRef, t.hero.name, t.hero.role, t.hero.bio);

  return (
    <div id="home" className="notion-grid flex relative min-h-[740px] flex-col bg-[#f6f5ee] px-5 md:px-12 lg:px-20 xl:px-[120px] pb-0" style={{ paddingTop: 'var(--portfolio-header-height)' }}>
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
            <p data-hero-reveal data-hero-bio className="max-w-[450px] text-[#34505a] font-['Poppins'] text-[14px] sm:text-[15px] leading-[1.75]">
              <span className="sr-only">{t.hero.bio}</span>
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
              <a data-hero-cta href="https://cv-naja-andika.figma.site/" target="_blank" rel="noopener noreferrer" title={t.hero.cvTitle} aria-label={`${t.hero.viewCv} — ${t.hero.cvTitle}`} className="group flex w-full min-[380px]:w-[152px] h-[46px] shrink-0 justify-center items-center gap-2 bg-[#f6f5ee] border rounded-full px-4 border-[#176f69] hover:bg-[#176f69] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69]">
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
