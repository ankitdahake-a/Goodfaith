import React from 'react';
import { ArrowLeft, Construction, ShieldAlert, Sparkles } from 'lucide-react';
import './UnderMaintenance.css';

/**
 * UnderMaintenance Component
 * Displayed when user navigates to non-home navlinks
 * Clean, minimalist, and on-brand with 21st.dev aesthetic
 */
export default function UnderMaintenance({ activeTab, onReturnHome }) {
  const formatTabName = (tab) => {
    switch (tab) {
      case 'Products': return 'Pharmaceutical Catalog';
      case 'Categories': return 'Therapeutic Categories';
      case 'ColdChain': return 'Cold-Chain Telemetry Portal';
      case 'About': return 'Institutional Profile';
      case 'Contact': return 'Direct Clinical Desk';
      default: return tab;
    }
  };

  return (
    <section className="maintenance-root" aria-label="Page under maintenance">
      {/* Ambient Glow */}
      <div className="maintenance-ambient-spotlight" aria-hidden="true"></div>
      <div className="maintenance-grid-pattern" aria-hidden="true"></div>

      <div className="container maintenance-container">
        <div className="maintenance-badge">
          <Construction size={14} className="badge-icon" />
          <span>Module Under Development</span>
        </div>

        <h1 className="maintenance-heading">Under Maintenance</h1>

        <p className="maintenance-desc">
          The <strong>{formatTabName(activeTab)}</strong> section is currently undergoing system upgrades, direct manufacturer catalog synchronization, and regulatory integration.
        </p>

        <div className="maintenance-actions">
          <button 
            className="maintenance-primary-btn"
            onClick={onReturnHome}
          >
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </section>
  );
}
