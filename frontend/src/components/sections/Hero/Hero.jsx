import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Thermometer, Globe2 } from 'lucide-react';
import gsap from 'gsap';
import './Hero.css';

/**
 * Cinematic Integrated Background Hero Section
 * Inspired by Everyone.org & modern editorial pharmaceutical platforms:
 * - Full-depth auto-crossfading photo background with subtle Ken Burns motion
 * - Left-to-right precision gradient ramp ensuring 100% crystal-clear typography
 * - Punchy Manrope 700 headline, dual tactile CTAs, and institutional trust bar
 */
export default function Hero({ onRequestQuote, onExploreCatalog }) {
  const heroContainerRef = useRef(null);

  const slides = [
    {
      id: 1,
      src: '/slide_coldchain.jpg',
      alt: 'Smart 2–8°C Cold-Chain Shipper & Oncology Formulations',
    },
    {
      id: 2,
      src: '/slide_aircargo.jpg',
      alt: 'Global Pharma Air Cargo & Active RKN Telemetry',
    },
    {
      id: 3,
      src: '/slide_cleanroom.jpg',
      alt: 'WHO-GMP Sterile Cleanroom & Robotic Isolators',
    },
    {
      id: 4,
      src: '/slide_warehouse.jpg',
      alt: 'Automated GDP Temperature-Controlled Distribution Hub',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cal-hero-title', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      });
      gsap.from('.cal-hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
      });
      gsap.from('.cal-hero-actions', {
        y: 16,
        opacity: 0,
        duration: 0.75,
        delay: 0.28,
        ease: 'power3.out',
      });
      gsap.from('.hero-trust-bar', {
        y: 12,
        opacity: 0,
        duration: 0.7,
        delay: 0.4,
        ease: 'power3.out',
      });
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  // Auto-play loop: advances by 1 every 4.2s with cross-fade
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 4200);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, slides.length]);

  return (
    <section 
      className="cal-hero-wrapper" 
      ref={heroContainerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ==========================================================================
          Cinematic Living Background: Integrated Cross-Fading Photo Showcase
          ========================================================================== */}
      <div className="hero-cinematic-bg-container" aria-hidden="true">
        {slides.map((slide, idx) => (
          <div 
            key={slide.id}
            className={`hero-bg-slide ${activeSlide === idx ? 'hero-bg-slide-active' : ''}`}
          >
            <img 
              src={slide.src} 
              alt={slide.alt} 
              className="hero-bg-image"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Directional Precision Gradient Masks (Ensures 100% Crisp Typography) */}
        <div className="hero-gradient-overlay-left"></div>
        <div className="hero-gradient-overlay-top"></div>
        <div className="hero-gradient-overlay-bottom"></div>
      </div>

      {/* ==========================================================================
          Foreground Content (1220px Aligned Container)
          ========================================================================== */}
      <div className="container cal-hero-container">
        {/* Left Column: Editorial Content & CTAs */}
        <div className="cal-hero-left">
          {/* Manrope 700 Headline */}
          <h1 className="cal-hero-title">
            Build your global <br />
            <span className="title-highlight">pharmaceutical</span> <br />
            supply network
          </h1>

          {/* Inter 400 Subtitle */}
          <p className="cal-hero-subtitle">
            Seamlessly integrate institutional medicine procurement into your supply chain
            powered by GoodFaith Pharma's battle-tested cold-chain export infrastructure.
          </p>

          {/* Dual Action Buttons */}
          <div className="cal-hero-actions">
            <button className="cal-btn-primary" onClick={onRequestQuote}>
              <span>Get started</span>
              <ArrowRight size={15} />
            </button>

            <button className="cal-btn-secondary" onClick={onExploreCatalog}>
              <span>Explore the catalog</span>
            </button>
          </div>

          {/* Institutional Micro-Trust Bar */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <ShieldCheck size={14} className="trust-icon" />
              <span>CDSCO Licensed Exporter</span>
            </div>
            <span className="trust-separator">•</span>
            <div className="trust-item">
              <CheckCircle2 size={14} className="trust-icon" />
              <span>WHO-GDP Compliant</span>
            </div>
            <span className="trust-separator">•</span>
            <div className="trust-item">
              <Thermometer size={14} className="trust-icon" />
              <span>2–8°C Validated</span>
            </div>
            <span className="trust-separator">•</span>
            <div className="trust-item">
              <Globe2 size={14} className="trust-icon" />
              <span>45+ Destinations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
