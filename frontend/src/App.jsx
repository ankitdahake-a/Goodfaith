import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import ModernBackground from './components/layout/ModernBackground';
import Footer from './components/layout/Footer';
import HomePage from './pages/Home';
import FloatingContact from './components/ui/FloatingContact';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [catalogSearchQuery, setCatalogSearchQuery] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('All');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const scrollToElement = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'Products') {
      setCatalogCategory('All');
      scrollToElement('catalog');
    } else if (tabId === 'Categories') {
      scrollToElement('catalog');
    } else if (tabId === 'ColdChain') {
      scrollToElement('corridors');
    } else if (tabId === 'About') {
      scrollToElement('mission');
    } else if (tabId === 'Contact') {
      setIsQuoteModalOpen(true);
    }
  };

  const handleSearchSubmit = (query) => {
    setCatalogSearchQuery(query);
    scrollToElement('catalog');
  };

  const handleExploreCatalog = () => {
    scrollToElement('catalog');
  };

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true);
  };

  const handleFindMedicine = (searchQuery) => {
    setCatalogSearchQuery(searchQuery);
    scrollToElement('catalog');
  };

  return (
    <div className="canvas-root">
      {/* Ambient Light Background */}
      <ModernBackground />

      {/* Modern Tactile Floating Capsule Navbar */}
      <Navbar 
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Canvas Content */}
      <main className="canvas-content">
        <HomePage
          onSearchSubmit={handleSearchSubmit}
          onExploreCatalog={handleExploreCatalog}
          onRequestQuote={handleRequestQuote}
          onFindMedicine={handleFindMedicine}
          catalogSearchQuery={catalogSearchQuery}
          catalogCategory={catalogCategory}
          isQuoteModalOpen={isQuoteModalOpen}
          onCloseQuoteModal={() => setIsQuoteModalOpen(false)}
        />

        {/* Institutional Enterprise Footer (Always Present) */}
        <Footer />
      </main>

      {/* 24/7 International Medical & WhatsApp Quick Dispatch Desk */}
      <FloatingContact 
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />
    </div>
  );
}
