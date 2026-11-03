import { useRef } from 'react';
import { useLanguage } from '../context/useLanguage';
import useSkillsIntroGsap from '../hooks/useSkillsIntroGsap';
import TechMarquee from './TechMarquee';

async function handleProjectsNavigation(event) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const destination = document.getElementById('projects');
  if (!destination) return;

  event.preventDefault();
  window.history.pushState(null, '', '#projects');
  const top = destination.getBoundingClientRect().top + window.scrollY - 104;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top, behavior: 'instant' });
    return;
  }

  // The site's global smooth-scroll competes with ScrollToPlugin unless
  // temporarily disabled (the same navigation behavior used by Footer).
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  const restore = () => { root.style.scrollBehavior = previousBehavior; };

  try {
    const [gsapModule, pluginModule] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollToPlugin'),
    ]);
    const gsap = gsapModule.gsap || gsapModule.default;
    gsap.registerPlugin(pluginModule.ScrollToPlugin);
    gsap.to(window, {
      scrollTo: { y: top, autoKill: false },
      duration: 1,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onComplete: restore,
      onInterrupt: restore,
    });
  } catch {
    window.scrollTo({ top, behavior: 'instant' });
    restore();
  }
}

export default function Skills() {
  const { t, lang } = useLanguage();
  const copy = t.skills;
  const introRef = useRef(null);
  useSkillsIntroGsap(introRef);

  return (
    <section id="skills" className="expertise-section" aria-labelledby="skills-title">
      <div className="expertise-container">
        <div className="expertise-overline">
          <span>{copy.eyebrow}</span>
          <span>{copy.overlineEnd}</span>
        </div>

        <div ref={introRef} className="expertise-marquee-intro">
          <div>
            <p data-skills-reveal="kicker" className="expertise-kicker">{copy.kicker}</p>
            <h2 data-skills-reveal="title" id="skills-title" className="expertise-title">
              <span className="expertise-title-clip">
                <span className="expertise-title-text">{copy.headline}<span className="expertise-title-dot" aria-hidden="true">.</span></span>
              </span>
            </h2>
          </div>
          <div className="expertise-marquee-summary">
            <p data-skills-reveal="desc1" className="expertise-description">{copy.desc1}</p>
            <p data-skills-reveal="desc2" className="expertise-description expertise-description-secondary">{copy.desc2}</p>
            <a data-skills-reveal="cta" className="expertise-project-link" href="#projects" onClick={handleProjectsNavigation}>
              <span>{copy.viewProjects}</span>
              <span data-skills-arrow aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <TechMarquee copy={copy} locale={lang} />
      </div>
    </section>
  );
}
