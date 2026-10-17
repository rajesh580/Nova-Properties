import React from 'react';
import Hero from '../components/Hero';
import MarketTicker from '../components/MarketTicker';
import StatsStrip from '../components/StatsStrip';
import PropertyListings from '../components/PropertyListings';
import OffPlanSection from '../components/OffPlanSection';
import DeveloperAlliance from '../components/DeveloperAlliance';
import GoldenVisaChecker from '../components/GoldenVisaChecker';
import CommunitiesSection from '../components/CommunitiesSection';
import WhyNova from '../components/WhyNova';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

export default function HomePage({
  currency,
  unit,
  activeTab,
  onTabChange,
  searchParams,
  onSearchSubmit,
  onResetFilters,
  onOpenModal,
  onShowNotice,
  onSelectCommunity,
  favorites = [],
  onToggleFavorite,
  comparedIds = [],
  onToggleCompare
}) {
  return (
    <div className="home-page-view">
      {/* 1. Cinematic Hero with Multi-Tab Search */}
      <Hero
        activeTab={activeTab}
        onTabChange={onTabChange}
        onSearchSubmit={onSearchSubmit}
      />

      {/* 2. Live Dubai Market Pulse Ticker */}
      <MarketTicker />

      {/* 3. Key Performance Metrics */}
      <StatsStrip />

      {/* 4. Curated Luxury Listings */}
      <PropertyListings
        currency={currency}
        unit={unit}
        activeTab={activeTab}
        searchParams={searchParams}
        onOpenModal={onOpenModal}
        onResetFilters={onResetFilters}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        comparedIds={comparedIds}
        onToggleCompare={onToggleCompare}
      />

      {/* 5. Signature Off-Plan Allocations */}
      <OffPlanSection
        currency={currency}
        onShowNotice={onShowNotice}
      />

      {/* 6. Master Developer Alliances */}
      <DeveloperAlliance />

      {/* 7. Interactive Dubai Golden Visa & Tax Assessment Widget */}
      <GoldenVisaChecker
        onShowNotice={onShowNotice}
      />

      {/* 8. Prime Dubai Communities Guide */}
      <CommunitiesSection
        onSelectCommunity={onSelectCommunity}
      />

      {/* 9. The Nova Advantage */}
      <WhyNova />

      {/* 10. Client Testimonials & Google Rating */}
      <TestimonialsSection />

      {/* 11. VIP Contact & Valuation */}
      <ContactSection />
    </div>
  );
}
