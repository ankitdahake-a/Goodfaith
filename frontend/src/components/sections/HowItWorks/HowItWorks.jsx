import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * HowItWorks Component — Alternating 4-Step Visual Process
 * Matches user's exact reference layout:
 * - Centered Pill Badge + Title + Subtitle
 * - Alternating Zigzag Layout with Giant Numbers (01, 02, 03, 04)
 * - Colored Squircles, Clean Descriptions, 3-point Checklists
 * - Soft-Glow Elevated Minimalist Illustration Cards with Ambient Orbs
 * - Centered Downward Connector Arrows (↓)
 * Typography: Manrope 700 (Headings, Numbers) & Inter 400/500 (Body)
 */
export default function HowItWorks() {
  const sectionRef = useRef(null);

  const steps = [
    {
      num: '01',
      color: 'blue',
      badgeIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M9 12h6"></path>
          <path d="M9 16h6"></path>
        </svg>
      ),
      title: 'Submit Prescription & Requirements',
      desc: 'Share your physician prescription or hospital procurement request. Our clinical pharmacists immediately verify authenticity, manufacturer batch availability, and origin pricing.',
      checkpoints: [
        '2-hour clinical verification',
        'Direct manufacturer batch sourcing',
        'Transparent institutional pricing',
      ],
      cardGraphic: (
        <div className="hiw-graphic hiw-graphic-blue">
          <div className="hiw-orb hiw-orb-blue-1"></div>
          <div className="hiw-orb hiw-orb-blue-2"></div>
          <div className="hiw-orb hiw-orb-blue-3"></div>
          <div className="hiw-graphic-inner">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <line x1="9" y1="11" x2="15" y2="11" strokeWidth="2.2"></line>
              <line x1="9" y1="15" x2="15" y2="15" strokeWidth="2.2"></line>
              <circle cx="7.5" cy="11" r="0.6" fill="#2563eb" stroke="none"></circle>
              <circle cx="7.5" cy="15" r="0.6" fill="#2563eb" stroke="none"></circle>
            </svg>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      color: 'purple',
      badgeIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      ),
      title: 'Regulatory & Export Clearance',
      desc: 'Our dedicated regulatory desk handles all international compliance — procuring CDSCO export permits, MOH Named-Patient import authorizations, and certified COA documentation.',
      checkpoints: [
        'CDSCO licensed export filing',
        'MOH Named-Patient permit processing',
        'Official Certificate of Analysis (COA)',
      ],
      cardGraphic: (
        <div className="hiw-graphic hiw-graphic-purple">
          <div className="hiw-orb hiw-orb-purple-1"></div>
          <div className="hiw-orb hiw-orb-purple-2"></div>
          <div className="hiw-orb hiw-orb-purple-3"></div>
          <div className="hiw-graphic-inner">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth="2"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth="2"></line>
            </svg>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      color: 'teal',
      badgeIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      title: 'Validated 2–8°C Cold-Chain Sourcing',
      desc: 'Medications are sealed in qualified vacuum-insulated shippers with real-time Sensitech IoT temperature data loggers to guarantee thermal integrity across all transit zones.',
      checkpoints: [
        '2°C – 8°C & -20°C temperature guarantee',
        'Real-time IoT thermal telemetry',
        'Validated zero-excursion packaging',
      ],
      cardGraphic: (
        <div className="hiw-graphic hiw-graphic-teal">
          <div className="hiw-orb hiw-orb-teal-1"></div>
          <div className="hiw-orb hiw-orb-teal-2"></div>
          <div className="hiw-orb hiw-orb-teal-3"></div>
          <div className="hiw-graphic-inner">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2.5"></line>
              <line x1="12" y1="20" x2="12" y2="8" strokeWidth="2.5"></line>
              <line x1="18" y1="20" x2="18" y2="11" strokeWidth="2.5"></line>
              <line x1="3" y1="21" x2="21" y2="21" strokeWidth="2"></line>
            </svg>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      color: 'orange',
      badgeIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      title: 'Doorstep & Hospital Handover',
      desc: 'Priority air courier handover and expedited local customs clearance directly to your hospital pharmacy, clinic, or verified patient residence with full audit trails.',
      checkpoints: [
        'Direct delivery in 45+ countries',
        'Complete cold-chain audit report',
        'Dedicated 24/7 patient coordinator',
      ],
      cardGraphic: (
        <div className="hiw-graphic hiw-graphic-orange">
          <div className="hiw-orb hiw-orb-orange-1"></div>
          <div className="hiw-orb hiw-orb-orange-2"></div>
          <div className="hiw-orb hiw-orb-orange-3"></div>
          <div className="hiw-graphic-inner">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9.5" strokeWidth="2"></circle>
              <polyline points="8.5 12 11 14.5 15.5 9.5" strokeWidth="2.2"></polyline>
            </svg>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hiw-header > *',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger animate each step row
      const stepRows = sectionRef.current.querySelectorAll('.hiw-step-row');
      stepRows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hiw-section" id="how-it-works" ref={sectionRef}>
      <div className="container hiw-container">
        {/* Section Header */}
        <div className="hiw-header">
          <h2 className="hiw-title">How it works</h2>
          <p className="hiw-subtitle">
            From prescription upload to temperature-validated doorstep delivery in four simple steps
          </p>
        </div>

        {/* 4-Step Zigzag Flow */}
        <div className="hiw-steps-flow">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1; // Step 02 & Step 04: Card on Left, Text on Right

            return (
              <React.Fragment key={idx}>
                <div className={`hiw-step-row ${isEven ? 'hiw-step-row-even' : 'hiw-step-row-odd'}`}>
                  {/* For Odd Steps (01, 03): Text on Left, Card on Right */}
                  {!isEven && (
                    <>
                      {/* Left: Text Content Column */}
                      <div className="hiw-text-col">
                        <span className={`hiw-step-num hiw-step-num-${step.color}`}>{step.num}</span>

                        <div className="hiw-title-wrap">
                          <div className={`hiw-icon-squircle hiw-icon-${step.color}`}>
                            {step.badgeIcon}
                          </div>
                          <h3 className="hiw-step-title">{step.title}</h3>
                        </div>

                        <p className="hiw-step-desc">{step.desc}</p>

                        <div className="hiw-checkpoints-list">
                          {step.checkpoints.map((pt, ptIdx) => (
                            <div className="hiw-checkpoint-item" key={ptIdx}>
                              <div className={`hiw-check-bullet hiw-check-bullet-${step.color}`}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                              <span className="hiw-checkpoint-text">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Visual Illustration Card Column */}
                      <div className="hiw-card-col">
                        <div className={`hiw-visual-card hiw-card-glow-${step.color}`}>
                          {step.cardGraphic}
                        </div>
                      </div>
                    </>
                  )}

                  {/* For Even Steps (02, 04): Card on Left, Text on Right */}
                  {isEven && (
                    <>
                      {/* Left: Visual Illustration Card Column */}
                      <div className="hiw-card-col">
                        <div className={`hiw-visual-card hiw-card-glow-${step.color}`}>
                          {step.cardGraphic}
                        </div>
                      </div>

                      {/* Right: Text Content Column */}
                      <div className="hiw-text-col">
                        <span className={`hiw-step-num hiw-step-num-${step.color}`}>{step.num}</span>

                        <div className="hiw-title-wrap">
                          <div className={`hiw-icon-squircle hiw-icon-${step.color}`}>
                            {step.badgeIcon}
                          </div>
                          <h3 className="hiw-step-title">{step.title}</h3>
                        </div>

                        <p className="hiw-step-desc">{step.desc}</p>

                        <div className="hiw-checkpoints-list">
                          {step.checkpoints.map((pt, ptIdx) => (
                            <div className="hiw-checkpoint-item" key={ptIdx}>
                              <div className={`hiw-check-bullet hiw-check-bullet-${step.color}`}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                              <span className="hiw-checkpoint-text">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Downward Connector Arrow between steps */}
                {idx < steps.length - 1 && (
                  <div className="hiw-connector-row" aria-hidden="true">
                    <div className="hiw-down-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
