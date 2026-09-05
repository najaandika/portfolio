import { useEffect, useState } from 'react';
import Hero from './components/Hero';

const deferredSections = [
  () => import('./components/Skills'),
  () => import('./components/Education'),
  () => import('./components/Projects'),
  () => import('./components/Certifications'),
];

function DeferredSection({ load }) {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const loadSection = () => {
      load().then((module) => setComponent(() => module.default));
    };
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(loadSection, { timeout: 1200 })
      : window.setTimeout(loadSection, 200);

    return () => {
      if (window.cancelIdleCallback && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [load]);

  return Component ? <Component /> : null;
}

export default function App() {
  return (
    <div className="flex w-full max-w-[1440px] mx-auto h-fit flex-col bg-white font-['Poppins'] overflow-clip">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        {deferredSections.map((load) => <DeferredSection key={load.toString()} load={load} />)}
      </main>
      <DeferredSection load={() => import('./components/Footer')} />
    </div>
  );
}
