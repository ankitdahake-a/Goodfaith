import React from 'react';
import './ModernBackground.css';

export default function ModernBackground() {
  return (
    <div className="modern-bg-container" aria-hidden="true">
      {/* Ambient Brand Light Orbs */}
      <div className="ambient-glow orb-primary"></div>
      <div className="ambient-glow orb-secondary"></div>

      {/* Precision Medical Dot/Grid Layer with Radial Fade */}
      <div className="grid-layer"></div>
    </div>
  );
}
