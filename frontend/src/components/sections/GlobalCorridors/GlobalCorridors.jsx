import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlobalCorridors.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * GlobalCorridors Component — Elastic Gallery for Serving Cities
 * Features a 100% natural, seamless atmospheric transition from HowItWorks:
 * - Natural light spotlight & dot-matrix radial fade
 * - Smooth multi-stop gradient transition
 * - Clean city & country typography (zero unnecessary fluff)
 * - Elastic interactive accordion expansion
 */
export default function GlobalCorridors() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const cities = [
    {
      id: 'dubai',
      city: 'Dubai',
      country: 'United Arab Emirates',
      image: '/corridor_uae.jpg',
    },
    {
      id: 'london',
      city: 'London',
      country: 'United Kingdom',
      image: '/corridor_europe.jpg',
    },
    {
      id: 'singapore',
      city: 'Singapore',
      country: 'Singapore',
      image: '/corridor_sea.jpg',
    },
    {
      id: 'sao-paulo',
      city: 'São Paulo',
      country: 'Brazil',
      image: '/corridor_latam.jpg',
    },
    {
      id: 'nairobi',
      city: 'Nairobi',
      country: 'Kenya',
      image: '/corridor_africa.jpg',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.corridors-header > *',
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
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.elastic-gallery-container',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
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
    <section className="global-corridors-section" id="corridors" ref={sectionRef}>
      {/* Natural Atmospheric Transition Background Layers */}
      <div className="corridors-bg-layers" aria-hidden="true">
        <div className="corridors-top-spotlight"></div>
        <div className="corridors-dot-matrix"></div>
      </div>

      <div className="container corridors-container">
        {/* Minimalist Section Header */}
        <div className="corridors-header">
          
          <h2 className="corridors-title">
            Serving patients & hospitals <br />
            <span className="corridors-title-muted">worldwide</span>
          </h2>
        </div>

        {/* Elastic Gallery Accordion Container */}
        <div className="elastic-gallery-container" role="region" aria-label="Serving cities gallery">
          {cities.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                className={`elastic-card ${isActive ? 'elastic-card-active' : 'elastic-card-collapsed'}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`View ${item.city}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
              >
                {/* Background Photographic Layer */}
                <div className="elastic-card-bg">
                  <img
                    src={item.image}
                    alt={`${item.city} medical corridor`}
                    className="elastic-card-img"
                    loading="lazy"
                  />
                  <div className="elastic-card-overlay"></div>
                </div>

                {/* Collapsed State: Minimal Vertical City Name */}
                {!isActive && (
                  <div className="elastic-collapsed-content">
                    <span className="collapsed-city-name">{item.city}</span>
                  </div>
                )}

                {/* Expanded State: Clean City & Country Heading */}
                {isActive && (
                  <div className="elastic-expanded-content">
                    <div className="expanded-city-info">
                      <span className="expanded-country-tag">{item.country}</span>
                      <h3 className="expanded-city-title">{item.city}</h3>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
