import { CiscoIcon, CourseraIcon } from '../Icons';

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

export { ArrowIcon, BrandMark };
