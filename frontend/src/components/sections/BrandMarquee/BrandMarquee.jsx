import React from 'react';
import { 
  Globe, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Building2, 
  PackageCheck, 
  Clock, 
  FileCheck2, 
  HeartHandshake 
} from 'lucide-react';
import './BrandMarquee.css';

/**
 * BrandMarquee Component — Continuous Infinite Scrolling Trust Ticker
 * Inspired by 21st.dev / Notion / Stripe modern trust tickers:
 * - Seamless infinite loop animation with zero stutter or gaps
 * - Refined monochrome aesthetic with high-trust pharmaceutical proof points
 * - Edge fade masks & continuous motion
 */
export default function BrandMarquee() {
  const trustItems = [
    {
      icon: <Globe size={16} className="marquee-icon" />,
      text: '100+ Countries Served Globally',
    },
    {
      icon: <ShieldCheck size={16} className="marquee-icon" />,
      text: 'CDSCO Licensed & WHO-GDP Certified Exporter',
    },
    {
      icon: <ThermometerSnowflake size={16} className="marquee-icon" />,
      text: 'Validated 2–8°C & -20°C Zero-Excursion Transit',
    },
    {
      icon: <Building2 size={16} className="marquee-icon" />,
      text: '200+ Affiliated International Hospitals & Clinics',
    },
    {
      icon: <PackageCheck size={16} className="marquee-icon" />,
      text: '70,000+ Verified Pharmaceutical Products in Inventory',
    },
    {
      icon: <Clock size={16} className="marquee-icon" />,
      text: '24–48h Priority Air Handover to Global Hubs',
    },
    {
      icon: <FileCheck2 size={16} className="marquee-icon" />,
      text: '100% Certified Certificate of Analysis (COA) with Every Batch',
    },
    {
      icon: <HeartHandshake size={16} className="marquee-icon" />,
      text: '24/7 Dedicated Named-Patient Support Desk',
    },
  ];

  // Double items per group to ensure high-density seamless track
  const groupItems = [...trustItems, ...trustItems];

  return (
    <div className="brand-marquee-section" aria-label="GoodFaith trust credentials marquee">
      <div className="marquee-mask-left" aria-hidden="true"></div>
      <div className="marquee-mask-right" aria-hidden="true"></div>

      <div className="brand-marquee-track">
        {/* First Loop */}
        <div className="brand-marquee-group">
          {groupItems.map((item, idx) => (
            <div className="marquee-item" key={`b1-${idx}`}>
              <span className="marquee-icon-wrap">{item.icon}</span>
              <span className="marquee-text">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Cloned Loop for Seamless Infinite Scroll */}
        <div className="brand-marquee-group" aria-hidden="true">
          {groupItems.map((item, idx) => (
            <div className="marquee-item" key={`b2-${idx}`}>
              <span className="marquee-icon-wrap">{item.icon}</span>
              <span className="marquee-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
