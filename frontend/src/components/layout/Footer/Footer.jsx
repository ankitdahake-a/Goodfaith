import React from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  Clock 
} from 'lucide-react';
import './Footer.css';

/**
 * Institutional Enterprise Footer Component
 * - Features official GoodFaith brand logo (/logowhite.png) matching header
 * - 4-Column Grid with pixel-perfect top baseline alignment
 * - Regulatory CDSCO export licenses & WHO-GDP compliance
 * - 24/7 Global emergency dispatch hotline & international hub locations
 * - Strictly minimalist & elegant monochrome design
 */
export default function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-root" aria-label="Institutional Footer">
      <div className="container footer-container">
        {/* Top 4-Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand Logo & Regulatory Credentials */}
          <div className="footer-col footer-col-brand">
            <a href="/" className="footer-logo-wrap" aria-label="Good Faith Exim Home">
              <img
                src="/logowhite.png"
                alt="Good Faith Exim"
                className="footer-logo-img"
              />
            </a>
            <p className="footer-brand-desc">
              Global Named-Patient pharmaceutical export partner connecting oncologists, hospital networks, and patient families to authentic lifesaving therapies worldwide.
            </p>
            <div className="footer-license-pill">
              <ShieldCheck size={16} className="license-icon" />
              <div className="license-details">
                <span className="license-label">CDSCO Licensed Exporter</span>
                <span className="license-sub">WHO-GDP Certified Cold-Chain</span>
              </div>
            </div>
          </div>

          {/* Column 2: Therapeutic Corridors */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Specializations</h4>
            <ul className="footer-links">
              <li>
                <a href="#global-access" onClick={(e) => { e.preventDefault(); scrollToSection('global-access'); }}>
                  Oncology & Hematology
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>
                  Rare Disease Therapies
                </a>
              </li>
              <li>
                <a href="#global-access" onClick={(e) => { e.preventDefault(); scrollToSection('global-access'); }}>
                  Biologics & Immunotherapies
                </a>
              </li>
              <li>
                <a href="#corridors" onClick={(e) => { e.preventDefault(); scrollToSection('corridors'); }}>
                  Validated 2–8°C Cryogenics
                </a>
              </li>
              <li>
                <a href="#how-we-deliver" onClick={(e) => { e.preventDefault(); scrollToSection('how-we-deliver'); }}>
                  Hospital RFQ Procurement
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Regulatory & Compliance */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Compliance</h4>
            <ul className="footer-links">
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>
                  Named-Patient Access Rules
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>
                  Certificate of Analysis (COA)
                </a>
              </li>
              <li>
                <a href="#how-we-deliver" onClick={(e) => { e.preventDefault(); scrollToSection('how-we-deliver'); }}>
                  2D DataMatrix Serialization
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>
                  Verified Case Studies
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>
                  Pharmacovigilance Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: 24/7 Global Dispatch & Hubs */}
          <div className="footer-col footer-col-dispatch">
            <h4 className="footer-col-heading">24/7 Emergency Dispatch</h4>
            
            <div className="dispatch-card">
              <div className="dispatch-row">
                <Clock size={14} className="dispatch-icon" />
                <span className="dispatch-status">Direct Clinical Dispatch Active</span>
              </div>
              <a href="mailto:supply@goodfaithexim.com" className="dispatch-contact-link">
                <Mail size={14} className="contact-icon" />
                <span>supply@goodfaithexim.com</span>
              </a>
              <a href="https://wa.me/917038198809" target="_blank" rel="noopener noreferrer" className="dispatch-contact-link">
                <Phone size={14} className="contact-icon" />
                <span>+91-7038198809 (WhatsApp)</span>
              </a>
            </div>

            <div className="footer-hubs">
              <span className="hubs-label">Global Hubs:</span>
              <span className="hubs-list">Mumbai • Dubai • London</span>
            </div>
          </div>
        </div>

       

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="footer-bottom-bar">
          <span className="footer-copyright">
            © {new Date().getFullYear()} Good Faith Exim. All rights reserved.
          </span>

          <div className="footer-legal-links">
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>Privacy Policy</a>
            <span className="legal-dot">•</span>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>Terms of Supply</a>
            <span className="legal-dot">•</span>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>GDP Audit Log</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
