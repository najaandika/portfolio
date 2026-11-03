import { useRef } from 'react';
import useTechMarqueeGsap from '../hooks/useTechMarqueeGsap';

const development = [
  { label: 'HTML5', icon: '/icons/html5.svg' },
  { label: 'CSS3', icon: '/icons/css.svg' },
  { label: 'JavaScript', icon: '/icons/javascript.svg' },
  { label: 'React', icon: '/icons/react.svg' },
  { label: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
  { label: 'PHP', icon: '/icons/php.svg' },
  { label: 'Laravel', icon: '/icons/laravel.svg' },
  { label: 'MySQL', icon: '/icons/mysql.svg' },
  { label: 'PostgreSQL', icon: '/icons/postgresql.svg' },
];

const workflow = [
  { label: 'VS Code', icon: '/icons/vscode.svg' },
  { label: 'Git', icon: '/icons/git.svg' },
  { label: 'Figma', icon: '/icons/figma.svg' },
  { label: 'MCP', icon: '/icons/mcp.svg' },
  { label: 'Microsoft Excel', icon: '/icons/microsoft-excel.svg' },
  { label: 'AWS', icon: '/icons/amazon-web-services.svg' },
  { label: 'DigitalOcean', icon: '/icons/digitalocean.svg' },
];

const rows = [
  { id: 'development', items: development, direction: 'left' },
  { id: 'workflow', items: workflow, direction: 'right' },
];

function MarqueeItems({ items, clone = false }) {
  return items.map((tool, index) => (
    <li
      key={`${tool.label}-${index}-${clone ? 'clone' : 'main'}`}
      className="tech-marquee-item"
      {...(clone ? { 'aria-hidden': true, 'data-clone': '' } : {})}
    >
      <img src={tool.icon} alt="" aria-hidden="true" width="30" height="30" loading="eager" />
      <span>{tool.label}</span>
    </li>
  ));
}

export default function TechMarquee({ copy, locale }) {
  const rootRef = useRef(null);
  useTechMarqueeGsap(rootRef, locale);

  return (
    <div className="tech-marquee-stack" ref={rootRef}>
      {rows.map((row, index) => {
        const title = row.id === 'development' ? copy.marqueeDevelopment : copy.marqueeWorkflow;
        const direction = row.direction === 'left' ? copy.marqueeLeft : copy.marqueeRight;
        // Two identical visual repeats per group keep the loops seamless at
        // their original GSAP speed, including on wide displays.
        const visualRepeats = 2;

        return (
          <div className="tech-marquee-row" key={row.id} data-direction={row.direction}>
            <div className="tech-marquee-row-header">
              <h3 id={`tech-marquee-${row.id}`}>
                <span className="tech-marquee-index" aria-hidden="true">0{index + 1} /</span>
                {title}
              </h3>
              <span className="tech-marquee-direction" aria-hidden="true">
                {row.direction === 'left' ? '←' : '→'} {direction}
              </span>
            </div>
            <div
              className="tech-marquee-viewport"
              role="region"
              tabIndex={0}
              aria-labelledby={`tech-marquee-${row.id}`}
              aria-describedby="tech-marquee-instructions"
            >
              <div className="tech-marquee-track">
                <ul className="tech-marquee-group">
                  {Array.from({ length: visualRepeats }, (_, repeat) => (
                    <MarqueeItems key={repeat} items={row.items} clone={repeat > 0} />
                  ))}
                </ul>
                <ul className="tech-marquee-group" aria-hidden="true">
                  {Array.from({ length: visualRepeats }, (_, repeat) => (
                    <MarqueeItems key={repeat} items={row.items} clone />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
      <p className="tech-marquee-instructions" id="tech-marquee-instructions">
        {copy.marqueeHint}
      </p>
    </div>
  );
}
