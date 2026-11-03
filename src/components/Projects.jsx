import { useEffect, useRef } from 'react';
import useProjectStackGsap from '../hooks/useProjectStackGsap';
import { useLanguage } from '../context/useLanguage';
import { GithubMarkIcon } from './Icons';
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
    imageAlt: { en: 'Laptop mockup showing an air-conditioner and electronics service booking website', id: 'Mockup laptop menampilkan website pemesanan jasa servis AC dan elektronik' },
    imageSet: '/images/project-service-ac-480.webp 480w, /images/project-service-ac-768.webp 768w, /images/project-service-ac-960.webp 960w',
  },
  {
    tags: ['React', 'TypeScript', 'Admin Dashboard'],
    bg: 'bg-[#f1f0e8]',
    descColor: 'text-[#465047]',
    titleColor: 'text-[#0b3442]',
    tagColor: 'text-[#526052]',
    btnBg: 'bg-[#3f523f]',
    btnText: 'text-white',
    badge: 'bg-white/60 border-[#3f523f66] text-[#3f523f]',
    link: 'https://e-commerce-mobile.figma.site/',
    image: '/images/project-fashion-app.png',
    imageAlt: { en: 'Phone mockup showing the fashion shopping app home screen', id: 'Mockup ponsel menampilkan beranda aplikasi belanja fashion' },
  },
  {
    tags: ['Storefront', 'Checkout Flow', 'Responsive UI'],
    bg: 'bg-[#f3dfbe]',
    descColor: 'text-[#3e372e]',
    titleColor: 'text-[#0b3442]',
    tagColor: 'text-[#5c4c34]',
    btnBg: 'bg-[#3d3426]',
    btnText: 'text-white',
    badge: 'bg-[#ffffff2e] border-[#3d342655] text-[#4a3217]',
    link: 'https://moderen-e-commerce.figma.site/',
    image: '/images/project-ecommerce-storefront-960.webp',
    imageAlt: { en: 'Storefront mockup showing clothing collections and product listings', id: 'Mockup toko online menampilkan koleksi pakaian dan daftar produk' },
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
    link: 'https://bhd-hero.vercel.app',
    image: '/images/project-bhd-hero.png',
    imageAlt: { en: 'Laptop mockup showing the BHD Hero first-aid learning platform', id: 'Mockup laptop menampilkan platform pembelajaran pertolongan pertama BHD Hero' },
  },
  {
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    bg: 'bg-[#e8edf2]',
    descColor: 'text-[#526273]',
    titleColor: 'text-[#17324d]',
    tagColor: 'text-[#4e6c89]',
    btnBg: 'bg-[#315d83]',
    btnText: 'text-white',
    badge: 'bg-white/70 border-[#315d8366] text-[#315d83]',
    link: null,
    image: '/images/project-pos.png',
    imageAlt: { en: 'Laptop mockup showing a restaurant point-of-sale dashboard with products and orders', id: 'Mockup laptop menampilkan dasbor kasir restoran berisi produk dan pesanan' },
  },
  {
    tags: ['React', 'Role-Based UX', 'Mobile App'],
    bg: 'bg-[#fff4df]',
    descColor: 'text-[#5d5142]',
    titleColor: 'text-[#253126]',
    tagColor: 'text-[#6a604f]',
    btnBg: 'bg-[#f47732]',
    btnText: 'text-white',
    badge: 'bg-white/70 border-[#f4773266] text-[#c85f24]',
    link: 'https://parcelify.figma.site/',
    image: '/images/project-parcel-app.png',
    imageAlt: { en: 'Phone mockup showing a parcel tracking app with a delivery map', id: 'Mockup ponsel menampilkan aplikasi pelacakan paket dengan peta pengiriman' },
  },
];

function ProjectMedia({ project, lang, newTabHint }) {
  const MediaElement = project.link ? 'a' : 'div';

  return (
    <MediaElement
      {...(project.link
        ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className={`project-stack-media relative mt-auto h-[226px] w-full shrink-0 overflow-hidden bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-[280px] md:h-[300px] lg:mt-0 lg:h-auto lg:min-h-[min(62vh,550px)] lg:w-[54%] lg:self-stretch ${project.link ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#176f69]' : ''}`}
    >
      <img
        src={project.image}
        srcSet={project.imageSet}
        sizes="(min-width: 1024px) 54vw, calc(100vw - 40px)"
        alt=""
        aria-hidden="true"
        className="project-stack-media-backdrop"
        loading="lazy"
      />
      <img
        src={project.image}
        srcSet={project.imageSet}
        sizes="(min-width: 1024px) 54vw, calc(100vw - 40px)"
        alt={project.imageAlt[lang]}
        className="project-stack-media-artwork absolute inset-0 h-full w-full object-contain object-center transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.045]"
        loading="lazy"
      />
      {project.link && <span className="sr-only">({newTabHint})</span>}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20" aria-hidden="true"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/16 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20" aria-hidden="true"></div>
    </MediaElement>
  );
}

export default function Projects() {
  const { t, lang } = useLanguage();
  const stackRef = useRef(null);
  const githubLinkRef = useRef(null);

  useProjectStackGsap(stackRef, t.projects.title);

  useEffect(() => {
    const link = githubLinkRef.current;
    const arrow = link?.querySelector('[data-github-arrow]');
    if (!link || !arrow) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let disposed = false;
    let hovered = false;
    let gsapCore;

    const moveArrow = async () => {
      if (reduceMotion.matches || !finePointer.matches) return;
      const { gsap } = await import('gsap');
      if (disposed) return;
      gsapCore = gsap;
      gsap.to(arrow, {
        x: hovered ? 2 : 0,
        y: hovered ? -2 : 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onEnter = () => { hovered = true; void moveArrow(); };
    const onLeave = () => { hovered = false; void moveArrow(); };
    link.addEventListener('pointerenter', onEnter);
    link.addEventListener('pointerleave', onLeave);

    return () => {
      disposed = true;
      link.removeEventListener('pointerenter', onEnter);
      link.removeEventListener('pointerleave', onLeave);
      gsapCore?.killTweensOf(arrow);
      gsapCore?.set(arrow, { clearProps: 'transform' });
    };
  }, []);

  const projects = t.projects.items.map((item, idx) => ({
    ...item,
    ...projectMeta[idx],
    ctaLabel: `${item.ctaText} - ${item.title}`,
  }));
  const newTabHint = lang === 'id' ? 'terbuka di tab baru' : 'opens in a new tab';
  const technologyLabel = lang === 'id' ? 'Teknologi dan fitur proyek' : 'Project technologies and features';

  return (
    <Reveal>
      <section id="projects" aria-labelledby="projects-heading" className="flex min-h-[620px] flex-col bg-[#f7faf9] px-5 md:px-12 lg:px-20 xl:px-[120px] py-12 md:py-24">
        <div className="flex flex-col md:flex-row w-full h-fit items-start md:items-end gap-6 md:gap-8">
          <div className="flex flex-col flex-1 gap-3">
            <h2 id="projects-heading" className="w-fit text-[#0b3442] font-['Poppins'] text-[30px] md:text-5xl font-semibold leading-[1.12] tracking-[-1.7px]">
              {t.projects.title}
            </h2>
            <p className="w-fit max-w-[650px] text-[#455d63] font-['Poppins'] text-[15px] leading-[1.7]">
              {t.projects.subtitle}
            </p>
          </div>
          <a
            ref={githubLinkRef}
            href="https://github.com/najaandika"
            target="_blank"
            rel="noopener noreferrer"
            title={t.projects.githubProfileTitle}
            aria-label={`${t.projects.githubProfileTitle} (${newTabHint})`}
            className="inline-flex min-h-[46px] w-fit shrink-0 items-center gap-2.5 rounded-full border border-[#176f69] px-4 py-2.5 text-[#176f69] font-['Poppins'] text-[12px] font-semibold leading-normal transition-colors duration-200 hover:bg-[#176f69] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69] motion-reduce:transition-none sm:px-5 sm:text-[13px]"
          >
            <span className="size-[19px] shrink-0 text-current" aria-hidden="true">
              <GithubMarkIcon />
            </span>
            <span>{t.projects.githubProfileCta}</span>
            <svg data-github-arrow viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
        <div ref={stackRef} className="project-stack mt-12 w-full min-w-0">
            {projects.map((project, idx) => (
              <article key={project.title} aria-labelledby={`project-heading-${idx + 1}`} className="project-stack-card group relative w-full" style={{ zIndex: idx + 1 }}>
                <div className={`project-stack-surface flex w-full min-h-[430px] flex-col lg:min-h-[min(62vh,550px)] ${idx % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'} ${project.bg} shadow-[0px_18px_50px_rgba(11,52,66,0.12)] rounded-[20px] overflow-hidden transition-shadow duration-300 hover:shadow-[0px_24px_58px_rgba(11,52,66,0.18)]`}>
                  <div className="flex h-fit min-h-[230px] flex-col gap-3 px-6 pb-6 pt-7 md:px-8 md:pb-7 md:pt-8 lg:min-h-[min(62vh,550px)] lg:w-[46%] lg:px-10 lg:py-12">
                    <div className="flex items-center justify-between gap-3 pb-2">
                      <span className={`inline-flex min-h-[28px] items-center gap-2 rounded-full border px-3 py-1 font-['Poppins'] text-[10px] font-medium uppercase leading-4 tracking-[0.08em] ${project.badge}`}>
                        <span className="size-[6px] shrink-0 rounded-full bg-current opacity-80" aria-hidden="true" />
                        {project.badgeText}
                      </span>
                      <span className={`shrink-0 font-['Poppins'] text-[11px] font-medium tabular-nums opacity-80 ${project.tagColor}`} aria-hidden="true">
                        {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 id={`project-heading-${idx + 1}`} className={`w-fit ${project.titleColor} font-['Poppins'] text-[21px] md:text-[26px] font-semibold leading-[1.2] tracking-[-0.4px]`}>{project.title}</h3>
                    <p className={`w-fit max-w-[500px] ${project.descColor} font-['Poppins'] text-[13px] md:text-sm leading-[1.65]`}>{project.desc}</p>
                    <ul aria-label={technologyLabel} className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <li key={tag} className={`project-tech-tag inline-flex min-h-[28px] items-center rounded-md border border-current/20 bg-white/10 px-3 py-1 ${project.tagColor} font-['Poppins'] text-[11px] font-medium leading-4 tracking-[0.01em]`}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`project-cta inline-flex min-h-[46px] items-center justify-between gap-5 rounded-full px-4 py-2 shadow-sm ${project.btnBg} ${project.btnText} font-['Poppins'] text-[13px] font-semibold leading-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176f69]`}
                          aria-label={`${project.ctaLabel} (${newTabHint})`}
                        >
                          <span>{project.ctaText}</span>
                          <span className="project-cta-arrow" aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className={`project-cta inline-flex min-h-[46px] cursor-default items-center justify-between gap-5 rounded-full px-4 py-2 opacity-70 shadow-sm ${project.btnBg} ${project.btnText} font-['Poppins'] text-[13px] font-semibold leading-5`}>
                          {project.ctaText}
                        </span>
                      )}
                    </div>
                  </div>
                  <ProjectMedia project={project} lang={lang} newTabHint={newTabHint} />
                </div>
              </article>
            ))}
        </div>
      </section>
    </Reveal>
  );
}
