import { GithubIcon } from './Icons';
import Reveal from './Reveal';

const projects = [
  {
    title: 'AC & Electronics Service Website',
    desc: 'Redesigned a responsive service website with clearer service discovery, WhatsApp booking flow, and mobile-first interface.',
    tags: 'Astro - Tailwind CSS - Responsive UI',
    bg: 'bg-[#176f69]',
    descColor: 'text-[#e7f3f1]',
    titleColor: 'text-white',
    tagColor: 'text-[#cce5e1]',
    btnBg: 'bg-white',
    btnText: 'text-[#176f69]',
    badge: 'bg-[#ffffff14] border-[#ffffff66] text-white',
    badgeText: 'Offline Project',
    link: 'https://github.com/najaandika/ac-service.git',
    image: '/images/project-service-ac.png',
  },
  {
    title: 'E-Commerce Thrifting',
    desc: 'Developed a Laravel storefront with product browsing, checkout, Midtrans payment integration, and MySQL data management.',
    tags: 'Laravel - Midtrans - MySQL',
    bg: 'bg-[#e8b84a]',
    descColor: 'text-[#263f43]',
    titleColor: 'text-[#0b3442]',
    tagColor: 'text-[#4f563e]',
    btnBg: 'bg-[#173f41]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff24] border-[#173f4166] text-[#173f41]',
    badgeText: 'Offline Project',
    link: 'https://github.com/najaandika/thrif_app.git',
    image: '/images/project-thrif.png',
  },
  {
    title: 'SaaS Dashboard UI',
    desc: 'Designed a dashboard prototype with clear data hierarchy, reusable UI components, and focused workflow screens.',
    tags: 'Dashboard - Design System - Prototyping',
    bg: 'bg-[#9dd8c8]',
    descColor: 'text-[#294e4d]',
    titleColor: 'text-white',
    tagColor: 'text-[#31605d]',
    btnBg: 'bg-[#123c3b]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff2e] border-[#123c3b55] text-[#143c3b]',
    badgeText: 'Figma Prototype',
    link: 'https://hub-affix-00189305.figma.site',
    image: '/images/project-saas-dashboard.png',
  },
  {
    title: 'E-Commerce Storefront UI',
    desc: 'Created a responsive storefront prototype focused on product discovery, buyer confidence, and clean checkout flow.',
    tags: 'Storefront - Checkout - Responsive UI',
    bg: 'bg-[#f1c98f]',
    descColor: 'text-[#3e372e]',
    titleColor: 'text-[#0b3442]',
    tagColor: 'text-[#5c4c34]',
    btnBg: 'bg-[#3d3426]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff2e] border-[#3d342655] text-[#4a3217]',
    badgeText: 'Figma Prototype',
    link: 'https://login-soft-19644151.figma.site/',
    image: '/images/project-ecommerce-storefront.png',
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

export default function Projects() {
  return (
    <Reveal><div id="projects" className="flex min-h-[620px] flex-col bg-[#f7faf9] px-5 md:px-12 lg:px-20 xl:px-[120px] py-12 md:py-24">
      <div className="flex flex-col md:flex-row w-full h-fit items-start md:items-end gap-6 md:gap-8">
        <div className="flex flex-col flex-1 gap-3">
          <div className="w-fit text-[#0b3442] font-['Poppins'] text-[30px] md:text-5xl font-semibold leading-[1.12] tracking-[-1.7px]">Featured Projects</div>
          <div className="w-fit max-w-[650px] text-[#455d63] font-['Poppins'] text-[15px] leading-[1.7]">Selected work covering the problem, my role, key decisions, and the tools used to deliver each experience.</div>
        </div>
        <a
          href="https://github.com/najaandika"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Naja Andika GitHub profile"
          aria-label="Open Naja Andika GitHub profile in a new tab"
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
          {projects.map((project, idx) => (
            <Reveal key={project.title} className="w-full lg:w-[calc(50%_-_12px)]" delay={idx * 110}>
              <div
                role="button"
                tabIndex={0}
                aria-label={`Open ${project.title} case study in a new tab`}
                onClick={() => openExternal(project.link)}
                onKeyDown={(event) => handleCardKey(event, project.link)}
                className={`flex w-full min-h-[430px] sm:min-h-[500px] md:min-h-[540px] flex-col ${project.bg} shadow-[0px_18px_50px_rgba(11,52,66,0.12)] rounded-[20px] overflow-clip transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_24px_58px_rgba(11,52,66,0.18)] cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69]`}
              >
                <div className="flex h-fit min-h-[230px] md:min-h-[260px] flex-col pt-7 md:pt-8 pb-6 md:pb-7 px-6 md:px-8 gap-3">
                  <div className={`w-fit ${project.titleColor} font-['Poppins'] text-[21px] md:text-[26px] font-semibold leading-[1.2] tracking-[-0.4px]`}>{project.title}</div>
                  <div className={`w-fit max-w-[500px] ${project.descColor} font-['Poppins'] text-[13px] md:text-sm leading-[1.65]`}>{project.desc}</div>
                  <div className="flex h-fit items-center pt-2 pb-0 mt-auto mb-0 px-0 mx-0 gap-3 flex-wrap">
                    <button
                      onClick={(event) => { event.stopPropagation(); openExternal(project.link); }}
                      className={`flex h-[38px] items-center gap-2 ${project.btnBg} shadow rounded-full px-5 py-0 hover:opacity-90 transition-all duration-300`}
                      aria-label={`Open ${project.title} case study in a new tab`}
                    >
                      <div className={`w-fit font-['Poppins'] text-xs font-semibold leading-normal ${project.btnText}`}>View Case Study</div>
                      <span className={`text-sm leading-none ${project.btnText} transition-transform duration-300 group-hover:translate-x-0.5`}>-&gt;</span>
                    </button>
                    <div className={`flex h-[38px] items-center ${project.badge} border rounded-full px-4 py-0`}>
                      <div className="w-fit font-['Poppins'] text-xs font-semibold">{project.badgeText}</div>
                    </div>
                  </div>
                  <div className={`w-fit ${project.tagColor} font-['Poppins'] text-[11px] font-medium leading-normal tracking-[1.32px] uppercase`}>{project.tags}</div>
                </div>
                <div className="relative w-full h-[190px] sm:h-[230px] md:h-[280px] shrink-0 mt-auto overflow-hidden bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <img
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.045]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20"></div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/16 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20"></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div></Reveal>
  );
}













