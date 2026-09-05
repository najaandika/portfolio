import Hero from './components/Hero';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="flex w-full max-w-[1440px] mx-auto h-fit flex-col bg-white font-['Poppins'] overflow-clip">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <Skills />
        <Education />
        <Projects />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
