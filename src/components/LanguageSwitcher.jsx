import { useLanguage } from '../context/useLanguage';

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label={lang === 'id' ? 'Pilihan bahasa' : 'Language selector'}
      className={`language-switcher ${className}`}
      data-language={lang}
    >
      <span className="language-switcher-indicator" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        aria-label="EN — English"
        lang="en"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('id')}
        aria-pressed={lang === 'id'}
        aria-label="ID — Bahasa Indonesia"
        lang="id"
      >
        ID
      </button>
    </div>
  );
}
