import Reveal from './Reveal';

const timeline = [
  {
    institution: 'Universitas Islam Negeri',
    period: '2021 - 2026',
    title: 'B.Sc. Information Systems',
    desc: 'Raden Intan Lampung, Faculty of Science and Technology. GPA 3.61 / 4.00.',
    color: 'bg-[#257e78]',
    dots: true,
  },
  {
    institution: 'Balai Guru Penggerak',
    period: 'Sep 2024 - Nov 2024',
    title: 'Administrative Staff Intern',
    desc: 'Managed archives, guest services, logistics, participant registration, and Excel-based administrative reporting.',
    color: 'bg-[#ed6043]',
    dots: true,
  },
  {
    institution: 'Freelance',
    period: '2022 - 2025',
    title: 'Freelance MLBB Rank Player',
    desc: 'Completed rank progression targets independently while maintaining consistent performance, managing schedules, meeting deadlines, and communicating progress with clients.',
    color: 'bg-[#176f69]',
    dots: true,
  },
  {
    institution: 'Independent Projects',
    period: '2025 - 2026',
    title: 'Web & UI/UX Designer',
    desc: 'Designing and developing responsive web, SaaS dashboard, and e-commerce experiences from prototype to handoff.',
    color: 'bg-[#f0ba32]',
    dots: false,
  },
];

function TimelineDot({ color, hasDots }) {
  return (
    <div className="flex relative w-[50px] md:w-[76px] shrink-0 justify-center">
      {hasDots && (
        <div className="flex absolute min-w-0 min-h-0 flex-col items-center left-[25px] md:left-[38px] top-[30px] bottom-[-50px] gap-1.5 overflow-clip">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="flex w-0.5 h-[5px] flex-col shrink-0 bg-[#537579] rounded-full"></div>
          ))}
        </div>
      )}
      <div className="size-[34px] flex relative shrink-0 justify-center items-center z-[10] bg-[#f6f5ee] border rounded-full border-[#789092]">
        <div className={`size-4 flex flex-col ${color} rounded-full`}></div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <Reveal><div className="flex min-h-[640px] flex-col bg-[#f6f5ee] px-6 md:px-12 lg:px-20 xl:px-[120px] py-[76px]">
      <div className="flex w-full h-fit justify-center">
        <div className="w-fit text-[#0b3442] font-['Poppins'] text-[36px] md:text-[46px] font-semibold leading-[1.2] tracking-[-1.6px]">Education & Experience</div>
      </div>
      <div id="education" className="flex w-full h-fit flex-col mt-11 mb-0 mx-0">
        <div className="flex flex-col gap-7">
          {timeline.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex h-fit min-h-[92px]">
              <div className="flex w-[35%] md:w-[34%] flex-col pt-0.5 pb-0 pr-2 md:pr-0 gap-2">
                <div className="w-fit text-[#0b3442] font-['Poppins'] text-[13px] md:text-base font-semibold leading-[1.4]">{item.institution}</div>
                <div className="w-fit text-[#506066] font-['Poppins'] text-[11px] md:text-xs leading-normal">{item.period}</div>
              </div>
              <TimelineDot color={item.color} hasDots={item.dots} />
              <div className="flex flex-col pt-0.5 pb-0 flex-1 px-0 gap-2.5">
                <div className="w-fit text-[#0b3442] font-['Poppins'] text-[13px] md:text-base font-semibold leading-[1.4]">{item.title}</div>
                <div className="max-w-[520px] text-[#40565d] font-['Poppins'] text-[11px] md:text-xs leading-[1.75]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="experience" className="flex w-full h-fit flex-col mt-11 mb-0 mx-0">
        <div className="flex flex-col gap-7">
          {timeline.slice(2).map((item, idx) => (
            <div key={idx} className="flex h-fit min-h-[92px]">
              <div className="flex w-[35%] md:w-[34%] flex-col pt-0.5 pb-0 pr-2 md:pr-0 gap-2">
                <div className="w-fit text-[#0b3442] font-['Poppins'] text-[13px] md:text-base font-semibold leading-[1.4]">{item.institution}</div>
                <div className="w-fit text-[#506066] font-['Poppins'] text-[11px] md:text-xs leading-normal">{item.period}</div>
              </div>
              <TimelineDot color={item.color} hasDots={item.dots} />
              <div className="flex flex-col pt-0.5 pb-0 flex-1 px-0 gap-2.5">
                <div className="w-fit text-[#0b3442] font-['Poppins'] text-[13px] md:text-base font-semibold leading-[1.4]">{item.title}</div>
                <div className="max-w-[520px] text-[#40565d] font-['Poppins'] text-[11px] md:text-xs leading-[1.75]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></Reveal>
  );
}
