import { CiscoIcon, CourseraIcon } from '../Icons';
import { badgeFor, previewFor } from './assets';

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

export default CredentialArtwork;
