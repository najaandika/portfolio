import { useRef, useState } from 'react';
import { UdemyIcon, CourseraIcon, CiscoIcon } from './Icons';
import Reveal from './Reveal';

const certs = [
  {
    icon: <CiscoIcon />,
    iconBg: 'bg-white border-4 border-[#1BA0D7]',
    iconColor: 'text-[#1BA0D7]',
    accentBorder: 'hover:border-[#9bdcf2]',
    title: 'HTML Essentials',
    issuer: 'Cisco Networking Academy - HTML',
    link: 'https://www.netacad.com/certificates/?issuanceId=3baaf20d-b262-474b-bb2f-447376f6c251',
  },
  {
    icon: <CiscoIcon />,
    iconBg: 'bg-white border-4 border-[#1BA0D7]',
    iconColor: 'text-[#1BA0D7]',
    accentBorder: 'hover:border-[#9bdcf2]',
    title: 'CSS Essentials',
    issuer: 'Cisco Networking Academy - CSS',
    link: 'https://www.netacad.com/certificates/?issuanceId=40adb325-8465-473d-9cdf-28d7328d1330',
  },
  {
    icon: <CiscoIcon />,
    iconBg: 'bg-white border-4 border-[#1BA0D7]',
    iconColor: 'text-[#1BA0D7]',
    accentBorder: 'hover:border-[#9bdcf2]',
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco Networking Academy - JavaScript',
    link: 'https://www.netacad.com/certificates/?issuanceId=767fad3f-fb31-4b18-ac68-810c3a39cb9f',
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
    icon: <CourseraIcon />,
    iconBg: 'bg-white border-4 border-[#0056D2]',
    iconColor: 'text-[#0056D2]',
    accentBorder: 'hover:border-[#9fc5ff]',
    title: 'Technical Support Fundamentals',
    issuer: 'Coursera - Google IT Support Professional Certificate',
    link: 'https://www.coursera.org/account/accomplishments/verify/JSAB0CEKIF8Y',
  },
  {
    icon: <CourseraIcon />,
    iconBg: 'bg-white border-4 border-[#0056D2]',
    iconColor: 'text-[#0056D2]',
    accentBorder: 'hover:border-[#9fc5ff]',
    title: 'Foundations: Data, Data, Everywhere',
    issuer: 'Coursera - Google Data Analytics - Data Foundations',
    link: 'https://coursera.org/share/4d57e930eddb785e730704fdd6bc16fb',
  },
  {
    icon: <CourseraIcon />,
    iconBg: 'bg-white border-4 border-[#0056D2]',
    iconColor: 'text-[#0056D2]',
    accentBorder: 'hover:border-[#9fc5ff]',
    title: 'Excel Skills for Business: Essentials',
    issuer: 'Coursera - Macquarie University - Excel Essentials',
    link: 'https://coursera.org/share/272100def0d31b378bcf52b1ca7ba4dc',
  },
  {
    icon: <CiscoIcon />,
    iconBg: 'bg-white border-4 border-[#1BA0D7]',
    iconColor: 'text-[#1BA0D7]',
    accentBorder: 'hover:border-[#9bdcf2]',
    title: 'IT Customer Support Basics',
    issuer: 'Cisco Networking Academy - IT Customer Support',
    link: 'https://www.netacad.com/certificates/?issuanceId=87128f64-69cf-4169-be89-e2aa9dc934b8',
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
    <Reveal><div id="certifications" className="flex min-w-0 min-h-[620px] flex-col items-center bg-[#f6f5ee] px-5 md:px-12 lg:px-20 xl:px-[120px] pt-[68px] pb-[84px] md:py-[72px] overflow-clip">
      <div className="flex w-full h-fit flex-col items-center gap-3">
        <div className="w-fit text-[#0b3442] font-['Poppins'] text-[28px] md:text-[38px] font-semibold leading-normal tracking-[-1.2px] text-center">Learning & Certifications</div>
        <p className="m-0 max-w-[650px] text-center text-[#506066] font-['Poppins'] text-sm leading-[1.7]">
          Verified learning in frontend development, UI design, technical support, data foundations, and productivity tools.
        </p>
      </div>
      <div className="group/certs mt-[42px] w-full min-w-0 md:mt-[34px]">
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
          className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11vw] pb-7 pt-9 sm:gap-6 sm:px-5 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 xl:-mx-[120px] xl:px-[120px]"
        >
          {certs.map((cert, idx) => {
            const isActive = activeIndex === idx;

            return (
              <Reveal key={cert.title} className="w-[78vw] min-w-[250px] max-w-[330px] shrink-0 snap-center sm:w-[45%] sm:max-w-none sm:snap-start lg:w-[31%]" delay={idx * 100}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${cert.title} certificate in a new tab`}
                  onClick={() => openExternal(cert.link)}
                  onKeyDown={(event) => handleCardKey(event, cert.link)}
                  className={`group flex min-h-[238px] flex-col justify-center items-center bg-white border text-center rounded-[14px] px-5 md:px-[34px] py-8 gap-3 cursor-pointer ${cert.accentBorder} transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69] ${
                    isActive
                      ? 'border-[#dbe8e4] shadow-[0px_18px_42px_rgba(8,47,61,0.14)] opacity-100 md:scale-[1.02]'
                      : 'border-transparent shadow-[0px_10px_28px_rgba(8,47,61,0.05)] opacity-75 md:scale-[0.985] hover:opacity-100 hover:scale-100 hover:-translate-y-1 hover:shadow-[0px_14px_34px_rgba(8,47,61,0.13)]'
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
        <div className="mx-auto mt-2 flex w-full max-w-[280px] flex-col items-center gap-3 sm:max-w-[360px]">
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
