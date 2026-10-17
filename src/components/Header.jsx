import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function Header({ onOpenMobileMenu }) {
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
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="Nova Properties Home">
          <div className="brand-emblem">
            <span className="brand-emblem-text">N</span>
          </div>
          <div className="brand-words">
            <span className="brand-name">{NOVA_DATA.brand.name}</span>
            <span className="brand-sub">{NOVA_DATA.brand.subName}</span>
          </div>
        </Link>

        {/* Primary Desktop Navigation: Strictly single-line, perfectly centered */}
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

        {/* Action cluster: Clean & uncluttered VIP Desk + Enquire */}
        <div className="header-actions">
          <a href={`tel:${NOVA_DATA.brand.mobileClean}`} className="header-phone hide-tablet">
            <Phone size={13} style={{ color: 'var(--gold)' }} />
            <span>VIP Desk</span>
          </a>

          <Link to="/contact" className="btn btn-gold btn-header-cta">
            <span>Enquire</span>
            <ArrowRight size={13} />
          </Link>

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
