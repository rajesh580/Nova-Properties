import React from 'react';
import { Link } from 'react-router-dom';
import { NOVA_DATA } from '../data/propertiesData';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand">
            <Link to="/" className="brand-words">
              <span className="brand-name" style={{ fontSize: '1.6rem', color: 'var(--gold-light)' }}>
                {NOVA_DATA.brand.name}
              </span>
              <span className="brand-sub">{NOVA_DATA.brand.subName}</span>
            </Link>
            <p>
              Dubai's trusted luxury real estate partner since 2012. Regulated by the Real Estate Regulatory Agency (RERA). Headquarters in DIFC Gate Building and Downtown Dubai.
            </p>
            <div className="top-bar-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>RERA ORN: {NOVA_DATA.brand.reraOrn}</span>
              <span>&middot;</span>
              <span>DLD Broker No: {NOVA_DATA.brand.dldLicense}</span>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Portfolio</h4>
            <ul className="footer-links-list">
              <li><Link to="/residential">Palm Jumeirah Villas</Link></li>
              <li><Link to="/residential">Downtown Sky Penthouses</Link></li>
              <li><Link to="/residential">Emirates Hills Estates</Link></li>
              <li><Link to="/off-plan">Off-Plan New Launches</Link></li>
              <li><Link to="/residential">DIFC Commercial HQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Advisory</h4>
            <ul className="footer-links-list">
              <li><Link to="/mortgage-calculator">Mortgage &amp; ROI Calculator</Link></li>
              <li><Link to="/about">UAE Golden Visa Support</Link></li>
              <li><Link to="/about">Our 12-Year DIFC Story</Link></li>
              <li><Link to="/advisors">Senior Advisory Board</Link></li>
              <li><Link to="/contact">Discreet Valuation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Global Headquarters</h4>
            <ul className="footer-links-list">
              <li>{NOVA_DATA.brand.address}</li>
              <li>{NOVA_DATA.brand.secondaryAddress}</li>
              <li><a href={`tel:${NOVA_DATA.brand.phoneClean}`}>{NOVA_DATA.brand.phone}</a></li>
              <li><a href={`mailto:${NOVA_DATA.brand.email}`}>{NOVA_DATA.brand.email}</a></li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '8px' }}>
                {NOVA_DATA.brand.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div>
            &copy; {new Date().getFullYear()} Nova Properties Brokers L.L.C. All rights reserved. Registered under Dubai Real Estate Regulatory Agency (RERA).
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Engagement</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>RERA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
