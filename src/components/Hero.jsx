import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function Hero({ activeTab, onTabChange, onSearchSubmit }) {
  const [community, setCommunity] = useState('');
  const [type, setType] = useState('');
  const [beds, setBeds] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit({ community, type, beds, budget });
    const target = activeTab === 'offplan' ? document.getElementById('off-plan') : document.getElementById('listings');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabClick = (tabKey) => {
    onTabChange(tabKey);
    if (tabKey === 'offplan') {
      const target = document.getElementById('off-plan');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-background-wrapper">
        <div className="hero-bg-image"></div>
        <div className="hero-grid-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge">
          <div className="pulse-dot"></div>
          <span>RERA Registered &middot; DIFC Headquartered &middot; Est. 2012</span>
        </div>

        <h1 className="hero-title">
          Leading Luxury Property<br />
          <em>Broker in Dubai</em>
        </h1>

        <p className="hero-subhead">
          Smart investments start here. Curating exclusive waterfront estates, skyline penthouses, and high-yield off-plan portfolios across Palm Jumeirah, Downtown Dubai, and Emirates Hills.
        </p>

        <div className="hero-ctas">
          <a href="#listings" className="btn btn-gold">
            <span>Explore Luxury Listings</span>
            <ArrowRight size={14} />
          </a>
          <a href="#3d-model" className="btn btn-outline">
            <span>3D Tower Model</span>
          </a>
          <a href="#off-plan" className="btn btn-outline hide-mobile">
            <span>Off-Plan Launches</span>
          </a>
        </div>

        {/* ── Stage Properties Signature Multi-Tab Search Engine ── */}
        <div className="search-engine-card">
          <div className="search-tabs" role="tablist">
            <button
              type="button"
              className={`search-tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
              onClick={() => handleTabClick('buy')}
            >
              Buy Residential
            </button>
            <button
              type="button"
              className={`search-tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
              onClick={() => handleTabClick('rent')}
            >
              Rent Luxury
            </button>
            <button
              type="button"
              className={`search-tab-btn ${activeTab === 'offplan' ? 'active' : ''}`}
              onClick={() => handleTabClick('offplan')}
            >
              Off-Plan Projects
            </button>
            <button
              type="button"
              className={`search-tab-btn ${activeTab === 'commercial' ? 'active' : ''}`}
              onClick={() => handleTabClick('commercial')}
            >
              Commercial &amp; DIFC
            </button>
          </div>

          <form className="search-body" onSubmit={handleSubmit}>
            {/* Community Selector */}
            <div className="search-field">
              <label className="search-label" htmlFor="search-community">Location / Area</label>
              <select
                className="search-control"
                id="search-community"
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
              >
                <option value="">All Dubai Communities</option>
                <option value="Palm Jumeirah">Palm Jumeirah</option>
                <option value="Downtown Dubai">Downtown Dubai</option>
                <option value="Emirates Hills">Emirates Hills</option>
                <option value="DIFC">DIFC (Financial Centre)</option>
                <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                <option value="JBR">Jumeirah Beach Residence</option>
                <option value="Arabian Ranches">Arabian Ranches</option>
                <option value="Bluewaters Island">Bluewaters Island</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="search-field">
              <label className="search-label" htmlFor="search-type">Property Type</label>
              <select
                className="search-control"
                id="search-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Property Types</option>
                <option value="Penthouse">Sky Penthouse</option>
                <option value="Villa">Luxury Villa</option>
                <option value="Apartment">Luxury Apartment</option>
                <option value="Commercial">Commercial Office</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="search-field">
              <label className="search-label" htmlFor="search-beds">Bedrooms</label>
              <select
                className="search-control"
                id="search-beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
              >
                <option value="">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms / Mansions</option>
              </select>
            </div>

            {/* Budget Range */}
            <div className="search-field">
              <label className="search-label" htmlFor="search-budget">Price Range</label>
              <select
                className="search-control"
                id="search-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Any Price Range</option>
                <option value="0-3000000">Under AED 3,000,000</option>
                <option value="3000000-10000000">AED 3M – 10M</option>
                <option value="10000000-25000000">AED 10M – 25M</option>
                <option value="25000000-100000000">AED 25M+ (Ultra-Prime)</option>
              </select>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-gold search-submit-btn" aria-label="Search properties">
              <Search size={16} strokeWidth={2.5} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
