import { useLanguage } from '../context/useLanguage';

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center p-0.5 rounded-full bg-white/90 border border-[#dce6e2] shadow-[0px_4px_12px_rgba(8,47,61,0.06)] backdrop-blur-md transition-all duration-300 ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        aria-label="English"
        className={`relative px-2.5 py-1 text-[11px] font-semibold font-['Poppins'] rounded-full transition-all duration-300 ${
          lang === 'en'
            ? 'bg-[#176f69] text-white shadow-[0px_2px_6px_rgba(23,111,105,0.3)] scale-[1.02]'
            : 'text-[#34505a] hover:text-[#0b3442]'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('id')}
        aria-pressed={lang === 'id'}
        aria-label="Bahasa Indonesia"
        className={`relative px-2.5 py-1 text-[11px] font-semibold font-['Poppins'] rounded-full transition-all duration-300 ${
          lang === 'id'
            ? 'bg-[#176f69] text-white shadow-[0px_2px_6px_rgba(23,111,105,0.3)] scale-[1.02]'
            : 'text-[#34505a] hover:text-[#0b3442]'
        }`}
      >
        ID
      </button>
    </div>
  );
}
