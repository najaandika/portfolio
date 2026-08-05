import { CodeIcon, LayersIcon, FigmaIcon } from './Icons';
import Reveal from './Reveal';

const iconUrl = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;

const skills = [
  {
    icon: <CodeIcon />,
    title: 'Web Technologies',
    tools: [
      { label: 'PHP', icon: iconUrl('php', '777BB4') },
      { label: 'JavaScript', icon: iconUrl('javascript', 'F7DF1E') },
      { label: 'HTML5', icon: iconUrl('html5', 'E34F26') },
      { label: 'CSS', icon: iconUrl('css', '663399') },
    ],
    bg: 'bg-[#17786f]',
  },
  {
    icon: <LayersIcon />,
    title: 'Frameworks & Libraries',
    tools: [
      { label: 'Laravel', icon: iconUrl('laravel', 'FF2D20') },
      { label: 'Tailwind CSS', icon: iconUrl('tailwindcss', '06B6D4') },
      { label: 'React', icon: iconUrl('react', '61DAFB') },
    ],
    bg: 'bg-[#edbb3f]',
  },
  {
    icon: <FigmaIcon />,
    title: 'Tools & Design',
    tools: [
      { label: 'Figma', icon: iconUrl('figma', 'F24E1E') },
      { label: 'MySQL', icon: iconUrl('mysql', '4479A1') },
      { label: 'Microsoft Excel', icon: (
        <svg className="size-4 shrink-0 transition-transform duration-300 group-hover/tool:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="11" height="16" rx="2" fill="#217346" />
          <path fill="#ffffff" d="M6.1 8h2.1l1.15 2.1L10.58 8h2.02l-2.1 3.45L12.78 16h-2.1l-1.35-2.52L7.9 16H5.82l2.32-4.48L6.1 8Z" />
          <path fill="#33A852" d="M13 6h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6V6Z" />
          <path stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1" d="M15 9.5h4M15 12h4M15 14.5h4" />
        </svg>
      ) },
    ],
    bg: 'bg-[#ef5b3f]',
  },
];

export default function Skills() {
  return (
    <Reveal><div id="skills" className="flex flex-col lg:flex-row min-h-[500px] bg-white px-5 md:px-12 lg:px-20 xl:px-[120px] py-[68px] md:py-[78px] gap-12 lg:gap-[78px]">
      <div className="flex w-full lg:w-[43%] flex-col gap-[18px]">
        {skills.map((skill, idx) => (
          <Reveal key={skill.title} delay={idx * 90}>
            <div className="group relative overflow-hidden flex items-start bg-white border shadow-[0px_12px_30px_rgba(8,47,61,0.04)] rounded-lg p-5 md:p-6 gap-4 md:gap-6 border-[#edf0ee] transition-all duration-300 hover:-translate-y-1 hover:border-[#b9d8d4] hover:shadow-[0px_16px_34px_rgba(8,47,61,0.09)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#176f69]/0 before:via-[#176f69]/[0.035] before:to-[#176f69]/0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
              <div className={`relative z-10 size-[58px] flex shrink-0 justify-center items-center ${skill.bg} rounded-full transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}>
                <div className="size-6 text-white">
                  {skill.icon}
                </div>
              </div>
              <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-3">
                <div className="w-fit text-black font-['Poppins'] text-base font-semibold">{skill.title}</div>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool) => (
                    <div key={tool.label} title={tool.label} aria-label={tool.label} className="group/tool flex h-8 items-center gap-2 rounded-full border border-[#e4ebe8] bg-[#fbfcfb] px-2.5 pr-3 text-[#41545b] shadow-[0px_5px_12px_rgba(8,47,61,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b9d8d4] hover:bg-white hover:shadow-[0px_9px_18px_rgba(8,47,61,0.08)] group-hover:border-[#d5e5e1]">
                      {typeof tool.icon === 'string' ? (
                        <img className="size-4 shrink-0 object-contain transition-transform duration-300 group-hover/tool:scale-110" src={tool.icon} alt="" loading="lazy" />
                      ) : (
                        tool.icon
                      )}
                      <span className="font-['Poppins'] text-xs font-medium leading-none">{tool.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="flex flex-col pt-2 pb-0 flex-1 px-0" delay={180}>
        <div className="w-fit text-[#0b3442] font-['Poppins'] text-[32px] md:text-[44px] font-semibold leading-[1.12] tracking-[-1.5px]">What do I build?</div>
        <div className="flex max-w-[560px] flex-col mt-5 mb-0 text-[#293f47] font-['Poppins'] text-[13px] leading-[1.9] mx-0">
          <div className="w-fit text-[#293f47] font-['Poppins'] text-[13px] leading-[1.9]">I build responsive web applications with Laravel and Next.js, supported by structured data and clear user flows.</div>
          <div className="w-fit text-[#293f47] font-['Poppins'] text-[13px] leading-[1.9] mt-2">I combine development, UI/UX design, administration, and careful collaboration to deliver practical digital products.</div>
        </div>
        <div className="flex mt-[30px] mb-0 mx-0 gap-x-14 gap-y-6 md:gap-[88px] flex-wrap">
          <div className="group/stat flex flex-col border-b border-transparent pb-1 transition-colors duration-300 hover:border-[#176f69]">
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[43px] font-semibold leading-normal transition-transform duration-300 group-hover/stat:-translate-y-0.5">3.61</div>
            <div className="w-fit text-[#293f47] font-['Poppins'] text-xs leading-normal">GPA / 4.00</div>
          </div>
          <div className="group/stat flex flex-col border-b border-transparent pb-1 transition-colors duration-300 hover:border-[#176f69]">
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[43px] font-semibold leading-normal transition-transform duration-300 group-hover/stat:-translate-y-0.5">3+</div>
            <div className="w-fit text-[#293f47] font-['Poppins'] text-xs leading-normal">Featured Projects</div>
          </div>
        </div>
      </Reveal>
    </div></Reveal>
  );
}