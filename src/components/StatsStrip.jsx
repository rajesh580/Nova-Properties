import React, { useState, useEffect, useRef } from 'react';

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '', decimals = 0, isTriggered }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isTriggered) return;

    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * end);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isTriggered]);

  const displayVal = decimals > 0 ? count.toFixed(decimals) : Math.round(count);

  return (
    <span>
      {prefix}{displayVal}{suffix}
    </span>
  );
}

export default function StatsStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      prefix: 'AED ',
      value: 2.4,
      decimals: 1,
      suffix: 'B+',
      title: 'Transaction Volume',
      sub: "Across Dubai's most guarded prime addresses"
    },
    {
      prefix: '',
      value: 500,
      decimals: 0,
      suffix: '+',
      title: 'Transactions Closed',
      sub: 'Waterfront mansions, sky villas & portfolios'
    },
    {
      prefix: '',
      value: 12,
      decimals: 0,
      suffix: '+ Years',
      title: 'In Dubai Market',
      sub: 'Continuous DIFC leadership since 2012'
    },
    {
      prefix: '',
      value: 4.9,
      decimals: 1,
      suffix: ' ★',
      title: 'Client Satisfaction',
      sub: 'Over 120 verified high-net-worth client reviews'
    }
  ];

  return (
    <section ref={sectionRef} className="stats-strip" aria-label="Key Performance Indicators">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div className="stat-cell" key={idx}>
              <div className="stat-number">
                <AnimatedCounter
                  end={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2200}
                  isTriggered={isVisible}
                />
              </div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
