import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`will-change-transform transition-[opacity,transform,filter] duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] ${
        visible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-6 scale-[0.985] blur-[3px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}