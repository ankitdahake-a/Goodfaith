import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './StatsCounter.css';

const STATS_DATA = [
  {
    value: 200,
    suffix: '+',
    format: 'integer',
    label: 'Affiliated Companies',
  },
  {
    value: 70000,
    suffix: '+',
    format: 'comma',
    label: 'Products in Inventory',
  },
  {
    value: 100,
    suffix: '+',
    format: 'integer',
    label: 'Countries Served',
  },
];

/**
 * StatsCounter Component — Clean, Direct Brand Statistics
 * 100% Reliable IntersectionObserver + GSAP Animated Counter
 * Triggered strictly when user scrolls near the section.
 */
export default function StatsCounter() {
  const sectionRef = useRef(null);
  const countRefs = useRef([]);
  const hasAnimated = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setInView(true);

            // Animate each number smoothly with GSAP
            STATS_DATA.forEach((stat, index) => {
              const el = countRefs.current[index];
              if (!el) return;

              const counterObj = { val: 0 };
              gsap.to(counterObj, {
                val: stat.value,
                duration: 2.2,
                ease: 'power3.out',
                onUpdate: () => {
                  if (stat.format === 'comma') {
                    el.textContent = Math.floor(counterObj.val).toLocaleString();
                  } else {
                    el.textContent = Math.floor(counterObj.val).toString();
                  }
                },
                onComplete: () => {
                  // Ensure exact final number
                  if (stat.format === 'comma') {
                    el.textContent = stat.value.toLocaleString();
                  } else {
                    el.textContent = stat.value.toString();
                  }
                },
              });
            });

            // Entrance animation for items
            gsap.fromTo(
              '.stat-item',
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
              }
            );
          }
        });
      },
      {
        threshold: 0.25, // Trigger when 25% of section is visible
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section className="stats-section" id="impact" ref={sectionRef}>
      <div className="container stats-container">
        {/* Clean Header */}
        <div className="stats-header">
          <h2 className="stats-title">
            Because GoodFaith, <span className="stats-title-accent">Counts.</span>
          </h2>
          <p className="stats-subtitle">
            You can count on us when it comes to reliability, quality, on-time delivery, and transparency.
          </p>
        </div>

        {/* 3 Clean Minimal Columns */}
        <div className="stats-row">
          {STATS_DATA.map((stat, idx) => (
            <div className={`stat-item ${inView ? 'animated' : ''}`} key={idx}>
              <div className="stat-value-wrap">
                <span
                  className="stat-number"
                  ref={(el) => {
                    countRefs.current[idx] = el;
                  }}
                >
                  0
                </span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
