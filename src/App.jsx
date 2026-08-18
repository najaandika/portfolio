import { lazy, Suspense } from 'react';
import Hero from './components/Hero';
import Footer from './components/Footer';

const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));

export default function App() {
  return (
    <div className="flex w-full max-w-[1440px] mx-auto h-fit flex-col bg-white font-['Poppins'] overflow-clip">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <Suspense fallback={null}>
          <Skills />
          <Education />
          <Projects />
          <Certifications />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
