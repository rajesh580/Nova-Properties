import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function TopBar({ currency, onCurrencyChange, unit, onUnitChange }) {
  return (
    <aside className="top-bar" aria-label="Quick contact and market tools">
      <div className="container top-bar-inner">
        <div className="top-bar-left">
          <span className="top-bar-item">
            <MapPin size={13} style={{ color: 'var(--gold)' }} />
            {NOVA_DATA.brand.address}
          </span>
          <span className="top-bar-item hide-mobile">
            <span className="top-bar-badge">RERA ORN: {NOVA_DATA.brand.reraOrn}</span>
            <span style={{ color: 'var(--text-muted)' }}>&middot;</span>
            <span>DLD Reg. Broker</span>
          </span>
        </div>

        <div className="top-bar-right">
          {/* Measurement Unit Converter */}
          <div className="unit-selector" title="Switch measurement units">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>UNIT:</span>
            <select
              value={unit}
              onChange={(e) => onUnitChange(e.target.value)}
              aria-label="Area measurement unit"
            >
              <option value="sqft">SQ. FT.</option>
              <option value="sqm">SQ. METERS</option>
            </select>
          </div>

          {/* Dynamic Currency Converter */}
          <div className="currency-selector" title="Switch display currency">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>CURRENCY:</span>
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              aria-label="Select currency"
            >
              {Object.entries(NOVA_DATA.currencies).map(([code, cur]) => (
                <option key={code} value={code}>
                  {cur.label}
                </option>
              ))}
            </select>
          </div>

          <a href={`tel:${NOVA_DATA.brand.phoneClean}`} className="top-bar-item" style={{ color: 'var(--gold-light)' }}>
            <Phone size={13} style={{ color: 'var(--gold)' }} />
            {NOVA_DATA.brand.phone}
          </a>
        </div>
      </div>
    </aside>
  );
}
