import React, { useState } from 'react';
import { MessageCircle, FileText, X, ShieldCheck, ChevronUp } from 'lucide-react';
import './FloatingContact.css';

/**
 * FloatingContact Component
 * Fast-action international pharma buyer dispatch widget:
 * - Direct WhatsApp integration with prefilled inquiry message
 * - Instant Sourcing Request trigger
 * - Scroll to top button
 */
export default function FloatingContact({ onOpenQuoteModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const phone = '919876543210'; // Replace or customize
    const message = encodeURIComponent(
      'Hello GoodFaith Pharma IMPEX Desk, I would like to inquire about pharmaceutical batch availability, cold-chain export, and regulatory COA.'
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="floating-widget-wrapper">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          className="floating-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      {/* Main Floating Action Hub */}
      <div className="floating-hub">
        {isOpen && (
          <div className="floating-popover">
            <div className="popover-header">
              <div className="popover-badge">
                <span className="live-pulse"></span>
                <span>24/7 Regulatory Desk</span>
              </div>
              <button 
                className="popover-close" 
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={14} />
              </button>
            </div>

            <p className="popover-desc">
              Direct emergency procurement and temperature-controlled air cargo assistance.
            </p>

            <div className="popover-actions">
              <button className="popover-btn wa-btn" onClick={openWhatsApp}>
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </button>

              <button 
                className="popover-btn rfq-btn" 
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenQuoteModal) onOpenQuoteModal();
                }}
              >
                <FileText size={16} />
                <span>Request Instant RFQ</span>
              </button>
            </div>

            <div className="popover-trust">
              <ShieldCheck size={12} />
              <span>CDSCO Licensed • WHO-GDP Validated</span>
            </div>
          </div>
        )}

        <button
          className={`floating-trigger-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Quick Medical Assistance"
          title="Emergency Medical Affairs & Sourcing Desk"
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </div>
    </div>
  );
}
