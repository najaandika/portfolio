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
  return (
    <Reveal><div id="certifications" className="flex min-w-0 min-h-[500px] flex-col items-center bg-[#f6f5ee] px-5 md:px-12 lg:px-20 xl:px-[120px] py-[68px] md:py-[72px] overflow-clip">
      <div className="flex w-full h-fit flex-col items-center gap-3">
        <div className="w-fit text-[#0b3442] font-['Poppins'] text-[28px] md:text-[38px] font-semibold leading-normal tracking-[-1.2px] text-center">Learning & Certifications</div>
        <div className="flex max-w-[650px] flex-col text-[#506066] text-xs leading-[1.7] text-center">
          <div className="w-fit text-[#506066] font-['Poppins'] text-sm leading-[1.6] text-center">Verified learning in spreadsheet analysis, advanced Excel functions,</div>
          <div className="w-fit text-[#506066] font-['Poppins'] text-sm leading-[1.6] text-center">and professional administration experience.</div>
        </div>
      </div>
      <div className="flex w-full h-fit flex-col items-center mt-[34px] mb-0 mx-0 gap-6">
        <div className="flex flex-col md:flex-row w-full justify-center gap-7">
          {certs.map((cert, idx) => (
            <Reveal key={cert.title} className="flex-1" delay={idx * 100}>
              <div
                role="button"
                tabIndex={0}
                aria-label={`Open ${cert.title} certificate in a new tab`}
                onClick={() => openExternal(cert.link)}
                onKeyDown={(event) => handleCardKey(event, cert.link)}
                className={`group flex min-h-[230px] flex-col justify-center items-center bg-white border border-transparent shadow-[0px_10px_28px_rgba(8,47,61,0.05)] text-center rounded-[14px] px-6 md:px-[34px] py-8 gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-[0px_14px_34px_rgba(8,47,61,0.13)] ${cert.accentBorder} transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69]`}
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
          ))}
        </div>
      </div>
    </div></Reveal>
  );
}