import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Phone, ArrowRight, Heart, Scale } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function Header({
  onOpenMobileMenu,
  favoritesCount = 0,
  onOpenFavorites,
  comparedCount = 0,
  onOpenCompare,
  currency = 'AED',
  onCurrencyChange,
  unit = 'sqft',
  onUnitChange
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="site-header">
      <div className="container header-inner">
        {/* Brand Logo: Vertically centered, crisp alignment */}
        <Link to="/" className="brand-logo" aria-label="Nova Properties Home">
          <div className="brand-emblem">
            <span className="brand-emblem-text">N</span>
          </div>
          <div className="brand-words">
            <span className="brand-name">{NOVA_DATA.brand.name}</span>
            <span className="brand-sub">{NOVA_DATA.brand.subName}</span>
          </div>
        </Link>

        {/* Primary Desktop Navigation: Strictly single line, perfectly aligned */}
        <nav className="main-nav" aria-label="Primary Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/residential"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Residential
          </NavLink>
          <NavLink
            to="/off-plan"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Off-Plan
          </NavLink>
          <NavLink
            to="/communities"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Communities
          </NavLink>
          <NavLink
            to="/mortgage-calculator"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Mortgage Calc
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            About
          </NavLink>
          <NavLink
            to="/advisors"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Advisors
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Contact
          </NavLink>
        </nav>

        {/* Action cluster: Currency & Unit pills, Shortlist, Compare, VIP Desk, Enquire */}
        <div className="header-actions">
          {/* Currency Switcher in Header */}
          {onCurrencyChange && (
            <div className="header-select-pill hide-small-screen" title="Display Currency">
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                aria-label="Currency"
              >
                {Object.entries(NOVA_DATA.currencies).map(([code, cur]) => (
                  <option key={code} value={code}>
                    {code} ({cur.symbol})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Unit Switcher in Header */}
          {onUnitChange && (
            <div className="header-select-pill hide-small-screen" title="Measurement Unit">
              <select
                value={unit}
                onChange={(e) => onUnitChange(e.target.value)}
                aria-label="Measurement Unit"
              >
                <option value="sqft">SQFT</option>
                <option value="sqm">SQM</option>
              </select>
            </div>
          )}

          {/* Quick Shortlist Trigger */}
          <button
            type="button"
            className="header-icon-action"
            onClick={onOpenFavorites}
            title="View Shortlisted Residences"
            aria-label={`View Shortlist (${favoritesCount} saved)`}
          >
            <Heart size={16} className={favoritesCount > 0 ? 'gold-active filled' : ''} />
            {favoritesCount > 0 && (
              <span className="header-badge-count">{favoritesCount}</span>
            )}
          </button>

          {/* Quick Compare Trigger */}
          {comparedCount > 0 && (
            <button
              type="button"
              className="header-icon-action"
              onClick={onOpenCompare}
              title="View Residence Comparison"
              aria-label={`Compare Residences (${comparedCount} selected)`}
            >
              <Scale size={16} className="gold-active" />
              <span className="header-badge-count">{comparedCount}</span>
            </button>
          )}

          {/* VIP Desk Phone Action */}
          <a href={`tel:${NOVA_DATA.brand.mobileClean}`} className="header-phone hide-tablet">
            <Phone size={13} style={{ color: 'var(--gold)' }} />
            <span>VIP Desk</span>
          </a>

          {/* Enquire CTA */}
          <Link to="/contact" className="btn btn-gold btn-header-cta">
            <span>Enquire</span>
            <ArrowRight size={13} />
          </Link>

          {/* Mobile menu hamburger button */}
          <button
            className="mobile-menu-btn"
            id="mobile-menu-btn"
            onClick={onOpenMobileMenu}
            aria-label="Open Mobile Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
