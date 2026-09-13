import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import Reveal from './Reveal';

const timelineMeta = [
  { color: 'bg-[#257e78]', dots: true },
  { color: 'bg-[#ed6043]', dots: true },
  { color: 'bg-[#176f69]', dots: true },
  { color: 'bg-[#f0ba32]', dots: false },
];

function TimelineLine() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`timeline-flow absolute left-[25px] md:left-[38px] top-[30px] bottom-[-50px] w-0.5 overflow-hidden rounded-full ${animate ? 'is-running' : ''}`}
    ></div>
  );
}

function TimelineDot({ color, hasDots }) {
  return (
    <div className="flex relative w-[50px] md:w-[76px] shrink-0 justify-center">
      {hasDots && <TimelineLine />}
      <div className="size-[34px] flex relative shrink-0 justify-center items-center z-[10] bg-[#f6f5ee] border rounded-full border-[#789092]">
        <div className={`size-4 flex flex-col ${color} rounded-full`}></div>
      </div>
    </div>
  );
}

export default function Education() {
  const { t } = useLanguage();

  const timeline = t.education.timeline.map((item, idx) => ({
    ...item,
    ...timelineMeta[idx],
  }));

  return (
    <Reveal>
      <div className="flex min-h-[640px] flex-col bg-[#f6f5ee] px-5 md:px-12 lg:px-20 xl:px-[120px] py-[68px] md:py-[76px]">
        <div className="flex w-full h-fit justify-center">
          <div className="w-fit text-[#0b3442] font-['Poppins'] text-[31px] md:text-[46px] font-semibold leading-[1.2] tracking-[-1.6px]">
            {t.education.title}
          </div>
        </div>
        <div id="education" className="flex w-full h-fit flex-col mt-11 mb-0 mx-0">
          <div className="flex flex-col gap-7">
            {timeline.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex h-fit min-h-[92px]">
                <div className="flex w-[35%] md:w-[34%] flex-col pt-0.5 pb-0 pr-2 md:pr-0 gap-2">
                  <div className="w-fit text-[#0b3442] font-['Poppins'] text-[13px] md:text-base font-semibold leading-[1.4]">{item.institution}</div>
                  <div className="w-fit text-[#506066] font-['Poppins'] text-[11px] md:text-xs leading-normal">{item.period}</div>
                </div>
                <TimelineDot color={item.color} hasDots={item.dots} />
                <div className="flex flex-col pt-0.5 pb-0 flex-1 px-0 gap-2.5">
                  <div className="w-fit text-[#0b3442] font-['Poppins'] text-[13px] md:text-base font-semibold leading-[1.4]">{item.title}</div>
                  <div className="max-w-[520px] text-[#40565d] font-['Poppins'] text-[11px] md:text-xs leading-[1.75]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="experience" className="flex w-full h-fit flex-col mt-11 mb-0 mx-0">
          <div className="flex flex-col gap-7">
            {timeline.slice(2).map((item, idx) => (
              <div key={idx} className="flex h-fit min-h-[92px]">
                <div className="flex w-[35%] md:w-[34%] flex-col pt-0.5 pb-0 pr-2 md:pr-0 gap-2">
                  <div className="w-fit text-[#0b3442] font-['Poppins'] text-[13px] md:text-base font-semibold leading-[1.4]">{item.institution}</div>
                  <div className="w-fit text-[#506066] font-['Poppins'] text-[11px] md:text-xs leading-normal">{item.period}</div>
                </div>
                <TimelineDot color={item.color} hasDots={item.dots} />
                <div className="flex flex-col pt-0.5 pb-0 flex-1 px-0 gap-2.5">
                  <div className="w-fit text-[#0b3442] font-['Poppins'] text-[13px] md:text-base font-semibold leading-[1.4]">{item.title}</div>
                  <div className="max-w-[520px] text-[#40565d] font-['Poppins'] text-[11px] md:text-xs leading-[1.75]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
