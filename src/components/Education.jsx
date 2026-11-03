import { useLayoutEffect, useRef } from 'react';
import { useLanguage } from '../context/useLanguage';
import useExperienceTimelineGsap from '../hooks/useExperienceTimelineGsap';
import useEducationCardGsap from '../hooks/useEducationCardGsap';

function GraduationIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <path d="M5 18.5 24 10l19 8.5L24 27 5 18.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M13 22v9c6.5 5.5 15.5 5.5 22 0v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 20v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="42" cy="33" r="2.5" fill="currentColor" />
    </svg>
  );
}

export default function Education() {
  const { t, lang } = useLanguage();
  const content = t.education;
  const educationRef = useRef(null);
  const timelineRef = useRef(null);

  useEducationCardGsap(educationRef);
  useExperienceTimelineGsap(timelineRef, lang);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;

    const milestones = [...timeline.querySelectorAll('.journey-milestone')];
    const dots = [...timeline.querySelectorAll('.journey-milestone-dot')];
    if (!dots.length) return undefined;

    // Anchor the line to the CENTER of the first and last milestone dots.
    // The last item's copy may be much taller than its marker, so a fixed
    // bottom offset would leave an unwanted line dangling below the last dot.
    const alignTrack = () => {
      const timelineBounds = timeline.getBoundingClientRect();
      const firstBounds = dots[0].getBoundingClientRect();
      const lastBounds = dots[dots.length - 1].getBoundingClientRect();
      const firstCenter = firstBounds.top + firstBounds.height / 2;
      const lastCenter = lastBounds.top + lastBounds.height / 2;

      timeline.style.setProperty('--journey-track-top', `${firstCenter - timelineBounds.top}px`);
      timeline.style.setProperty('--journey-track-bottom', `${Math.max(0, timelineBounds.bottom - lastCenter)}px`);
    };

    alignTrack();
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(alignTrack)
      : null;
    milestones.forEach((milestone) => resizeObserver?.observe(milestone));
    resizeObserver?.observe(timeline);
    window.addEventListener('resize', alignTrack, { passive: true });
    let active = true;
    document.fonts?.ready.then(() => {
      if (active) alignTrack();
    });

    return () => {
      active = false;
      resizeObserver?.disconnect();
      window.removeEventListener('resize', alignTrack);
      timeline.style.removeProperty('--journey-track-top');
      timeline.style.removeProperty('--journey-track-bottom');
    };
  }, [lang]);

  return (
    <>
      <section id="education" ref={educationRef} className="journey-education" aria-labelledby="education-title">
        <div className="journey-container">
          <div className="journey-overline">
            <span>{content.educationEyebrow}</span>
            <span>{content.educationYears}</span>
          </div>

          <div className="journey-education-layout">
            <header className="journey-education-intro">
              <h2 id="education-title" className="journey-heading">
                {content.educationHeading}<span aria-hidden="true">.</span>
              </h2>
              <p className="journey-lead">{content.educationIntro}</p>
            </header>

            <article className="journey-education-card" aria-label={content.degree}>
              <div className="journey-card-top">
                <span className="journey-degree-label">{content.degreeLabel}</span>
                <span className="journey-card-period">{content.educationYears}</span>
              </div>

              <div className="journey-degree-content">
                <div>
                  <h3>{content.degree}</h3>
                  <p className="journey-university">{content.university}</p>
                  <p className="journey-faculty">{content.faculty}</p>
                </div>
                <div className="journey-degree-icon">
                  <GraduationIcon />
                </div>
              </div>

              <div className="journey-card-details">
                <div className="journey-academic-stat">
                  <span className="journey-meta-label">{content.gpaLabel}</span>
                  <p><strong>3.61</strong><span> / 4.00</span></p>
                </div>
                <div className="journey-academic-focus">
                  <span className="journey-meta-label">{content.focusLabel}</span>
                  <p>{content.focusValue}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="experience" className="journey-experience" aria-labelledby="experience-title">
        <div className="journey-container">
          <div className="journey-overline">
            <span>{content.experienceEyebrow}</span>
            <span>{content.experienceYears}</span>
          </div>

          <header className="journey-experience-header">
            <h2 id="experience-title" className="journey-heading">
              {content.experienceHeading}<span aria-hidden="true">.</span>
            </h2>
            <p className="journey-lead">{content.experienceIntro}</p>
          </header>

          <div className="journey-timeline" ref={timelineRef}>
            <div className="journey-timeline-track" aria-hidden="true">
              <span className="journey-timeline-track-base" />
              <span className="journey-timeline-track-progress" />
            </div>

            {content.experiences.map((experience, index) => (
              <article className="journey-milestone" key={experience.key} aria-labelledby={`experience-role-${index}`}>
                <div className="journey-milestone-date">
                  <span className="journey-entry-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{experience.period}</span>
                </div>

                <div className="journey-milestone-marker" aria-hidden="true">
                  <span className={`journey-milestone-dot journey-milestone-dot--${index % 3}`} />
                </div>

                <div className="journey-milestone-copy">
                  <p className="journey-mobile-date">{experience.period}</p>
                  <p className="journey-organization">{experience.organization}</p>
                  <h3 id={`experience-role-${index}`}>{experience.role}</h3>
                  <p className="journey-description">{experience.description}</p>
                  <ul className="journey-experience-tags" aria-label={content.experienceTagLabel}>
                    {experience.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
