import { useEffect, useLayoutEffect, useRef } from 'react';
import CredentialArtwork from './CredentialArtwork';
import { badgeFor, previewFor } from './assets';
import { ArrowIcon } from './CredentialIcons';
import { gsapModulePromise } from './gsapModule';

export default function CredentialDialog({ credential, copy, onClose }) {
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
