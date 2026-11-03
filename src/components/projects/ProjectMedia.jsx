export default function ProjectMedia({ project, lang, newTabHint }) {
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
