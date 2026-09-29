import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import ModernBackground from './components/layout/ModernBackground';
import Footer from './components/layout/Footer';
import HomePage from './pages/Home';
import MaintenancePage from './pages/Maintenance';
import FloatingContact from './components/ui/FloatingContact';
import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('Home');

  const handleSelectTab = (tabId) => {
    setCurrentView(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query) => {
    console.log('Search query:', query);
  };

  const handleExploreCatalog = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestQuote = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFindMedicine = (searchQuery) => {
    console.log('Find medicine query:', searchQuery);
  };

  return (
    <div className="canvas-root">
      {/* Ambient Light Background */}
      <ModernBackground />

      {/* Modern Tactile Floating Capsule Navbar */}
      <Navbar 
        activeTab={currentView}
        onSelectTab={handleSelectTab}
      />

      {/* Main Canvas Content */}
      <main className="canvas-content">
        {currentView === 'Home' ? (
          <HomePage
            onSearchSubmit={handleSearchSubmit}
            onExploreCatalog={handleExploreCatalog}
            onRequestQuote={handleRequestQuote}
            onFindMedicine={handleFindMedicine}
          />
        ) : (
          <MaintenancePage
            activeTab={currentView}
            onReturnHome={() => handleSelectTab('Home')}
          />
        )}

        {/* Institutional Enterprise Footer (Always Present) */}
        <Footer />
      </main>

      {/* 24/7 International Medical & WhatsApp Quick Dispatch Desk */}
      <FloatingContact />
    </div>
  );
}
