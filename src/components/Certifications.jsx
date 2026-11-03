import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLanguage } from '../context/useLanguage';
import { CiscoIcon, CourseraIcon } from './Icons';
import useCertificationsGsap from '../hooks/useCertificationsGsap';
import './Certifications.css';

// Preload GSAP in its own chunk so the modal opens quickly without adding
// the animation engine to the critical-path React bundle.
const gsapModulePromise = import('gsap').catch(() => null);

// Asset files are bundled automatically when placed in src/assets/certifications.
// Missing assets simply use the accessible editorial illustration below.
const badgeAssets = import.meta.glob('../assets/certifications/badges/*.webp', { eager: true, query: '?url', import: 'default' });
const previewAssets = import.meta.glob('../assets/certifications/previews/*.webp', { eager: true, query: '?url', import: 'default' });
const badgeFor = (id) => badgeAssets[`../assets/certifications/badges/${id}.webp`];
const previewFor = (id) => previewAssets[`../assets/certifications/previews/${id}.webp`];

// Each course is a single credential: a Cisco badge and its completion certificate
// represent the same achievement, not two separate certificates.
const credentials = [
  { id: 'html', title: 'HTML Essentials', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'development', issued: '02 Sep 2026', certificateId: '3baaf20d-b262-474b-bb2f-447376f6c251', verificationUrl: 'https://www.credly.com/badges/ea5a2f30-e5f4-4c80-810a-cdccd15b301a', tags: ['HTML', 'Web fundamentals'] },
  { id: 'css', title: 'CSS Essentials', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'development', issued: '02 Sep 2026', certificateId: '40adb325-8465-473d-9cdf-28d7328d1330', verificationUrl: 'https://www.credly.com/badges/64b72413-8787-4fd4-b499-d3fe777c579e', tags: ['CSS', 'Web styling'] },
  { id: 'javascript-1', title: 'JavaScript Essentials 1', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'development', issued: '03 Sep 2026', certificateId: '767fad3f-fb31-4b18-ac68-810c3a39cb9f', verificationUrl: 'https://www.credly.com/badges/4d50bfcd-36dc-49f9-b825-e1779df27f35', tags: ['JavaScript', 'Programming'] },
  { id: 'javascript-2', title: 'JavaScript Essentials 2', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'development', issued: '03 Sep 2026', certificateId: '80ae2acd-21c5-4ddf-8517-b1ef499bac98', verificationUrl: 'https://www.credly.com/badges/d61735aa-0343-4696-a96c-79e60b734d82', tags: ['JavaScript', 'Advanced concepts'] },
  { id: 'operating-systems', title: 'Operating Systems Basics', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'it', issued: '03 Sep 2026', certificateId: 'ca60f423-cf4c-4534-941c-3b71c98474fc', verificationUrl: 'https://www.credly.com/badges/3ab11ea0-0457-416a-ae22-036299c8adf3', tags: ['Operating systems', 'IT fundamentals'] },
  { id: 'computer-hardware', title: 'Computer Hardware Basics', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'it', issued: '02 Sep 2026', certificateId: '674e0f0d-033c-4af6-ba02-bc60b8f12f39', verificationUrl: 'https://www.credly.com/badges/efc48803-d3c7-49f2-b22d-400fff1c8696', tags: ['Hardware', 'IT fundamentals'] },
  { id: 'customer-support', title: 'IT Customer Support Basics', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'it', issued: '01 Sep 2026', certificateId: null, verificationUrl: 'https://www.credly.com/badges/317b5eb7-30e1-49c0-803c-a9a7bad3637b', tags: ['Technical support', 'Customer service'] },
  { id: 'technical-support', title: 'Technical Support Fundamentals', issuer: 'Google · Coursera', provider: 'coursera', category: 'it', issued: '29 Aug 2026', certificateId: 'JSAB0CEKIF8Y', verificationUrl: 'https://www.coursera.org/verify/JSAB0CEKIF8Y', tags: ['IT support', 'Troubleshooting'] },
  { id: 'data-foundations', title: 'Foundations: Data, Data, Everywhere', issuer: 'Google · Coursera', provider: 'coursera', category: 'data', issued: '05 Aug 2026', certificateId: '3N3YL7IMMCB3', verificationUrl: 'https://www.coursera.org/verify/3N3YL7IMMCB3', tags: ['Data analytics', 'Data literacy'] },
  { id: 'excel', title: 'Excel Skills for Business: Essentials', issuer: 'Macquarie University · Coursera', provider: 'coursera', category: 'data', issued: '03 Aug 2026', certificateId: 'FVP4GV07CU34', verificationUrl: 'https://www.coursera.org/verify/FVP4GV07CU34', tags: ['Excel', 'Business productivity'] },
];

const filters = ['all', 'development', 'it', 'data'];

// A short curated opening gives both Cisco badges and Coursera certificates
// a place in the first row on every screen, without hiding other credentials
// from search filters or the expanded view.
const featuredIds = ['html', 'javascript-1', 'data-foundations', 'css', 'javascript-2', 'technical-support'];
const featuredCredentials = [
  ...featuredIds.map((id) => credentials.find((item) => item.id === id)),
  ...credentials.filter((item) => !featuredIds.includes(item.id)),
];
const getCompactLimit = () => (
  window.innerWidth <= 700 ? 3 : window.innerWidth <= 1050 ? 4 : 6
);

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {diagonal ? <path d="M6 18 18 6M7 6h11v11" /> : <path d="M4 12h16m-7-7 7 7-7 7" />}
    </svg>
  );
}

function BrandMark({ provider }) {
  return (
    <span className={'credential-brand-mark credential-brand-mark--' + provider} aria-hidden="true">
      {provider === 'cisco' ? <CiscoIcon /> : <CourseraIcon />}
    </span>
  );
}

// Show the original Cisco badge when installed; use an illustration otherwise.
function CredentialArtwork({ credential, large = false }) {
  const certificatePreview = previewFor(credential.id);
  if (certificatePreview) {
    return <img className={'credential-certificate-preview' + (large ? ' credential-certificate-preview--large' : '')} src={certificatePreview} alt={credential.title + ' — original Coursera certificate'} width="873" height="681" decoding="async" loading={large ? 'eager' : 'lazy'} />;
  }
  const badge = badgeFor(credential.id);
  if (badge) {
    return <img className={'credential-actual-badge' + (large ? ' credential-actual-badge--large' : '')} src={badge} alt={credential.title + ' digital badge'} loading={large ? 'eager' : 'lazy'} />;
  }
  if (credential.provider === 'cisco') {
    return (
      <div className={'credential-art credential-art--cisco' + (large ? ' credential-art--large' : '')} aria-hidden="true">
        <div className="credential-badge-top">
          <CiscoIcon />
          <span>Networking<br />Academy</span>
        </div>
        <div className="credential-badge-wave">
          <strong>Verified</strong>
          <span className="credential-badge-wave-light" />
        </div>
        <div className="credential-badge-course">{credential.title}</div>
      </div>
    );
  }

  const institution = credential.id === 'excel' ? 'Macquarie University' : 'Google';
  return (
    <div className={'credential-art credential-art--coursera' + (large ? ' credential-art--large' : '')} aria-hidden="true">
      <div className="credential-course-top">
        <span>{institution}</span>
        <CourseraIcon />
      </div>
      <div className="credential-course-stamp">COURSE<br />CERTIFICATE</div>
      <div className="credential-course-name">{credential.title}</div>
      <div className="credential-course-bottom">COURSERA · 2026</div>
    </div>
  );
}

function CredentialDialog({ credential, copy, onClose }) {
  const closeRef = useRef(null);
  const backdropRef = useRef(null);
  const dialogRef = useRef(null);
  const hasOriginalBadge = Boolean(badgeFor(credential.id));
  const hasOriginalPreview = Boolean(previewFor(credential.id));

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    const backdrop = backdropRef.current;
    const dialog = dialogRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!backdrop || !dialog || reduced.matches) return undefined;

    // Hide before paint so a cached or delayed dynamic import never shows
    // the modal at 100% and then flashes it back to transparent.
    backdrop.style.opacity = '0';
    backdrop.style.visibility = 'hidden';
    dialog.style.opacity = '0';
    dialog.style.visibility = 'hidden';
    let disposed = false;
    let context;
    let unbind;
    const animate = async () => {
      const module = await gsapModulePromise;
      if (disposed) return;
      if (!module) {
        backdrop.style.removeProperty('opacity');
        backdrop.style.removeProperty('visibility');
        dialog.style.removeProperty('opacity');
        dialog.style.removeProperty('visibility');
        closeRef.current?.focus({ preventScroll: true });
        return;
      }
      const { gsap } = module;
      context = gsap.context(() => {
        gsap.fromTo(backdrop, { autoAlpha: 0 }, {
          autoAlpha: 1, duration: 0.20, ease: 'power2.out',
        });
        gsap.fromTo(dialog, {
          autoAlpha: 0,
          scale: window.innerWidth < 701 ? 1 : 0.985,
          y: window.innerWidth < 701 ? 8 : 0,
        }, {
          autoAlpha: 1, scale: 1, y: 0, duration: 0.27,
          ease: 'power2.out', clearProps: 'opacity,visibility,transform',
          onComplete: () => closeRef.current?.focus({ preventScroll: true }),
        });
      }, backdrop);
      const link = dialog.querySelector('.credential-verification-link');
      const arrow = link?.querySelector('svg');
      if (link && arrow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const enter = () => gsap.to(arrow, { x: 2, y: -2, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
        const leave = () => gsap.to(arrow, { x: 0, y: 0, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
        link.addEventListener('pointerenter', enter);
        link.addEventListener('pointerleave', leave);
        unbind = () => {
          link.removeEventListener('pointerenter', enter);
          link.removeEventListener('pointerleave', leave);
          gsap.killTweensOf(arrow);
        };
      }
    };
    void animate();

    return () => {
      disposed = true;
      unbind?.();
      context?.revert();
      for (const element of [backdrop, dialog]) {
        element.style.removeProperty('opacity');
        element.style.removeProperty('visibility');
      }
    };
  }, []);

  return (
    <div ref={backdropRef} className="credential-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="credential-modal" role="dialog" aria-modal="true" aria-labelledby="credential-dialog-heading" ref={dialogRef}>
        <button ref={closeRef} className="credential-modal-close" type="button" onClick={onClose} aria-label={copy.close}>×</button>
        <div className="credential-modal-visual">
          <span className="credential-modal-eyebrow">{hasOriginalPreview ? copy.previewLabel : hasOriginalBadge ? copy.badgeLabel : copy.visualLabel}</span>
          <CredentialArtwork credential={credential} large />
          {!hasOriginalBadge && !hasOriginalPreview && <span className="credential-modal-footnote">{copy.visualNote}</span>}
        </div>
        <div className="credential-modal-content">
          <div className="credential-modal-count">{credential.provider === 'cisco' ? 'CISCO NETWORKING ACADEMY' : 'COURSERA'} <span> / 2026</span></div>
          <h3 id="credential-dialog-heading">{credential.title}</h3>
          <p className="credential-modal-issuer">{credential.issuer}</p>
          <div className="credential-modal-rule" />
          <dl className="credential-modal-metadata">
            <div><dt>{copy.issued}</dt><dd>{credential.issued}</dd></div>
            <div><dt>{copy.issuer}</dt><dd>{credential.issuer}</dd></div>
            {credential.certificateId && <div><dt>{copy.idLabel}</dt><dd className="credential-id">{credential.certificateId}</dd></div>}
          </dl>
          <div className="credential-modal-skills" aria-label={copy.skills}>
            {credential.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {credential.verificationUrl && (
            <a className="credential-verification-link" href={credential.verificationUrl} target="_blank" rel="noopener noreferrer">
              {credential.provider === 'cisco' ? copy.verifyCredly : copy.verifyCoursera} <ArrowIcon diagonal />
            </a>
          )}
          <button type="button" className="credential-modal-done" onClick={onClose}>
            {copy.done} <ArrowIcon />
          </button>
        </div>
      </section>
    </div>
  );
}

export default function Certifications() {
  const { t } = useLanguage();
  const copy = t.certifications;
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const expandTimelineRef = useRef(null);
  const expandLockRef = useRef(false);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [compactLimit, setCompactLimit] = useState(getCompactLimit);
  const compactLimitRef = useRef(compactLimit);
  const [isExpanding, setIsExpanding] = useState(false);
  const [selected, setSelected] = useState(null);
  const lastTrigger = useRef(null);
  const visible = filter === 'all' ? featuredCredentials : credentials.filter((item) => item.category === filter);
  const displayCount = filter === 'all' && !expanded ? compactLimit : visible.length;
  useCertificationsGsap(sectionRef, filter);

  useEffect(() => {
    const onResize = () => {
      const nextLimit = getCompactLimit();
      // Mobile browser chrome can resize the viewport's HEIGHT while scrolling.
      // Only reconfigure the grid when the actual column breakpoint changes.
      if (nextLimit === compactLimitRef.current) return;
      compactLimitRef.current = nextLimit;
      if (expandTimelineRef.current) {
        expandTimelineRef.current.kill();
        expandTimelineRef.current = null;
        const grid = gridRef.current;
        void gsapModulePromise.then((module) => {
          if (!module || !grid) return;
          const { gsap } = module;
          gsap.set(grid, { clearProps: 'height,overflow' });
          gsap.set(grid.querySelectorAll('.credential-card'), { clearProps: 'opacity,visibility,transform,boxShadow' });
        });
        expandLockRef.current = false;
        setIsExpanding(false);
      }
      setCompactLimit(nextLimit);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => () => {
    expandTimelineRef.current?.kill();
    expandTimelineRef.current = null;
  }, []);

  async function toggleExpanded() {
    if (expandLockRef.current || filter !== 'all') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setExpanded((current) => !current);
      return;
    }
    expandLockRef.current = true;
    setIsExpanding(true);
    try {
      const module = await gsapModulePromise;
      if (!module) {
        setExpanded((current) => !current);
        return;
      }
      const { gsap } = module;
      const grid = gridRef.current;
      if (!grid) return;

      const cards = [...grid.querySelectorAll('.credential-card')];
      const extras = cards.slice(compactLimit);
      gsap.killTweensOf([grid, ...extras]);
      gsap.set(extras, { clearProps: 'opacity,visibility,transform,boxShadow' });
      const startHeight = grid.getBoundingClientRect().height;

      const finish = () => {
        gsap.set(extras, { clearProps: 'opacity,visibility,transform,boxShadow' });
        gsap.set(grid, { clearProps: 'height,overflow' });
        expandTimelineRef.current = null;
        expandLockRef.current = false;
        setIsExpanding(false);
        void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh());
      };

      if (!expanded) {
        // React commits before measuring: avoids Flip's duplicate transforms and
        // stale hidden-card opacity left behind after repeated toggles.
        flushSync(() => setExpanded(true));
        const endHeight = grid.getBoundingClientRect().height;
        gsap.set(grid, { height: startHeight, overflow: 'hidden' });
        gsap.set(extras, { autoAlpha: 0, y: 12 });

        expandTimelineRef.current = gsap.timeline({ onComplete: finish })
          .to(grid, { height: endHeight, duration: 0.53, ease: 'power2.inOut' }, 0)
          .to(extras, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.035, ease: 'power2.out' }, 0.09);
      } else {
        // Measure the bottom of the last retained card without abruptly hiding
        // the extra rows. Fade and shrink together in ONE GSAP timeline.
        const lastCard = cards[compactLimit - 1];
        const endHeight = lastCard.getBoundingClientRect().bottom - grid.getBoundingClientRect().top;
        const scrollState = { y: window.scrollY };
        const scrollTarget = Math.max(0, scrollState.y - (startHeight - endHeight));
        gsap.set(grid, { height: startHeight, overflow: 'hidden' });
        expandTimelineRef.current = gsap.timeline({
          onComplete: () => {
            flushSync(() => setExpanded(false));
            finish();
          },
        })
          .to(grid, { height: endHeight, duration: 0.53, ease: 'power2.inOut' }, 0)
          // Keep the control at a stable viewport position as the preceding
          // rows contract; avoids a sudden scroll clamp near the page bottom.
          .to(scrollState, {
            y: scrollTarget,
            duration: 0.53,
            ease: 'power2.inOut',
            // Force the per-frame position immediately. Global
            // scroll-behavior:smooth would otherwise queue a second animation
            // and make the viewport lag behind the shrinking grid.
            onUpdate: () => window.scrollTo({ top: scrollState.y, behavior: 'instant' }),
          }, 0)
          .to(extras, { autoAlpha: 0, y: -8, duration: 0.2, stagger: 0.025, ease: 'power1.in' }, 0);
      }
    } catch (error) {
      console.error('Certifications expand animation could not load', error);
      setExpanded((current) => !current);
    } finally {
      // The timeline owns the lock until onComplete; failures release it here.
      if (!expandTimelineRef.current) {
        expandLockRef.current = false;
        setIsExpanding(false);
      }
    }
  }

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
            <article className="credential-card" data-credential-id={credential.id} key={credential.id} hidden={filter === 'all' && !expanded && index >= compactLimit}>
              <div className="credential-card-meta">
                <span className="credential-card-number">{(index + 1).toString().padStart(2, '0')}</span>
                <span className="credential-card-provider"><BrandMark provider={credential.provider} />{credential.provider === 'cisco' ? 'CISCO' : 'COURSERA'}</span>
              </div>
              <div className={'credential-card-artwork' + (credential.provider === 'coursera' ? ' credential-card-artwork--plain' : '')}><CredentialArtwork credential={credential} /></div>
              <div className="credential-card-body">
                <span className="credential-card-category">{copy.categories[credential.category]} · 2026</span>
                <h3>{credential.title}</h3>
                <p>{credential.issuer}</p>
                <button type="button" className="credential-card-action" onClick={(event) => openDialog(credential, event)} aria-label={copy.viewCertificate + ': ' + credential.title}>
                  <span>{copy.viewCertificate}</span>
                  <span className="credential-card-action-icon"><ArrowIcon diagonal /></span>
                </button>
              </div>
            </article>
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
