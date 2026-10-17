import React, { useEffect } from 'react';
import { X, Check, Minus, MessageCircle, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function CompareModal({
  isOpen,
  onClose,
  comparedIds,
  onRemoveCompare,
  onSelectProperty,
  currency,
  unit
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cur = NOVA_DATA.currencies[currency] || NOVA_DATA.currencies.AED;
  const properties = NOVA_DATA.properties.filter(p => comparedIds.includes(p.id));

  const formatPrice = (priceAED, rentPeriod) => {
    const converted = Math.round(priceAED * cur.rate);
    const formatted = `${cur.symbol} ${converted.toLocaleString('en-US')}`;
    return rentPeriod ? `${formatted} ${rentPeriod}` : formatted;
  };

  const formatPricePerSqft = (priceAED, sqft, sqm) => {
    const converted = Math.round(priceAED * cur.rate);
    if (unit === 'sqm') {
      const ratePerM2 = Math.round(converted / sqm);
      return `${cur.symbol} ${ratePerM2.toLocaleString('en-US')} / m²`;
    }
    const ratePerSqft = Math.round(converted / sqft);
    return `${cur.symbol} ${ratePerSqft.toLocaleString('en-US')} / sq. ft.`;
  };

  const formatArea = (sqft, sqm) => {
    if (unit === 'sqm') return `${sqm.toLocaleString('en-US')} m²`;
    return `${sqft.toLocaleString('en-US')} sq. ft.`;
  };

  // Compile list of unique amenities across compared properties
  const allAmenities = Array.from(
    new Set(properties.flatMap(p => p.amenities || []))
  );

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="compare-modal-container">
        {/* Modal Header */}
        <div className="compare-modal-header">
          <div>
            <div className="modal-eyebrow">
              <Scale size={14} className="gold-accent-icon" />
              <span>Executive Appraisal</span>
            </div>
            <h2 id="compare-modal-title" className="compare-modal-title">
              Side-by-Side <em>Residence Comparison</em>
            </h2>
            <p className="compare-modal-sub">
              Comparative analysis across purchase valuation, rental yield metrics, built-up areas, and residency eligibility.
            </p>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Comparison View"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Table Body */}
        <div className="compare-modal-body">
          {properties.length < 2 ? (
            <div className="compare-notice-box">
              <p>Please select at least 2 properties to perform an institutional comparison.</p>
            </div>
          ) : (
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="spec-label-col">Residences</th>
                    {properties.map((prop) => (
                      <th key={prop.id} className="prop-col-head">
                        <div className="compare-card-head">
                          <div className="compare-img-wrap">
                            <img src={prop.image} alt={prop.title} />
                            <button
                              type="button"
                              className="compare-remove-card-btn"
                              onClick={() => onRemoveCompare(prop.id)}
                              title="Remove from comparison"
                            >
                              <X size={13} />
                            </button>
                            <span className="compare-badge">{prop.badge}</span>
                          </div>
                          <div className="compare-loc">{prop.location}</div>
                          <h3 className="compare-name">{prop.title}</h3>
                          <div className="compare-price">{formatPrice(prop.priceAED, prop.rentPeriod)}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Category: Valuation & Metrics */}
                  <tr className="section-row">
                    <td colSpan={properties.length + 1}>1. Financial & Valuation Metrics</td>
                  </tr>

                  <tr>
                    <td className="spec-label">Unit Rate</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val">
                        {formatPricePerSqft(p.priceAED, p.sqft, p.sqm)}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">Projected Net ROI</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val highlight-gold">
                        {p.roiRate ? `${p.roiRate}% Net p.a.` : '7.2% Estimated'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">Est. Service Charge</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val">
                        {p.serviceChargeAED ? `AED ${p.serviceChargeAED} / sq. ft.` : 'Standard DIFC / DLD'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">UAE 10-Yr Golden Visa</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val">
                        {p.goldenVisa ? (
                          <span className="visa-badge-eligible">
                            <ShieldCheck size={13} />
                            <span>100% Eligible</span>
                          </span>
                        ) : (
                          <span className="visa-badge-ineligible">
                            <span>Standard Title</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Category: Dimensions & Architecture */}
                  <tr className="section-row">
                    <td colSpan={properties.length + 1}>2. Spatial Dimensions & Layout</td>
                  </tr>

                  <tr>
                    <td className="spec-label">Property Type</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val">{p.type}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">Bedrooms</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val font-semibold">
                        {p.beds > 0 ? `${p.beds} Bedrooms` : 'Commercial Suite'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">Bathrooms</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val">{p.baths} Bathrooms</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">Built-Up Area</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val font-mono">
                        {formatArea(p.sqft, p.sqm)}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">Ceiling Height</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val">
                        {p.floorPlan?.ceilingHeight || '3.20 m'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">Orientation</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val">
                        {p.floorPlan?.orientation || 'Prime Panoramic'}
                      </td>
                    ))}
                  </tr>

                  {/* Category: Legal & Compliance */}
                  <tr className="section-row">
                    <td colSpan={properties.length + 1}>3. Legal Verification & Registration</td>
                  </tr>

                  <tr>
                    <td className="spec-label">Status</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val">{p.status}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">RERA Permit No.</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val font-mono text-xs">
                        {p.permitNumber}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="spec-label">Dedicated Advisor</td>
                    {properties.map((p) => (
                      <td key={p.id} className="spec-val text-xs">
                        <strong>{p.advisor?.name}</strong><br />
                        <span style={{ color: 'var(--text-muted)' }}>{p.advisor?.role}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Category: Amenities Matrix */}
                  <tr className="section-row">
                    <td colSpan={properties.length + 1}>4. Amenities & Finishes Matrix</td>
                  </tr>

                  {allAmenities.slice(0, 10).map((amenity) => (
                    <tr key={amenity}>
                      <td className="spec-label">{amenity}</td>
                      {properties.map((p) => {
                        const hasAmenity = (p.amenities || []).includes(amenity);
                        return (
                          <td key={p.id} className="spec-val text-center">
                            {hasAmenity ? (
                              <Check size={16} className="amenity-check" />
                            ) : (
                              <Minus size={16} className="amenity-minus" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Action Row */}
                  <tr className="action-row">
                    <td className="spec-label">Actions</td>
                    {properties.map((p) => {
                      const waMsg = encodeURIComponent(
                        `Hello ${p.advisor?.name || 'Nova Properties'}, I am comparing ${p.title} (${p.id}) and would like to arrange a private consultation.`
                      );
                      return (
                        <td key={p.id} className="spec-val">
                          <div className="compare-table-actions">
                            <button
                              type="button"
                              className="btn btn-gold btn-sm"
                              style={{ width: '100%', marginBottom: '8px' }}
                              onClick={() => {
                                onClose();
                                onSelectProperty(p);
                              }}
                            >
                              <span>View Full Dossier</span>
                              <ArrowRight size={12} />
                            </button>
                            <a
                              href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline btn-sm"
                              style={{ width: '100%' }}
                            >
                              <MessageCircle size={12} />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
