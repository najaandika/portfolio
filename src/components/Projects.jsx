import { GithubIcon } from './Icons';
import Reveal from './Reveal';

const projects = [
  {
    title: 'AC Service Website',
    desc: 'Responsive service website that simplifies discovery and booking. I led the interface design and frontend implementation in Laravel.',
    tags: 'Laravel · Tailwind CSS · Responsive UI',
    bg: 'bg-[#176f69]',
    descColor: 'text-[#e7f3f1]',
    tagColor: 'text-[#cce5e1]',
    btnBg: 'bg-white',
    btnText: 'text-[#176f69]',
    badge: 'bg-[#ffffff14] border-[#ffffff66] text-white',
    badgeText: 'Offline Project',
    image: 'https://cdn.wonder.so/images/019f7377-58f2-7608-ab42-a6eb1c84676f/9440e103760c83b45d39b911c2ec98db7d8cf98d080b0f9e0876f4fd5b01b7d1.jpg',
  },
  {
    title: 'E-Commerce Thrifting',
    desc: 'End-to-end commerce experience with a clearer catalog, checkout flow, and Midtrans payments. I handled full-stack development and interface design.',
    tags: 'Laravel · Midtrans · MySQL',
    bg: 'bg-[#e9b74d]',
    descColor: 'text-[#3d3a2f]',
    tagColor: 'text-[#5e512e]',
    btnBg: 'bg-[#173f41]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff24] border-[#173f4166] text-[#173f41]',
    badgeText: 'Offline Project',
    image: 'https://cdn.wonder.so/images/019f7377-58f2-7608-ab42-a6eb1c84676f/0605ff356b110d61a9fbb52c05c3ae363d97834488451bc99c5ed91e38b08ff7.jpg',
  },
  {
    title: 'SaaS Dashboard UI',
    desc: 'Data-rich dashboard concept focused on clear hierarchy, reusable components, and efficient workflows. I created the UI/UX and interactive prototype.',
    tags: 'Dashboard · Design System · Prototyping',
    bg: 'bg-[#9dd8c8]',
    descColor: 'text-[#294e4d]',
    tagColor: 'text-[#31605d]',
    btnBg: 'bg-[#123c3b]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff2e] border-[#123c3b55] text-[#143c3b]',
    badgeText: 'Figma Prototype',
    image: 'https://cdn.wonder.so/images/019f7377-58f2-7608-ab42-a6eb1c84676f/3f9586795ce9bee7e4c823daf2811626a254f35bf553e5a5e85d30ec84b53530.jpg',
  },
  {
    title: 'E-Commerce Storefront UI',
    desc: 'Responsive storefront concept that supports product discovery, confident purchasing, and a focused checkout. I designed the complete UI/UX system.',
    tags: 'Storefront · Checkout · Responsive UI',
    bg: 'bg-[#f1c98f]',
    descColor: 'text-[#514738]',
    tagColor: 'text-[#6c593d]',
    btnBg: 'bg-[#3d3426]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff2e] border-[#3d342655] text-[#4a3217]',
    badgeText: 'Figma Prototype',
    image: 'https://cdn.wonder.so/images/019f7377-58f2-7608-ab42-a6eb1c84676f/0605ff356b110d61a9fbb52c05c3ae363d97834488451bc99c5ed91e38b08ff7.jpg',
  },
];

export default function Projects() {
  return (
    <Reveal><div id="projects" className="flex min-h-[620px] flex-col bg-[#f7faf9] px-6 md:px-12 lg:px-20 xl:px-[120px] py-12 md:py-24">
      <div className="flex flex-col md:flex-row w-full h-fit items-start md:items-end gap-6 md:gap-8">
        <div className="flex flex-col flex-1 gap-3">
          <div className="w-fit text-[#0b3442] font-['Poppins'] text-[32px] md:text-5xl font-semibold leading-[1.12] tracking-[-1.7px]">Featured Projects</div>
          <div className="w-fit max-w-[650px] text-[#455d63] font-['Poppins'] text-[15px] leading-[1.7]">Selected work covering the problem, my role, key decisions, and the tools used to deliver each experience.</div>
        </div>
        <a
          href="https://github.com/naja-andika"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit shrink-0 items-center border text-[#176f69] font-['Poppins'] text-[13px] font-semibold leading-normal rounded-full px-5 py-3 gap-2 border-[#176f69] hover:bg-[#176f69] hover:text-white transition-colors"
        >
          <div className="size-4 text-current">
            <GithubIcon />
          </div>
          <div className="w-fit text-current font-['Poppins'] text-[13px] font-semibold leading-normal">View GitHub Projects</div>
        </a>
      </div>
      <div className="flex w-full min-w-0 h-fit mt-12 mb-0 mx-0">
        <div className="flex w-full h-fit flex-wrap gap-6">
          {projects.map((project) => (
            <div key={project.title} className={`flex w-full lg:w-[calc(50%_-_12px)] min-h-[500px] md:min-h-[540px] flex-col ${project.bg} shadow-[0px_18px_50px_rgba(11,52,66,0.12)] rounded-[20px] overflow-clip`}>
              <div className="flex h-fit min-h-[260px] flex-col pt-8 pb-7 px-6 md:px-8 gap-3">
                <div className="w-fit text-white font-['Poppins'] text-[22px] md:text-[26px] font-semibold leading-[1.2] tracking-[-0.4px]">{project.title}</div>
                <div className={`w-fit max-w-[500px] ${project.descColor} font-['Poppins'] text-sm leading-[1.65]`}>{project.desc}</div>
                <div className="flex h-fit items-center pt-2 pb-0 mt-auto mb-0 px-0 mx-0 gap-3 flex-wrap">
                  <button
                    onClick={() => window.open('https://github.com/naja-andika', '_blank')}
                    className={`flex h-[38px] items-center ${project.btnBg} shadow rounded-full px-5 py-0 hover:opacity-90 transition-opacity`}
                  >
                    <div className={`w-fit font-['Poppins'] text-xs font-semibold leading-normal ${project.btnText}`}>View Case Study</div>
                  </button>
                  <div className={`flex h-[38px] items-center ${project.badge} border rounded-full px-4 py-0`}>
                    <div className="w-fit font-['Poppins'] text-xs font-semibold">{project.badgeText}</div>
                  </div>
                </div>
                <div className={`w-fit ${project.tagColor} font-['Poppins'] text-[11px] font-medium leading-normal tracking-[1.32px] uppercase`}>{project.tags}</div>
              </div>
              <div
                className="flex w-[92%] h-[200px] md:h-[240px] shrink-0 mt-auto mr-0 mb-0 ml-auto bg-cover bg-no-repeat bg-center rounded-tl-2xl"
                style={{ backgroundImage: `url('${project.image}')` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div></Reveal>
  );
}
