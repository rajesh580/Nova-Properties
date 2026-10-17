import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function MobileDrawer({
  isOpen,
  onClose,
  favoritesCount = 0,
  onOpenFavorites
}) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="drawer-header">
        <Link to="/" onClick={handleLinkClick} className="brand-words">
          <span className="brand-name">{NOVA_DATA.brand.name}</span>
          <span className="brand-sub">{NOVA_DATA.brand.subName}</span>
        </Link>
        <button className="drawer-close" onClick={onClose} aria-label="Close Mobile Menu">
          <X size={20} />
        </button>
      </div>

      {/* Quick Action Shortcuts inside Mobile Menu */}
      <div className="mobile-shortcuts-bar">
        <button
          type="button"
          className="mobile-shortcut-btn"
          onClick={() => {
            onClose();
            onOpenFavorites?.();
          }}
        >
          <Heart size={16} className={favoritesCount > 0 ? 'gold-active filled' : ''} />
          <span>Shortlist ({favoritesCount})</span>
        </button>
      </div>

      <div className="drawer-links">
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/residential" onClick={handleLinkClick}>Residential Properties</Link>
        <Link to="/off-plan" onClick={handleLinkClick}>Off-Plan Developments</Link>
        <Link to="/communities" onClick={handleLinkClick}>Prime Communities</Link>
        <Link to="/mortgage-calculator" onClick={handleLinkClick}>Mortgage &amp; ROI Calculator</Link>
        <Link to="/about" onClick={handleLinkClick}>Our Story &amp; DIFC Office</Link>
        <Link to="/advisors" onClick={handleLinkClick}>Senior Advisors</Link>
        <Link to="/contact" onClick={handleLinkClick}>VIP Contact</Link>
      </div>

      <div className="drawer-footer">
        <a href={`tel:${NOVA_DATA.brand.phoneClean}`} className="btn btn-outline" style={{ width: '100%' }}>
          Call DIFC Office: {NOVA_DATA.brand.phone}
        </a>
        <Link to="/contact" onClick={handleLinkClick} className="btn btn-gold" style={{ width: '100%' }}>
          Book Private Consultation
        </Link>
      </div>
    </div>
  );
}
