import { CodeIcon, LayersIcon, FigmaIcon } from './Icons';
import Reveal from './Reveal';

const skills = [
  {
    icon: <CodeIcon />,
    title: 'Web Technologies',
    desc: 'PHP, JavaScript, HTML, CSS',
    bg: 'bg-[#17786f]',
  },
  {
    icon: <LayersIcon />,
    title: 'Framework & Library',
    desc: 'Laravel, Tailwind CSS, React',
    bg: 'bg-[#edbb3f]',
  },
  {
    icon: <FigmaIcon />,
    title: 'Tools & Design',
    desc: 'Figma, MySQL, Excel',
    bg: 'bg-[#ef5b3f]',
  },
];

export default function Skills() {
  return (
    <Reveal><div id="skills" className="flex flex-col lg:flex-row min-h-[500px] bg-white px-6 md:px-12 lg:px-20 xl:px-[120px] py-[78px] gap-[78px]">
      <div className="flex w-full lg:w-[43%] flex-col gap-[18px]">
        {skills.map((skill) => (
          <div key={skill.title} className="flex items-center bg-white border shadow-[0px_12px_30px_rgba(8,47,61,0.04)] rounded-lg p-6 gap-6 border-[#edf0ee]">
            <div className={`size-[58px] flex shrink-0 justify-center items-center ${skill.bg} rounded-full`}>
              <div className="size-6 text-white">
                {skill.icon}
              </div>
            </div>
            <div className="flex flex-col gap-[3px]">
              <div className="w-fit text-black font-['Poppins'] text-base font-semibold">{skill.title}</div>
              <div className="w-fit text-[#5b6b70] font-['Poppins'] text-sm">{skill.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col pt-2 pb-0 flex-1 px-0">
        <div className="w-fit text-[#0b3442] font-['Poppins'] text-[36px] md:text-[44px] font-semibold leading-[1.12] tracking-[-1.5px]">What do I build?</div>
        <div className="flex max-w-[560px] flex-col mt-5 mb-0 text-[#293f47] font-['Poppins'] text-[13px] leading-[1.9] mx-0">
          <div className="w-fit text-[#293f47] font-['Poppins'] text-[13px] leading-[1.9]">I build responsive web applications with Laravel and Next.js, supported by structured data and clear user flows.</div>
          <div className="w-fit text-[#293f47] font-['Poppins'] text-[13px] leading-[1.9] mt-2">I combine development, UI/UX design, administration, and careful collaboration to deliver practical digital products.</div>
        </div>
        <div className="flex mt-[30px] mb-0 mx-0 gap-[88px]">
          <div className="flex flex-col">
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[43px] font-semibold leading-normal">3.61</div>
            <div className="w-fit text-[#293f47] font-['Poppins'] text-xs leading-normal">GPA / 4.00</div>
          </div>
          <div className="flex flex-col">
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[43px] font-semibold leading-normal">3+</div>
            <div className="w-fit text-[#293f47] font-['Poppins'] text-xs leading-normal">Featured Projects</div>
          </div>
        </div>
      </div>
    </div></Reveal>
  );
}
