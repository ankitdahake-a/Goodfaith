import React from 'react';
import Hero from '../../components/sections/Hero';
import GlobalAccess from '../../components/sections/GlobalAccess';
import CatalogSection from '../../components/sections/CatalogSection';
import HowWeDeliver from '../../components/sections/HowWeDeliver';
import StatsCounter from '../../components/sections/StatsCounter';
import HowItWorks from '../../components/sections/HowItWorks';
import GlobalCorridors from '../../components/sections/GlobalCorridors';
import BrandMarquee from '../../components/sections/BrandMarquee';
import ReviewsSection from '../../components/sections/ReviewsSection';
import FaqAccordion from '../../components/sections/FaqAccordion';

/**
 * HomePage Component
 * Encapsulates the entire homepage section sequence
 */
export default function HomePage({
  onSearchSubmit,
  onExploreCatalog,
  onRequestQuote,
  onFindMedicine,
  catalogSearchQuery = '',
  catalogCategory = 'All',
  isQuoteModalOpen = false,
  onCloseQuoteModal
}) {
  return (
    <>
      {/* Hero Section with Cinematic Auto-Crossfade Showcase */}
      <Hero
        onSearchSubmit={onSearchSubmit}
        onExploreCatalog={onExploreCatalog}
        onRequestQuote={onRequestQuote}
      />

      {/* "Disease Knows No Borders" Lifesaving Access & Search Section */}
      <GlobalAccess
        onFindMedicine={onFindMedicine}
      />

      {/* Enterprise Pharmaceutical Sourcing Matrix & RFQ Drawer */}
      <CatalogSection
        initialSearchQuery={catalogSearchQuery}
        initialCategory={catalogCategory}
        isQuoteModalOpen={isQuoteModalOpen}
        onCloseQuoteModal={onCloseQuoteModal}
      />

      {/* 4-Column Minimalist Sourcing & Air Cargo Pipeline */}
      <HowWeDeliver />

      {/* Scroll-Triggered Institutional Impact Counter */}
      <StatsCounter />

      {/* 4-Step Alternating Process Flow */}
      <HowItWorks />

      {/* Elastic Gallery: Global Serving Countries & Cold-Chain Air Freight Corridors */}
      <GlobalCorridors />

      {/* Continuous Infinite Scrolling Trust Marquee Ticker */}
      <BrandMarquee />

      {/* Dual-Row Minimalist Testimonials Marquee */}
      <ReviewsSection />

      {/* HeroUI-Inspired Splitted Card FAQ Accordion with 21st.dev Background */}
      <FaqAccordion />
    </>
  );
}
