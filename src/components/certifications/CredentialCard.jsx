import CredentialArtwork from './CredentialArtwork';
import { ArrowIcon, BrandMark } from './CredentialIcons';

export default function CredentialCard({ credential, index, hidden, copy, onOpen }) {
  return (
    <article className="credential-card" data-credential-id={credential.id} hidden={hidden}>
      <div className="credential-card-meta">
        <span className="credential-card-number">{(index + 1).toString().padStart(2, '0')}</span>
        <span className="credential-card-provider">
          <BrandMark provider={credential.provider} />
          {credential.provider === 'cisco' ? 'CISCO' : 'COURSERA'}
        </span>
      </div>
      <div className={'credential-card-artwork' + (credential.provider === 'coursera' ? ' credential-card-artwork--plain' : '')}>
        <CredentialArtwork credential={credential} />
      </div>
      <div className="credential-card-body">
        <span className="credential-card-category">{copy.categories[credential.category]} · 2026</span>
        <h3>{credential.title}</h3>
        <p>{credential.issuer}</p>
        <button
          type="button"
          className="credential-card-action"
          onClick={(event) => onOpen(credential, event)}
          aria-label={copy.viewCertificate + ': ' + credential.title}
        >
          <span>{copy.viewCertificate}</span>
          <span className="credential-card-action-icon"><ArrowIcon diagonal /></span>
        </button>
      </div>
    </article>
  );
}
