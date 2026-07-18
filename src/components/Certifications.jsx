import { UdemyIcon, GraduationIcon } from './Icons';
import Reveal from './Reveal';

const certs = [
  {
    icon: <UdemyIcon />,
    iconBg: 'bg-white border-4 border-[#a435f0]',
    iconColor: 'text-[#a435f0]',
    title: 'Microsoft Excel Comprehensive Guide',
    issuer: 'Udemy · Issued 2026 · Microsoft Excel',
    link: 'https://www.udemy.com/certificate/UC-56646efb-1094-4a88-a033-fe8ce00ae64a/',
  },
  {
    icon: <UdemyIcon />,
    iconBg: 'bg-white border-4 border-[#a435f0]',
    iconColor: 'text-[#a435f0]',
    title: 'Mastering Excel Formulas & Functions',
    issuer: 'Udemy · Issued 2026 · Beginner to Advanced',
    link: 'https://www.udemy.com/certificate/UC-07b6ad15-3c42-4abc-a46c-c57b3269798f/',
  },
  {
    icon: <GraduationIcon />,
    iconBg: 'bg-[#ef6380] border-4 border-[#ef6380]',
    iconColor: 'text-white',
    title: 'Administrative Internship Certificate',
    issuer: 'Balai Guru Penggerak · Issued 2024 · Administration',
    link: 'https://drive.google.com/drive/folders/1OYj5pADBij38czyE0zZti0zx7gy7R1ub',
  },
];

export default function Certifications() {
  return (
    <Reveal><div className="flex min-w-0 min-h-[500px] flex-col items-center bg-[#f6f5ee] px-6 md:px-12 lg:px-20 xl:px-[120px] py-[72px] overflow-clip">
      <div className="flex w-full h-fit flex-col items-center gap-3">
        <div className="w-fit text-[#0b3442] font-['Poppins'] text-[30px] md:text-[38px] font-semibold leading-normal tracking-[-1.2px] text-center">Learning & Certifications</div>
        <div className="flex max-w-[650px] flex-col text-[#506066] text-xs leading-[1.7] text-center">
          <div className="w-fit text-[#506066] font-['Poppins'] text-sm leading-[1.6] text-center">Verified learning in spreadsheet analysis, advanced Excel functions,</div>
          <div className="w-fit text-[#506066] font-['Poppins'] text-sm leading-[1.6] text-center">and professional administration experience.</div>
        </div>
      </div>
      <div className="flex w-full h-fit flex-col items-center mt-[34px] mb-0 mx-0 gap-6">
        <div className="flex flex-col md:flex-row w-full justify-center gap-7">
          {certs.map((cert, idx) => (
            <div key={idx} onClick={() => cert.link && window.open(cert.link, '_blank')} className="flex min-h-[230px] flex-col justify-center items-center bg-white shadow-[0px_10px_28px_rgba(8,47,61,0.05)] text-center flex-1 rounded-[14px] px-[34px] py-8 gap-2.5 cursor-pointer hover:shadow-[0px_10px_28px_rgba(8,47,61,0.15)] transition-shadow">
              <div className={`size-14 flex shrink-0 justify-center items-center mt-[-55px] mb-0 rounded-full mx-0 ${cert.iconBg}`}>
                <div className={`size-[26px] ${cert.iconColor}`}>
                  {cert.icon}
                </div>
              </div>
              <div className="w-full text-[#0b3442] font-['Poppins'] text-base font-semibold leading-[1.45] text-center">{cert.title}</div>
              <div className="w-full text-[#5b6b70] font-['Poppins'] text-xs leading-normal text-center">{cert.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    </div></Reveal>
  );
}
