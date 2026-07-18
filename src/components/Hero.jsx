import { useState } from 'react';
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

  return (
    <Reveal><div id="home" className="flex relative min-h-[740px] flex-col bg-[#f6f5ee] px-6 md:px-12 lg:px-20 xl:px-[120px] py-0">
      <div className="flex h-[82px] shrink-0 items-center gap-4 md:gap-8">
        <div className="w-[150px] shrink-0 text-[#0b3442] font-['Caveat'] text-[34px] font-semibold leading-none">Naja</div>

        <div className="hidden md:flex justify-center items-center flex-1 gap-[42px]">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.target)}
              className="w-fit text-[#102f39] font-['Poppins'] text-[11px] font-semibold leading-normal hover:text-[#176f69] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <a href="tel:082125461418" className="hidden md:block w-fit shrink-0 text-[#102f39] font-['Poppins'] text-xs font-medium leading-normal hover:text-[#176f69] transition-colors">0821-2546-1418</a>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <a href="tel:082125461418" className="size-10 flex shrink-0 justify-center items-center bg-white shadow-[0px_8px_20px_rgba(8,47,61,0.06)] rounded-full hover:shadow-[0px_8px_20px_rgba(8,47,61,0.15)] transition-shadow">
          <div className="size-[17px] text-[#176f69]">
            <PhoneIcon />
          </div>
        </a>

        </div>
        <button className="md:hidden size-10 flex justify-center items-center bg-white shadow-[0px_8px_20px_rgba(8,47,61,0.08)] rounded-full" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="size-5 text-[#176f69]">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="flex md:hidden absolute left-6 right-6 top-[82px] flex-col items-center gap-4 py-5 bg-white rounded-2xl shadow-xl z-50 border border-[#edf0ee]">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { scrollTo(item.target); setMenuOpen(false); }}
              className="w-fit text-[#102f39] font-['Poppins'] text-[13px] font-semibold leading-normal hover:text-[#176f69] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

        <div className="flex flex-col lg:flex-row bg-[#f6f5ee] flex-1 gap-[42px]">
        <div className="flex w-full lg:w-[60%] flex-col pt-12 lg:pt-[92px] pb-[58px] px-0 gap-5">
          <div className="flex flex-col gap-1.5">
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[44px] md:text-[56px] lg:text-[64px] font-bold leading-[0.98] tracking-[-2px]">Hello, I'm</div>
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[44px] md:text-[56px] lg:text-[64px] font-bold leading-[0.98] tracking-[-2px]">Naja Andika</div>
          </div>
          <div className="max-w-[400px] text-[#34505a] font-['Poppins'] text-[15px] leading-[1.75]">Information Systems graduate focused on web development and intuitive digital experiences.</div>
          <a href="mailto:naja.andika3000@gmail.com" className="w-fit pt-0 pb-1 border-b text-[#0b3442] font-['Poppins'] text-xs font-medium leading-normal px-0 mx-0 border-b-[#0b3442] hover:text-[#176f69] hover:border-b-[#176f69] transition-colors">naja.andika3000@gmail.com</a>
          <div className="flex h-fit items-center gap-3">
            <button onClick={() => scrollTo('projects')} className="flex w-[142px] h-[46px] shrink-0 justify-center items-center bg-[#176f69] shadow-[0px_8px_20px_rgba(23,111,105,0.18)] rounded-full px-5 py-0 hover:bg-[#145a55] transition-colors">
              <div className="w-fit text-white font-['Poppins'] text-xs font-semibold leading-normal">View My Work</div>
            </button>
            <a href="mailto:naja.andika3000@gmail.com" className="flex w-[142px] h-[46px] shrink-0 justify-center items-center bg-[#f6f5ee] border rounded-full px-5 py-0 border-[#176f69] hover:bg-[#176f69] group transition-colors">
              <div className="w-fit text-[#176f69] font-['Poppins'] text-xs font-semibold leading-normal group-hover:text-white transition-colors">Download CV</div>
            </a>
          </div>
          <div className="flex items-center gap-4">
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

        <div className="flex w-full lg:w-[40%] min-h-[420px] lg:min-h-[650px] flex-col shrink-0 justify-end">
          <div className="flex w-full h-[420px] lg:h-[650px] flex-col shrink-0 bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat bg-center rounded-3xl"></div>
        </div>
      </div>
    </div></Reveal>
  );
}
