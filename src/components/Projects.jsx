import { useLanguage } from '../context/useLanguage';
import { GithubIcon } from './Icons';
import Reveal from './Reveal';

const projectMeta = [
  {
    tags: ['Astro', 'Tailwind CSS', 'Responsive UI'],
    bg: 'bg-[#176f69]',
    descColor: 'text-[#e7f3f1]',
    titleColor: 'text-white',
    tagColor: 'text-[#cce5e1]',
    btnBg: 'bg-white',
    btnText: 'text-[#176f69]',
    badge: 'bg-[#ffffff14] border-[#ffffff66] text-white',
    link: 'https://ac-service-website-one.vercel.app/',
    image: '/images/project-service-ac-960.webp',
    imageSet: '/images/project-service-ac-480.webp 480w, /images/project-service-ac-768.webp 768w, /images/project-service-ac-960.webp 960w',
  },
  {
    tags: ['Laravel', 'Midtrans', 'MySQL'],
    bg: 'bg-[#e8b84a]',
    descColor: 'text-[#263f43]',
    titleColor: 'text-[#0b3442]',
    tagColor: 'text-[#4f563e]',
    btnBg: 'bg-[#173f41]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff24] border-[#173f4166] text-[#173f41]',
    link: 'https://github.com/najaandika/thrif_app.git',
    image: '/images/project-thrif-960.webp',
    imageSet: '/images/project-thrif-480.webp 480w, /images/project-thrif-768.webp 768w, /images/project-thrif-960.webp 960w',
  },
  {
    tags: ['Storefront', 'Checkout Flow', 'Responsive UI'],
    bg: 'bg-[#f1c98f]',
    descColor: 'text-[#3e372e]',
    titleColor: 'text-[#0b3442]',
    tagColor: 'text-[#5c4c34]',
    btnBg: 'bg-[#3d3426]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff2e] border-[#3d342655] text-[#4a3217]',
    link: 'https://moderen-e-commerce.figma.site/',
    image: '/images/project-ecommerce-storefront-960.webp',
    imageSet: '/images/project-ecommerce-storefront-480.webp 480w, /images/project-ecommerce-storefront-768.webp 768w, /images/project-ecommerce-storefront-960.webp 960w',
  },
  {
    tags: ['React', 'Laravel', 'Gamification'],
    bg: 'bg-[#dce9ff]',
    descColor: 'text-[#30486b]',
    titleColor: 'text-[#0b3c92]',
    tagColor: 'text-[#2758a4]',
    btnBg: 'bg-[#0755c9]',
    btnText: 'text-white',
    badge: 'bg-white/60 border-[#0755c966] text-[#16488e]',
    link: null,
    image: '/images/project-bhd-hero.png',
  },
];

function openExternal(link) {
  window.open(link, '_blank', 'noopener,noreferrer');
}

export default function Projects() {
  const { t } = useLanguage();

  const projects = t.projects.items.map((item, idx) => ({
    ...item,
    ...projectMeta[idx],
    ctaLabel: `${item.ctaText} - ${item.title}`,
  }));

  return (
    <Reveal>
      <div id="projects" className="flex min-h-[620px] flex-col bg-[#f7faf9] px-5 md:px-12 lg:px-20 xl:px-[120px] py-12 md:py-24">
        <div className="flex flex-col md:flex-row w-full h-fit items-start md:items-end gap-6 md:gap-8">
          <div className="flex flex-col flex-1 gap-3">
            <div className="w-fit text-[#0b3442] font-['Poppins'] text-[30px] md:text-5xl font-semibold leading-[1.12] tracking-[-1.7px]">
              {t.projects.title}
            </div>
            <div className="w-fit max-w-[650px] text-[#455d63] font-['Poppins'] text-[15px] leading-[1.7]">
              {t.projects.subtitle}
            </div>
          </div>
          <a
            href="https://github.com/najaandika"
            target="_blank"
            rel="noopener noreferrer"
            title={t.projects.githubProfileTitle}
            aria-label={`${t.projects.githubProfileTitle} in a new tab`}
            className="flex w-fit shrink-0 items-center border text-[#176f69] font-['Poppins'] text-[13px] font-semibold leading-normal rounded-full px-5 py-3 gap-2 border-[#176f69] hover:bg-[#176f69] hover:text-white transition-colors"
          >
            <div className="size-4 text-current">
              <GithubIcon />
            </div>
            <div className="w-fit text-current font-['Poppins'] text-[13px] font-semibold leading-normal">
              View GitHub Projects
            </div>
          </a>
        </div>
        <div className="flex w-full min-w-0 h-fit mt-12 mb-0 mx-0">
          <div className="flex w-full h-fit flex-wrap gap-6">
            {projects.map((project, idx) => (
              <Reveal key={project.title} className="w-full lg:w-[calc(50%_-_12px)]" delay={idx * 110}>
                <div className={`flex w-full min-h-[430px] sm:min-h-[500px] md:min-h-[540px] flex-col ${project.bg} shadow-[0px_18px_50px_rgba(11,52,66,0.12)] rounded-[20px] overflow-clip transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_24px_58px_rgba(11,52,66,0.18)] group`}>
                  <div className="flex h-fit min-h-[230px] md:min-h-[260px] flex-col pt-7 md:pt-8 pb-6 md:pb-7 px-6 md:px-8 gap-3">
                    <div className={`w-fit ${project.titleColor} font-['Poppins'] text-[21px] md:text-[26px] font-semibold leading-[1.2] tracking-[-0.4px]`}>{project.title}</div>
                    <div className={`w-fit max-w-[500px] ${project.descColor} font-['Poppins'] text-[13px] md:text-sm leading-[1.65]`}>{project.desc}</div>
                    <div className="flex h-fit items-center pt-2 pb-0 mt-auto mb-0 px-0 mx-0 gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => project.link && openExternal(project.link)}
                        disabled={!project.link}
                        className={`flex h-[38px] items-center gap-2 ${project.btnBg} shadow rounded-full px-5 py-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69] disabled:cursor-not-allowed disabled:opacity-75`}
                        aria-label={project.ctaLabel}
                      >
                        <div className={`w-fit font-['Poppins'] text-xs font-semibold leading-normal ${project.btnText}`}>{project.ctaText}</div>
                        <span className={`text-sm leading-none ${project.btnText} transition-transform duration-300 group-hover:translate-x-0.5`}>-&gt;</span>
                      </button>
                      <div className={`flex h-[38px] items-center ${project.badge} border rounded-full px-4 py-0`}>
                        <div className="w-fit font-['Poppins'] text-xs font-semibold">{project.badgeText}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`rounded-full border border-current/25 px-3 py-1 ${project.tagColor} font-['Poppins'] text-[10px] font-semibold uppercase leading-normal tracking-[0.9px]`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => project.link && openExternal(project.link)}
                    disabled={!project.link}
                    className="relative w-full h-[190px] sm:h-[230px] md:h-[280px] shrink-0 mt-auto overflow-hidden bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#176f69]"
                    aria-label={project.ctaLabel}
                  >
                    <img
                      src={project.image}
                      srcSet={project.imageSet}
                      sizes="(min-width: 1024px) 44vw, calc(100vw - 40px)"
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.045]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20"></div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/16 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20"></div>
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
