import { useEffect, useRef } from 'react';
import useProjectStackGsap from '../hooks/useProjectStackGsap';
import { useLanguage } from '../context/useLanguage';
import { GithubMarkIcon } from './Icons';
import Reveal from './Reveal';
import { projectMeta } from '../data/projectMeta';
import ProjectCard from './projects/ProjectCard';

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
            aria-label={`${t.projects.githubProfileCta} — ${t.projects.githubProfileTitle} (${newTabHint})`}
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
            <ProjectCard
              key={project.title}
              project={project}
              idx={idx}
              total={projects.length}
              lang={lang}
              newTabHint={newTabHint}
              technologyLabel={technologyLabel}
            />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
