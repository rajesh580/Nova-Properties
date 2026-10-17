import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import PropertyListings from '../components/PropertyListings';
import { Award, ShieldCheck, FileText, Phone, ArrowRight } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';
import { Link } from 'react-router-dom';

export default function ResidentialPage({
  currency,
  unit,
  onOpenModal,
  favorites = [],
  onToggleFavorite,
  comparedIds = [],
  onToggleCompare
}) {
  const [activeTab, setActiveTab] = useState('buy');
  const [searchParams, setSearchParams] = useState({
    community: '',
    type: '',
    beds: '',
    budget: ''
  });

  const handleResetFilters = () => {
    setSearchParams({
      community: '',
      type: '',
      beds: '',
      budget: ''
    });
  };

  return (
    <div className="residential-page-view">
      {/* 1. Subpage Hero Header */}
      <PageHeader
        eyebrow="Exclusive Dubai Residences"
        title="Prime Residential"
        titleAccent="Portfolio"
        description="Browse our hand-selected collection of waterfront penthouses, bespoke Palm Jumeirah villas, and DIFC luxury residences. Every property is rigorously vetted for legal authenticity and immediate transferability."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Residential Portfolio' }
        ]}
        meta={[
          'RERA Verified Titles',
          'AED 2M+ Golden Visa Eligible',
          'Discreet Private Viewings',
          'Full Escrow & Title Deed Security'
        ]}
      />

      {/* 2. Listings Section with Filters */}
      <PropertyListings
        currency={currency}
        unit={unit}
        activeTab={activeTab}
        searchParams={searchParams}
        onOpenModal={onOpenModal}
        onResetFilters={handleResetFilters}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        comparedIds={comparedIds}
        onToggleCompare={onToggleCompare}
      />

      {/* 3. International Buyer & Golden Visa Advisory Strip */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: 'var(--border-hairline)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">Institutional Advisory</span>
              <h2 className="section-title">The International <em>Acquisition Protocol</em></h2>
              <p className="section-desc">
                Nova Properties provides end-to-end conveyance, escrow coordination, and UAE Golden Visa facilitation for international investors and family offices.
              </p>
            </div>
          </div>

          <div className="why-grid" style={{ marginTop: '32px' }}>
            <div className="why-card">
              <div className="why-num">01</div>
              <h3 className="why-title">100% Foreign Ownership</h3>
              <p className="why-text">
                All listed residences are situated within designated freehold zones, granting unconditional title deed ownership to international citizens with zero local sponsorship required.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">02</div>
              <h3 className="why-title">10-Year UAE Golden Visa</h3>
              <p className="why-text">
                Purchases of AED 2,000,000 or greater qualify you and your immediate family for a 10-year renewable UAE Golden Residency, processed via our in-house DIFC legal desk.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">03</div>
              <h3 className="why-title">Zero Personal & Capital Tax</h3>
              <p className="why-text">
                Dubai levies 0% capital gains tax, 0% personal income tax, and 0% property tax, allowing your luxury portfolio to appreciate and yield rental cashflow unencumbered.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">04</div>
              <h3 className="why-title">Virtual Conveyance & Power of Attorney</h3>
              <p className="why-text">
                Execute contracts and title deed transfers remotely via Dubai REST and our registered notary partners without needing to be physically present in the UAE.
              </p>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div style={{
            marginTop: '48px',
            padding: '36px',
            background: 'linear-gradient(135deg, rgba(20, 25, 43, 0.9) 0%, rgba(11, 14, 23, 0.95) 100%)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-white)', marginBottom: '8px' }}>
                Looking for an Off-Market or Private Listing?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '640px' }}>
                Over 35% of ultra-prime transactions in Dubai occur off-market under non-disclosure agreements. Contact our Private Client desk for private book portfolios.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-gold">
                <span>Request Private Portfolio</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=Hello%20Nova%20Properties,%20I%20am%20inquiring%20about%20off-market%20residential%20listings.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <span>WhatsApp Private Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
