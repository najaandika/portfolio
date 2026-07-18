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

export default function Footer() {
  return (
    <Reveal><div className="flex min-h-[420px] flex-col pt-[72px] pb-8 bg-white px-6 md:px-12 lg:px-20 xl:px-[120px]">
      <div className="flex flex-col md:flex-row w-full h-fit gap-12 md:gap-0">
        <div className="flex w-full md:w-[65%] flex-col">
          <div className="flex flex-col text-[#0b3442] font-['Poppins'] text-[32px] md:text-[42px] font-semibold leading-[1.18] tracking-[-1.4px]">
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[32px] md:text-[42px] font-semibold leading-tight tracking-[-1.26px]">Let's make something</div>
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[32px] md:text-[42px] font-semibold leading-tight tracking-[-1.26px]">amazing together.</div>
          </div>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=naja.andika3000@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-wrap items-baseline gap-x-[7.75px] mt-[66px] mb-0 text-[#0b3442] text-[31px] font-semibold mx-0 group w-fit"
          >
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[31px] font-semibold leading-normal">Start by</div>
            <div className="w-fit text-[#e95f43] font-['Poppins'] text-[31px] font-semibold leading-normal underline decoration-[#e95f43] underline-offset-[6px] group-hover:text-[#c94d33] transition-colors">saying hi</div>
          </a>
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-fit text-[#0b3442] font-['Poppins'] text-[17px] font-semibold leading-normal">Information</div>
          <div className="w-fit mt-3 mb-0 text-[#344b53] font-['Poppins'] text-[11px] leading-normal mx-0">Krui, Pesisir Barat, Lampung</div>
          <div className="flex flex-col items-start mt-[34px] mb-0 mx-0 gap-[22px]">
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
        </div>
      </div>
      <div className="flex w-full h-fit flex-col mt-auto mb-0 mx-0">
        <div className="flex w-full h-px flex-col bg-[#aeb9b7]"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center pt-[26px] pb-0 px-0 gap-2 md:gap-0">
          <div className="w-fit text-[#0b3442] font-['Poppins'] text-base font-semibold">Naja</div>
          <div className="w-fit md:mr-0 md:ml-4 text-[#344c54] font-['Poppins'] text-xs my-0">© 2026 Naja Andika</div>
          <a
            href="https://linkedin.com/in/naja-andika-447234317"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-wrap items-baseline gap-x-[2.5px] md:mr-0 md:ml-auto text-[#344b53] text-[10px] my-0 group"
          >
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-xs leading-normal">LinkedIn:</div>
            <div className="w-fit max-w-[230px] text-[#ef5b3f] font-['Poppins'] text-xs font-semibold leading-[1.4] text-right group-hover:text-[#c94d33] transition-colors">naja-andika-447234317</div>
          </a>
        </div>
      </div>
    </div></Reveal>
  );
}
