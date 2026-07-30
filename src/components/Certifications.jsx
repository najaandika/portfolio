import { useRef, useState } from 'react';
import { UdemyIcon, GraduationIcon } from './Icons';
import Reveal from './Reveal';

const certs = [
  {
    icon: <UdemyIcon />,
    iconBg: 'bg-white border-4 border-[#a435f0]',
    iconColor: 'text-[#a435f0]',
    accentBorder: 'hover:border-[#d7a8ff]',
    title: 'Microsoft Excel Comprehensive Guide',
    issuer: 'Udemy - Issued 2026 - Microsoft Excel',
    link: 'https://www.udemy.com/certificate/UC-56646efb-1094-4a88-a033-fe8ce00ae64a/',
  },
  {
    icon: <UdemyIcon />,
    iconBg: 'bg-white border-4 border-[#a435f0]',
    iconColor: 'text-[#a435f0]',
    accentBorder: 'hover:border-[#d7a8ff]',
    title: 'Mastering Excel Formulas & Functions',
    issuer: 'Udemy - Issued 2026 - Beginner to Advanced',
    link: 'https://www.udemy.com/certificate/UC-07b6ad15-3c42-4abc-a46c-c57b3269798f/',
  },
  {
    icon: <UdemyIcon />,
    iconBg: 'bg-white border-4 border-[#a435f0]',
    iconColor: 'text-[#a435f0]',
    accentBorder: 'hover:border-[#d7a8ff]',
    title: 'Modern Web Development with JavaScript, jQuery & TypeScript',
    issuer: 'Udemy - Issued 2026 - JavaScript, jQuery, TypeScript',
    link: 'https://www.udemy.com/certificate/UC-b1a592e8-fde3-435a-b978-97d6463f68d0/',
  },
  {
    icon: <UdemyIcon />,
    iconBg: 'bg-white border-4 border-[#a435f0]',
    iconColor: 'text-[#a435f0]',
    accentBorder: 'hover:border-[#d7a8ff]',
    title: 'Complete Figma Course: Web & Mobile Projects from Scratch',
    issuer: 'Udemy - Issued 2026 - Figma, Web & Mobile Design',
    link: 'https://www.udemy.com/certificate/UC-c53eabf9-4c22-4d7a-a100-9562428e5d8f/',
  },
  {
    icon: <GraduationIcon />,
    iconBg: 'bg-[#ef6380] border-4 border-[#ef6380]',
    iconColor: 'text-white',
    accentBorder: 'hover:border-[#ef9aab]',
    title: 'Administrative Internship Certificate',
    issuer: 'Balai Guru Penggerak - Issued 2024 - Administration',
    link: 'https://drive.google.com/drive/folders/1OYj5pADBij38czyE0zZti0zx7gy7R1ub',
  },
];

function openExternal(link) {
  window.open(link, '_blank', 'noopener,noreferrer');
}

function handleCardKey(event, link) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openExternal(link);
  }
}

export default function Certifications() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressPercent = certs.length > 1 ? ((activeIndex + 1) / certs.length) * 100 : 100;

  const scrollToCert = (index) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index];

    if (!scroller || !card) return;

    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  const scrollByDirection = (direction) => {
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), certs.length - 1);
    scrollToCert(nextIndex);
  };

  const updateActiveCert = () => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const scrollCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    Array.from(scroller.children).forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);

      if (distance < nearestDistance) {
        nearestIndex = index;
        nearestDistance = distance;
      }
    });

    setActiveIndex(nearestIndex);
  };

  return (
    <Reveal><div id="certifications" className="flex min-w-0 min-h-[500px] flex-col items-center bg-[#f6f5ee] px-5 md:px-12 lg:px-20 xl:px-[120px] py-[68px] md:py-[72px] overflow-clip">
      <div className="flex w-full h-fit flex-col items-center gap-3">
        <div className="w-fit text-[#0b3442] font-['Poppins'] text-[28px] md:text-[38px] font-semibold leading-normal tracking-[-1.2px] text-center">Learning & Certifications</div>
        <div className="flex max-w-[650px] flex-col text-[#506066] text-xs leading-[1.7] text-center">
          <div className="w-fit text-[#506066] font-['Poppins'] text-sm leading-[1.6] text-center">Verified learning in spreadsheet analysis, advanced Excel functions,</div>
          <div className="w-fit text-[#506066] font-['Poppins'] text-sm leading-[1.6] text-center">and professional administration experience.</div>
        </div>
      </div>
      <div className="group/certs mt-[34px] w-full min-w-0">
        <div className="mb-3 hidden justify-end gap-2 opacity-80 transition-opacity duration-300 group-hover/certs:opacity-100 md:flex">
          <button
            type="button"
            aria-label="Previous certificate"
            onClick={() => scrollByDirection(-1)}
            disabled={activeIndex === 0}
            className="flex size-10 items-center justify-center rounded-full border border-[#d5dfdc] bg-white text-[#0b3442] shadow-[0px_8px_20px_rgba(8,47,61,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#176f69] hover:text-[#176f69] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-[#d5dfdc] disabled:hover:text-[#0b3442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69]"
          >
            <span aria-hidden="true">&lt;</span>
          </button>
          <button
            type="button"
            aria-label="Next certificate"
            onClick={() => scrollByDirection(1)}
            disabled={activeIndex === certs.length - 1}
            className="flex size-10 items-center justify-center rounded-full border border-[#d5dfdc] bg-white text-[#0b3442] shadow-[0px_8px_20px_rgba(8,47,61,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#176f69] hover:text-[#176f69] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-[#d5dfdc] disabled:hover:text-[#0b3442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69]"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>
        <div
          ref={scrollerRef}
          onScroll={updateActiveCert}
          className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 pt-9 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 xl:-mx-[120px] xl:px-[120px]"
        >
          {certs.map((cert, idx) => {
            const isActive = activeIndex === idx;

            return (
              <Reveal key={cert.title} className="w-[86%] min-w-[260px] shrink-0 snap-start sm:w-[45%] lg:w-[31%]" delay={idx * 100}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${cert.title} certificate in a new tab`}
                  onClick={() => openExternal(cert.link)}
                  onKeyDown={(event) => handleCardKey(event, cert.link)}
                  className={`group flex min-h-[230px] flex-col justify-center items-center bg-white border text-center rounded-[14px] px-6 md:px-[34px] py-8 gap-3 cursor-pointer ${cert.accentBorder} transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69] ${
                    isActive
                      ? 'border-[#dbe8e4] shadow-[0px_18px_42px_rgba(8,47,61,0.14)] opacity-100 scale-[1.02]'
                      : 'border-transparent shadow-[0px_10px_28px_rgba(8,47,61,0.05)] opacity-75 scale-[0.985] hover:opacity-100 hover:scale-100 hover:-translate-y-1 hover:shadow-[0px_14px_34px_rgba(8,47,61,0.13)]'
                  }`}
                >
                  <div className={`size-14 flex shrink-0 justify-center items-center mt-[-55px] mb-1 rounded-full mx-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 ${cert.iconBg}`}>
                    <div className={`size-[26px] ${cert.iconColor}`}>
                      {cert.icon}
                    </div>
                  </div>
                  <div className="w-full text-[#0b3442] font-['Poppins'] text-base font-semibold leading-[1.45] text-center">{cert.title}</div>
                  <div className="w-full text-[#5b6b70] font-['Poppins'] text-xs leading-normal text-center">{cert.issuer}</div>
                  <div className="mt-1 flex w-fit items-center gap-1.5 border-b border-[#176f69] pb-0.5 text-[#176f69] font-['Poppins'] text-[11px] font-semibold leading-normal">
                    <span>View Certificate</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">-&gt;</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mx-auto mt-2 flex w-full max-w-[360px] flex-col items-center gap-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#dce5e2]">
            <div
              className="h-full rounded-full bg-[#176f69] transition-[width] duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-center gap-2">
            {certs.map((cert, idx) => (
              <button
                key={cert.title}
                type="button"
                aria-label={`Go to certificate ${idx + 1}`}
                aria-current={activeIndex === idx}
                onClick={() => scrollToCert(idx)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69] ${
                  activeIndex === idx ? 'w-6 bg-[#176f69]' : 'w-2 bg-[#b8c9c5] hover:bg-[#8da8a2]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div></Reveal>
  );
}
