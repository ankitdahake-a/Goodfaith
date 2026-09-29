import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ReviewsSection.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ReviewsSection Component — Exact Minimalist Testimonials Marquee
 * Matching 21st.dev reference UI:
 * - Natural Atmospheric Section Transition (Soft Spotlight + Dot Matrix)
 * - Minimalist dark sleek cards (Avatar + Name + @handle/role + Direct Quote)
 * - Zero unnecessary clutter (No extra rating bars or cluttered tags)
 * - Mathematically Flawless Continuous Marquee (Row 1 Leftwards, Row 2 Rightwards)
 * - Multi-buffer duplication ensuring 100% seamless infinite loop on all screen sizes
 */
export default function ReviewsSection() {
  const sectionRef = useRef(null);

  const row1Base = [
    {
      id: 'r1-1',
      name: 'Dr. Sarah Jenkins',
      handle: '@dr.jenkins • Oncologist',
      avatar: '/avatar_sarah.jpg',
      quote:
        '“GoodFaith secured and delivered validated 2–8°C cold-chain stock to our Dubai clinic in 48 hours with flawless telemetry.”',
    },
    {
      id: 'r1-2',
      name: 'Prof. Marcus Weber',
      handle: '@mweber • Chief Pharmacist',
      initials: 'MW',
      initialBg: '#27272a',
      quote:
        '“Procuring unlicensed oncology treatments under Special Import regulations was streamlined with zero thermal deviation.”',
    },
    {
      id: 'r1-3',
      name: 'Elena Morales',
      handle: '@elena.morales • Caregiver',
      initials: 'EM',
      initialBg: '#3f3f46',
      quote:
        '“When local pharmacies estimated a 9-month wait, GoodFaith delivered the therapy in 5 days. Truly lifesaving.”',
    },
    {
      id: 'r1-4',
      name: 'Dr. Kenneth Tan',
      handle: '@dr.tan • Hematologist',
      initials: 'KT',
      initialBg: '#18181b',
      quote:
        '“All HSA special access documentation and cryogenic cold-chain logistics were managed seamlessly.”',
    },
  ];

  const row2Base = [
    {
      id: 'r2-1',
      name: 'Amina Osei',
      handle: '@amina.osei • Supply Chain VP',
      initials: 'AO',
      initialBg: '#27272a',
      quote:
        '“We rely on GoodFaith for authentic manufacturer batches and priority air cargo at institutional pricing.”',
    },
    {
      id: 'r2-2',
      name: 'Lukas Bieri',
      handle: '@lukas.bieri • Patient Family',
      initials: 'LB',
      initialBg: '#3f3f46',
      quote:
        '“Having a dedicated coordinator who responds with verified real-time tracking at 2 AM is priceless.”',
    },
    {
      id: 'r2-3',
      name: 'Dr. Alejandro Ramos',
      handle: '@dr.ramos • Medical Director',
      initials: 'AR',
      initialBg: '#18181b',
      quote:
        '“The cold-chain reliability and verified COA documentation gave our clinical oncology team complete confidence.”',
    },
    {
      id: 'r2-4',
      name: 'Claire Dubois',
      handle: '@claire.dubois • Hospital Pharmacist',
      initials: 'CD',
      initialBg: '#27272a',
      quote:
        '“Article 5 compassionate access handling was prompt. Every sensor log verified strict 2–8°C compliance.”',
    },
  ];

  // Tripled base items per group to ensure ultra-wide coverage before loop
  const row1Group = [...row1Base, ...row1Base, ...row1Base];
  const row2Group = [...row2Base, ...row2Base, ...row2Base];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reviews-header > *',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCard = (item, uniqueKey) => (
    <div className="review-minimal-card" key={uniqueKey}>
      <div className="card-user-header">
        <div className="card-avatar">
          {item.avatar ? (
            <img src={item.avatar} alt={item.name} className="card-avatar-img" />
          ) : (
            <div
              className="card-avatar-initials"
              style={{ background: item.initialBg || '#27272a' }}
            >
              {item.initials}
            </div>
          )}
        </div>
        <div className="card-user-meta">
          <h4 className="card-user-name">{item.name}</h4>
          <span className="card-user-handle">{item.handle}</span>
        </div>
      </div>
      <p className="card-quote-content">{item.quote}</p>
    </div>
  );

  return (
    <section className="reviews-section" id="reviews" ref={sectionRef}>
      {/* Natural Atmospheric Transition Background Layers */}
      <div className="reviews-bg-layers" aria-hidden="true">
        <div className="reviews-top-spotlight"></div>
        <div className="reviews-dot-matrix"></div>
      </div>

      <div className="container reviews-header-container">
        <div className="reviews-header">
          <h2 className="reviews-title">
            Trusted by medical leaders <br />
            <span className="reviews-title-muted">& patient families worldwide</span>
          </h2>
        </div>
      </div>

      {/* 21st.dev Style Dual-Row Testimonials Marquee */}
      <div className="reviews-marquee-wrapper" aria-label="Customer reviews marquee">
        <div className="reviews-mask-left" aria-hidden="true"></div>
        <div className="reviews-mask-right" aria-hidden="true"></div>

        {/* Row 1: Leftwards Smooth Scroll */}
        <div className="reviews-marquee-track">
          <div className="reviews-marquee-group marquee-scroll-left">
            {row1Group.map((item, idx) => renderCard(item, `r1-a-${idx}`))}
          </div>
          <div className="reviews-marquee-group marquee-scroll-left" aria-hidden="true">
            {row1Group.map((item, idx) => renderCard(item, `r1-b-${idx}`))}
          </div>
        </div>

        {/* Row 2: Rightwards Smooth Scroll */}
        <div className="reviews-marquee-track">
          <div className="reviews-marquee-group marquee-scroll-right">
            {row2Group.map((item, idx) => renderCard(item, `r2-a-${idx}`))}
          </div>
          <div className="reviews-marquee-group marquee-scroll-right" aria-hidden="true">
            {row2Group.map((item, idx) => renderCard(item, `r2-b-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  );
}
