import ProjectMedia from './ProjectMedia';

export default function ProjectCard({ project, idx, total, lang, newTabHint, technologyLabel }) {
  return (
    <article aria-labelledby={`project-heading-${idx + 1}`} className="project-stack-card group relative w-full" style={{ zIndex: idx + 1 }}>
      <div className={`project-stack-surface flex w-full min-h-[430px] flex-col lg:min-h-[min(62vh,550px)] ${idx % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'} ${project.bg} shadow-[0px_18px_50px_rgba(11,52,66,0.12)] rounded-[20px] overflow-hidden transition-shadow duration-300 hover:shadow-[0px_24px_58px_rgba(11,52,66,0.18)]`}>
        <div className="flex h-fit min-h-[230px] flex-col gap-3 px-6 pb-6 pt-7 md:px-8 md:pb-7 md:pt-8 lg:min-h-[min(62vh,550px)] lg:w-[46%] lg:px-10 lg:py-12">
          <div className="flex items-center justify-between gap-3 pb-2">
            <span className={`inline-flex min-h-[28px] items-center gap-2 rounded-full border px-3 py-1 font-['Poppins'] text-[10px] font-medium uppercase leading-4 tracking-[0.08em] ${project.badge}`}>
              <span className="size-[6px] shrink-0 rounded-full bg-current opacity-80" aria-hidden="true" />
              {project.badgeText}
            </span>
            <span className={`shrink-0 font-['Poppins'] text-[11px] font-medium tabular-nums ${project.tagColor}`} aria-hidden="true">
              {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
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
              <span className={`project-cta inline-flex min-h-[46px] cursor-default items-center justify-between gap-5 rounded-full px-4 py-2 shadow-sm ${project.btnBg} ${project.btnText} font-['Poppins'] text-[13px] font-semibold leading-5`}>
                {project.ctaText}
              </span>
            )}
          </div>
        </div>
        <ProjectMedia project={project} lang={lang} newTabHint={newTabHint} />
      </div>
    </article>
  );
}
