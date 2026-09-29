import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlobalAccess.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * GlobalAccess Component — "Disease Knows No Borders"
 * Brand Mission & Patient-Centric Lifesaving Medicine Access
 * Monochrome Modern UI • Manrope 700 & Inter Typography • GSAP ScrollTrigger
 */
export default function GlobalAccess({ onFindMedicine }) {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side text stagger with clearProps so opacity never gets stuck
      gsap.fromTo(
        '.global-access-left > *',
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
            toggleActions: 'play none none none'
          }
        }
      );

      // Right side image frame
      gsap.fromTo(
        '.access-image-frame',
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onFindMedicine) {
      onFindMedicine(searchQuery);
    }
  };

  return (
    <section className="global-access-section" id="mission" ref={sectionRef}>
      {/* 21st.dev Natural Transition Background System */}
      <div className="access-bg-layers" aria-hidden="true">
        <div className="access-bg-spotlight"></div>
        <div className="access-bg-dot-pattern"></div>
        <div className="access-crosshair crosshair-tl">+</div>
        <div className="access-crosshair crosshair-tr">+</div>
        <div className="access-crosshair crosshair-bl">+</div>
        <div className="access-crosshair crosshair-br">+</div>
      </div>

      <div className="container global-access-container">
        {/* ==========================================================================
            Left Column: Mission Narrative & Search Bar
            ========================================================================== */}
        <div className="global-access-left">
          {/* Headline: Manrope 700 with Editorial Script Accent */}
          <h2 className="global-access-title">
            disease <br />
            <span className="title-editorial-accent">knows no borders</span>
          </h2>

          {/* Core Brand Narrative */}
          <div className="global-access-text-group">
            <p className="access-lead-text">
              Your treatment shouldn't depend on where you live and what's available there.
            </p>
            <p className="access-sub-text">
              If the medicine that will give you or your patient the best outcome is available anywhere in the world,
              GoodFaith Pharma connects licensed hospitals, oncologists, and health ministries with authentic, temperature-controlled institutional supply.
            </p>
            <div className="access-punchline">
              <span>Anywhere.</span>
            </div>
          </div>

          {/* Interactive Medicine Search / Action Bar */}
          <form className="access-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <Search size={18} className="search-lead-icon" />
              <input
                type="text"
                className="access-search-input"
                placeholder="Search oncology, hepatitis, rare disease medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search lifesaving medicines"
              />
            </div>
            <button type="submit" className="access-cta-btn">
              <span>Find your medicine</span>
              <ArrowRight size={15} />
            </button>
          </form>
        </div>

        {/* ==========================================================================
            Right Column: Editorial Portrait Montage
            ========================================================================== */}
        <div className="global-access-right">
          <div className="access-visual-wrapper">
            <div className="access-visual-glow"></div>

            <div className="access-image-frame">
              <img
                src="/global_access_montage.jpg"
                alt="Global patients, doctors, and families thriving with access to lifesaving medicine"
                className="access-main-img"
                loading="lazy"
              />
              <div className="image-frame-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
