import { useRef } from 'react';
import { useLanguage } from '../context/useLanguage';
import useSkillsIntroGsap from '../hooks/useSkillsIntroGsap';
import TechMarquee from './TechMarquee';
import { navigateToPortfolioSection } from '../utils/navigateToPortfolioSection';

function handleProjectsNavigation(event) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  void navigateToPortfolioSection('projects');
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
