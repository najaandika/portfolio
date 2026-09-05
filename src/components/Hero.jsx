import { useEffect, useState } from 'react';
import { GraduationIcon, PhoneIcon } from './Icons';
import Reveal from './Reveal';

const navItems = [
  { label: 'SKILLS', target: 'skills' },
  { label: 'PROJECTS', target: 'projects' },
  { label: 'EDUCATION', target: 'education' },
  { label: 'EXPERIENCE', target: 'experience' },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.target);
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
    if (!menuOpen) return;

    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <Reveal><div id="home" className="notion-grid flex relative min-h-[740px] flex-col bg-[#f6f5ee] px-5 md:px-12 lg:px-20 xl:px-[120px] pt-[82px] pb-0">
      <div className="fixed left-1/2 top-0 z-50 flex h-[82px] w-full max-w-[1440px] -translate-x-1/2 shrink-0 items-center gap-4 border-b border-[#dce6e2]/70 bg-[#f6f5ee]/82 px-6 shadow-[0px_10px_30px_rgba(8,47,61,0.04)] backdrop-blur-xl md:gap-8 md:px-12 lg:px-20 xl:px-[120px]">
        <div className="w-[112px] md:w-[150px] shrink-0 text-[#0b3442] font-['Caveat'] text-[34px] font-semibold leading-none">Naja</div>

        <div className="hidden md:flex justify-center items-center flex-1 gap-[42px]">
          {navItems.map((item) => {
            const isActive = activeSection === item.target;

            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.target)}
                className={`relative w-fit font-['Poppins'] text-[11px] font-semibold leading-normal transition-colors after:absolute after:left-1/2 after:top-[20px] after:h-1 after:-translate-x-1/2 after:rounded-full after:bg-[#176f69] after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-[#176f69] after:w-4'
                    : 'text-[#102f39] hover:text-[#176f69] after:w-0 hover:after:w-3'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <a href="https://wa.me/6282125461418" target="_blank" rel="noopener noreferrer" title="Contact Naja via WhatsApp" aria-label="Contact Naja via WhatsApp in a new tab" className="hidden md:block w-fit shrink-0 text-[#102f39] font-['Poppins'] text-xs font-medium leading-normal hover:text-[#176f69] transition-colors">0821-2546-1418</a>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <a href="https://wa.me/6282125461418" target="_blank" rel="noopener noreferrer" title="Contact Naja via WhatsApp" aria-label="Contact Naja via WhatsApp in a new tab" className="size-10 flex shrink-0 justify-center items-center bg-white shadow-[0px_8px_20px_rgba(8,47,61,0.06)] rounded-full hover:shadow-[0px_8px_20px_rgba(8,47,61,0.15)] transition-shadow">
          <div className="size-[17px] text-[#176f69]">
            <PhoneIcon />
          </div>
        </a>

        </div>
        <button
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          className="md:hidden size-10 flex justify-center items-center bg-white shadow-[0px_8px_20px_rgba(8,47,61,0.08)] rounded-full transition-transform duration-300 hover:-translate-y-0.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="relative size-5 text-[#176f69]">
            <span className={`absolute left-0 top-[4px] h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`}></span>
            <span className={`absolute left-0 top-[10px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute left-0 top-[16px] h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`}></span>
          </div>
        </button>
      </div>

      {menuOpen && (
        <>
          <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-transparent md:hidden" onClick={() => setMenuOpen(false)}></button>
          <div className="fixed left-6 right-6 top-[92px] z-50 flex origin-top flex-col items-center gap-4 rounded-2xl border border-[#edf0ee] bg-white/95 py-5 shadow-xl backdrop-blur-xl animate-[mobile-menu-in_220ms_cubic-bezier(.22,1,.36,1)] md:hidden">
            {navItems.map((item) => {
              const isActive = activeSection === item.target;

              return (
                <button
                  key={item.label}
                  onClick={() => { scrollTo(item.target); setMenuOpen(false); }}
                  className={`w-fit rounded-full px-4 py-1.5 font-['Poppins'] text-[13px] font-semibold leading-normal transition-colors ${
                    isActive ? 'bg-[#e4f0ee] text-[#176f69]' : 'text-[#102f39] hover:text-[#176f69]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}

        <div className="flex flex-col lg:flex-row bg-[#f6f5ee] flex-1 gap-8 lg:gap-[42px]">
        <div className="flex w-full lg:w-[60%] flex-col pt-10 lg:pt-[92px] pb-8 lg:pb-[58px] px-0 gap-5">
          <div className="hero-enter flex flex-col gap-1.5">
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[40px] sm:text-[46px] md:text-[56px] lg:text-[64px] font-bold leading-[0.98] tracking-[-2px]">Hello, I'm</div>
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[40px] sm:text-[46px] md:text-[56px] lg:text-[64px] font-bold leading-[0.98] tracking-[-2px]">Naja Andika</div>
          </div>
          <div className="hero-enter max-w-[430px] text-[#34505a] font-['Poppins'] text-[15px] leading-[1.75]">Information Systems graduate building responsive web apps, clean interfaces, and practical digital workflows.</div>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=naja.andika3000@gmail.com" target="_blank" rel="noopener noreferrer" title="Send email to Naja" aria-label="Send email to Naja in a new tab" className="hero-enter w-fit pt-0 pb-1 border-b text-[#0b3442] font-['Poppins'] text-xs font-medium leading-normal px-0 mx-0 border-b-[#0b3442] hover:text-[#176f69] hover:border-b-[#176f69] transition-colors">naja.andika3000@gmail.com</a>
          <div className="hero-enter flex h-fit flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center gap-3">
            <button onClick={() => scrollTo('projects')} className="flex w-full min-[380px]:w-[142px] h-[46px] shrink-0 justify-center items-center bg-[#176f69] shadow-[0px_8px_20px_rgba(23,111,105,0.18)] rounded-full px-5 py-0 hover:-translate-y-0.5 hover:bg-[#145a55] hover:shadow-[0px_12px_26px_rgba(23,111,105,0.26)] transition-all duration-300">
              <div className="w-fit text-white font-['Poppins'] text-xs font-semibold leading-normal">View My Work</div>
            </button>
            <a href="https://cv-naja-andika.figma.site/" target="_blank" rel="noopener noreferrer" download title="Download Naja CV" aria-label="Download Naja CV in a new tab" className="flex w-full min-[380px]:w-[142px] h-[46px] shrink-0 justify-center items-center bg-[#f6f5ee] border rounded-full px-5 py-0 border-[#176f69] hover:-translate-y-0.5 hover:bg-[#176f69] group transition-all duration-300">
              <div className="w-fit text-[#176f69] font-['Poppins'] text-xs font-semibold leading-normal group-hover:text-white transition-colors">Download CV</div>
            </a>
          </div>
          <div className="hero-enter flex items-center gap-4 pt-2">
            <div className="size-[60px] flex justify-center items-center bg-[#fffdf8] rounded-full border-2 border-[#111111]">
              <div className="size-[28px] text-[#111111]">
                <GraduationIcon />
              </div>
            </div>
            <div className="flex flex-col text-[#111111] text-[15px] font-medium leading-[1.35]">
              <div className="w-fit text-black font-['Inter'] text-sm font-medium">INFORMATION</div>
              <div className="w-fit text-black font-['Inter'] text-sm font-medium">SYSTEMS</div>
              <div className="w-fit text-black font-['Inter'] text-sm font-medium">WEB DEVELOPER</div>
            </div>
          </div>
        </div>

        <div className="flex w-full lg:w-[40%] min-h-[340px] sm:min-h-[420px] lg:min-h-[650px] flex-col shrink-0 justify-end">
          <img
            src="/images/hero-640.webp"
            srcSet="/images/hero-480.webp 480w, /images/hero-640.webp 640w"
            sizes="(min-width: 1024px) 40vw, 640px"
            alt="Naja Andika"
            width="520"
            height="650"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="flex w-full h-[340px] sm:h-[420px] lg:h-[650px] shrink-0 object-cover object-center rounded-3xl shadow-[0px_20px_48px_rgba(8,47,61,0.13)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.015]"
          />
        </div>
      </div>
    </div></Reveal>
  );
}
