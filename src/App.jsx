import { lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageProvider';
import { useLanguage } from './context/useLanguage';
import Hero from './components/Hero';

const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Footer = lazy(() => import('./components/Footer'));

function PortfolioContent() {
  const { t } = useLanguage();

  return (
    <div className="flex w-full max-w-[1440px] mx-auto h-fit flex-col bg-white font-['Poppins'] overflow-clip">
      <a href="#main-content" className="skip-link">{t.skipLink}</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <Suspense fallback={null}>
          <Skills />
          <Education />
          <Projects />
          <Certifications />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
}
