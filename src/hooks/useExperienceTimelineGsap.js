import { useEffect } from 'react';

/**
 * Scroll-driven editorial timeline, progressively enhanced with GSAP.
 * All text and milestones remain visible without JavaScript or when reduced
 * motion is requested. No pinning: normal page scrolling on every viewport.
 */
export default function useExperienceTimelineGsap(timelineRef, locale) {
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let loading = false;
    let gsapContext = null;

    const clear = () => {
      gsapContext?.revert();
      gsapContext = null;
      timeline.querySelectorAll('.journey-milestone').forEach((milestone) => {
        milestone.classList.remove('is-active');
      });
    };

    const enable = async () => {
      if (disposed || reduceMotion.matches || gsapContext || loading) return;
      loading = true;

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (disposed || reduceMotion.matches) return;

        gsap.registerPlugin(ScrollTrigger);
        gsapContext = gsap.context(() => {
          const progress = timeline.querySelector('.journey-timeline-track-progress');
          gsap.fromTo(progress, { scaleY: 0 }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 78%',
              end: 'bottom 62%',
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          });

          const milestones = [...timeline.querySelectorAll('.journey-milestone')];
          const setActiveMilestone = (activeIndex) => {
            milestones.forEach((item, index) => {
              item.classList.toggle('is-active', index === activeIndex);
            });
          };

          milestones.forEach((milestone, index) => {
            ScrollTrigger.create({
              trigger: milestone,
              start: 'top 65%',
              end: 'bottom 35%',
              onEnter: () => setActiveMilestone(index),
              onEnterBack: () => setActiveMilestone(index),
              onLeaveBack: () => setActiveMilestone(index - 1),
            });

            // Mild reveal rather than hiding actual content before JS loads.
            const copy = milestone.querySelector('.journey-milestone-copy');
            gsap.fromTo(copy, {
              y: 12,
              opacity: 0.8,
            }, {
              y: 0,
              opacity: 1,
              duration: 0.58,
              ease: 'power2.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: milestone,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            });
          });
        }, timeline);

        ScrollTrigger.refresh();
      } catch (error) {
        clear();
        console.error('Experience timeline animation could not load', error);
      } finally {
        loading = false;
      }
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            void enable();
          }
        }, { rootMargin: '400px 0px' })
      : null;

    if (observer) observer.observe(timeline);
    else void enable();

    const onMotionChange = () => {
      if (reduceMotion.matches) clear();
      else void enable();
    };
    reduceMotion.addEventListener('change', onMotionChange);

    return () => {
      disposed = true;
      observer?.disconnect();
      reduceMotion.removeEventListener('change', onMotionChange);
      clear();
    };
  }, [timelineRef, locale]);
}
