import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

/**
 * Floating Pill / Capsule Tactile Navbar
 * - Desktop: Smooth sliding pill physics with fluid transitions
 * - Mobile: Tactile Hamburger menu toggle with clean minimalist navlinks dropdown
 * - Seamless integration with view router
 */
export default function Navbar({ activeTab = 'Home', onSelectTab }) {
  const [internalTab, setInternalTab] = useState(activeTab);
  const currentTab = onSelectTab ? activeTab : internalTab;

  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'Home', label: 'Home' },
    { id: 'Products', label: 'Products' },
    { id: 'Categories', label: 'Categories' },
    { id: 'ColdChain', label: 'Cold-Chain' },
    { id: 'About', label: 'About Us' },
    { id: 'Contact', label: 'Contact' }
  ];

  const itemsRef = useRef({});
  const containerRef = useRef(null);

  // Measure and position the sliding pill indicator smoothly
  const updatePillPosition = (tabId) => {
    const el = itemsRef.current[tabId];
    const container = containerRef.current;
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = el.getBoundingClientRect();
      setPillStyle({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updatePillPosition(currentTab);
    const handleResize = () => {
      updatePillPosition(currentTab);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentTab]);

  const handleTabClick = (tabId) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    } else {
      setInternalTab(tabId);
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onSelectTab) {
      onSelectTab('Home');
    } else {
      setInternalTab('Home');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="navbar-wrapper">
      <nav className={`floating-navbar ${mobileMenuOpen ? 'menu-open' : ''}`} aria-label="Main Navigation">
        {/* Left: Official Brand Logo */}
        <a href="/" className="navbar-brand" onClick={handleLogoClick} aria-label="Good Faith Exim Home">
          <img
            src="/logowhite.png"
            alt="GoodFaith Pharma Logo"
            className="navbar-logo-as-is"
          />
        </a>

        {/* Center: Desktop Nav Items Container with Smooth Sliding White Pill Indicator */}
        <div className="navbar-links-pill" ref={containerRef}>
          {/* Fluid Sliding Active Pill Background */}
          <div
            className="nav-sliding-indicator"
            style={{
              transform: `translateX(${pillStyle.left}px)`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity
            }}
          />

          {navItems.map((item) => (
            <button
              key={item.id}
              ref={(el) => (itemsRef.current[item.id] = el)}
              onClick={() => handleTabClick(item.id)}
              className={`nav-pill-btn ${currentTab === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Desktop CTA Button & Mobile Menu Toggle */}
        <div className="navbar-action">
          <button 
            className="navbar-cta-btn desktop-only-cta"
            onClick={() => handleTabClick('Contact')}
          >
            Get a Quote
          </button>

          {/* Mobile Menu Hamburger Toggle Button */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Over Sidebar Backdrop */}
      <div 
        className={`mobile-sidebar-backdrop ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Slide-Over Sidebar Drawer */}
      <aside 
        className={`mobile-sidebar-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation Sidebar"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-sidebar-header">
          <a href="/" className="mobile-sidebar-brand" onClick={handleLogoClick} aria-label="Good Faith Exim">
            <img
              src="/logowhite.png"
              alt="Good Faith Exim"
              className="mobile-sidebar-logo"
            />
          </a>
          <button 
            className="mobile-sidebar-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-sidebar-nav">
          <div className="mobile-sidebar-list">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`mobile-sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <span className="mobile-sidebar-link-text">{item.label}</span>
                  {isActive && <span className="mobile-sidebar-active-dot" />}
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </header>
  );
}
