import { useRef, useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import useCertificationsGsap from '../hooks/useCertificationsGsap';
import useCredentialExpansion from '../hooks/useCredentialExpansion';
import { credentials, featuredCredentials, filters } from '../data/certifications';
import CredentialCard from './certifications/CredentialCard';
import CredentialDialog from './certifications/CredentialDialog';
import './Certifications.css';

export default function Certifications() {
  const { t } = useLanguage();
  const copy = t.certifications;
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const lastTrigger = useRef(null);
  const { gridRef, expanded, setExpanded, compactLimit, isExpanding, toggleExpanded } = useCredentialExpansion(filter);
  const visible = filter === 'all' ? featuredCredentials : credentials.filter((item) => item.category === filter);
  const displayCount = filter === 'all' && !expanded ? compactLimit : visible.length;
  useCertificationsGsap(sectionRef, filter);

  function closeDialog() {
    setSelected(null);
    requestAnimationFrame(() => lastTrigger.current?.focus({ preventScroll: true }));
  }

  function openDialog(credential, event) {
    lastTrigger.current = event.currentTarget;
    setSelected(credential);
  }

  return (
    <section ref={sectionRef} id="certifications" className="credentials-section" aria-labelledby="certifications-title">
      <div className="credentials-container">
        <div className="credentials-overline">
          <span>{copy.eyebrow}</span>
          <span>{copy.overlineEnd}</span>
        </div>

        <div className="credentials-intro">
          <div className="credentials-intro-title">
            <p className="credentials-kicker">{copy.kicker}</p>
            <h2 id="certifications-title">{copy.title}<span aria-hidden="true">.</span></h2>
          </div>
          <div className="credentials-intro-aside">
            <p>{copy.subtitle}</p>
            <div className="credentials-summary">
              <span><strong>10</strong> {copy.certificatesCount}</span>
              <span className="credentials-summary-dot" aria-hidden="true" />
              <span><strong>02</strong> {copy.providersCount}</span>
            </div>
          </div>
        </div>

        <div className="credentials-toolbar">
          <div className="credentials-filters" role="group" aria-label={copy.filterLabel}>
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={'credentials-filter' + (filter === item ? ' is-active' : '')}
                aria-pressed={filter === item}
                onClick={() => { setFilter(item); setExpanded(false); }}
                disabled={isExpanding}
              >
                {copy.filters[item]}
                {item === 'all' && <span className="credentials-filter-count">10</span>}
              </button>
            ))}
          </div>
          <span className="credentials-showing" aria-live="polite">{displayCount.toString().padStart(2, '0')} / 10 {copy.showing}</span>
        </div>

        <div ref={gridRef} id="certifications-grid" className="credentials-grid">
          {visible.map((credential, index) => (
            <CredentialCard key={credential.id} credential={credential} index={index} hidden={filter === 'all' && !expanded && index >= compactLimit} copy={copy} onOpen={openDialog} />
          ))}
        </div>
        {filter === 'all' && (
          <div className="credentials-expand-control">
            <button
              type="button"
              className="credentials-expand-button"
              onClick={toggleExpanded}
              disabled={isExpanding}
              aria-controls="certifications-grid"
              aria-expanded={expanded}
            >
              <span>{expanded ? copy.showLess : copy.viewAll}</span>
              <span className={'credentials-expand-icon' + (expanded ? ' is-expanded' : '')} aria-hidden="true">↓</span>
            </button>
          </div>
        )}
        <p className="credentials-footer-note">{copy.footerNote}</p>
      </div>

      {selected && <CredentialDialog credential={selected} copy={copy} onClose={closeDialog} />}
    </section>
  );
}
