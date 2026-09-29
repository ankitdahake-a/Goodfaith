import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowWeDeliver.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * HowWeDeliver Component — Ultra-Clean 4-Step Sourcing & Delivery Pipeline
 * Minimalist, Zero-Clutter Architectural Layout
 * Typography: Manrope 700 (Headings, Numbers) & Inter 400/500 (Body)
 */
export default function HowWeDeliver() {
  const sectionRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'Prescription & RFQ Intake',
      desc: 'Physician prescription or hospital purchase order reviewed for batch availability within 4 hours.',
    },
    {
      num: '02',
      title: 'Regulatory Clearance',
      desc: 'Complete dossier handling: MOH Named-Patient import permits and CDSCO export authorization.',
    },
    {
      num: '03',
      title: '2–8°C Cold-Chain Sourcing',
      desc: 'Verified manufacturer batch with COA, sealed in validated thermal shippers with IoT telemetry.',
    },
    {
      num: '04',
      title: 'Express Direct Handover',
      desc: 'Priority customs clearance and monitored air delivery to hospital pharmacies in 45+ countries.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pipeline-header > *',
        { y: 20, opacity: 0 },
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

      gsap.fromTo(
        '.pipeline-col',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pipeline-section" id="how-we-deliver" ref={sectionRef}>
      <div className="container pipeline-container">
        {/* Minimalist Editorial Header */}
        <div className="pipeline-header">
          <h2 className="pipeline-title">
            How we deliver <br />
            <span className="pipeline-title-muted">uncompromised medicine globally</span>
          </h2>
          <p className="pipeline-subtitle">
            From clinical verification to cold-chain air cargo, every phase is engineered for regulatory compliance and zero thermal excursion.
          </p>
        </div>

        {/* Clean Hairline 4-Step Minimalist Grid */}
        <div className="pipeline-grid">
          {steps.map((step, idx) => (
            <div className="pipeline-col" key={idx}>
              <div className="col-top-bar"></div>
              <span className="col-num">{step.num}</span>
              <h3 className="col-title">{step.title}</h3>
              <p className="col-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
