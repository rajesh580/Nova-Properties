import React, { useState, useEffect } from 'react';
import {
  X, Check, Heart, Scale, Calendar, Clock, Car, Share2,
  ChevronLeft, ChevronRight, Maximize2, ShieldCheck,
  TrendingUp, Compass, ArrowRight, MessageCircle, FileText
} from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function PropertyModal({
  property,
  currency,
  unit,
  onClose,
  onShowNotice,
  isFavorite = false,
  onToggleFavorite,
  isCompared = false,
  onToggleCompare
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // VIP Viewing Scheduler State
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [viewTime, setViewTime] = useState('sunset');
  const [needChauffeur, setNeedChauffeur] = useState(true);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeePhone, setAttendeePhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    setActiveImgIndex(0);
    setActiveTab('overview');
    setBookingConfirmed(false);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowRight' && property?.gallery?.length) {
        setActiveImgIndex((prev) => (prev + 1) % property.gallery.length);
      }
      if (e.key === 'ArrowLeft' && property?.gallery?.length) {
        setActiveImgIndex((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose, isLightboxOpen]);

  if (!property) return null;

  const cur = NOVA_DATA.currencies[currency] || NOVA_DATA.currencies.AED;
  const convertedPrice = Math.round(property.priceAED * cur.rate);
  const priceFormatted = `${cur.symbol} ${convertedPrice.toLocaleString('en-US')}${property.rentPeriod ? ` ${property.rentPeriod}` : ''}`;
  const areaFormatted = unit === 'sqm' ? `${property.sqm} m²` : `${property.sqft.toLocaleString('en-US')} sq. ft.`;

  // Financial Estimates for this specific residence
  const downPayment = Math.round(property.priceAED * 0.20 * cur.rate);
  const loanAmount = Math.round(property.priceAED * 0.80 * cur.rate);
  const monthlyMortgage = Math.round((loanAmount * 0.045 / 12) + (loanAmount / (25 * 12)));
  const estimatedRoiRate = property.roiRate || 7.2;
  const annualGrossRental = Math.round(convertedPrice * (estimatedRoiRate / 100));
  const serviceChargePerYear = property.serviceChargeAED ? Math.round(property.serviceChargeAED * property.sqft * cur.rate) : 0;
  const annualNetRental = annualGrossRental - serviceChargePerYear;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    onShowNotice(`VIP Viewing for ${property.title}`);
  };

  const waViewingMsg = encodeURIComponent(
    `Hello ${property.advisor?.name || 'Nova Properties'}, I would like to confirm a private VIP viewing for ${property.title} (${property.id}) on ${viewDate} (${viewTime.toUpperCase()} slot). Chauffeur required: ${needChauffeur ? 'Yes (Maybach/Range Rover)' : 'No'}.`
  );

  return (
    <>
      <div
        className="modal-backdrop open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="modal-container supercharged-modal">
          {/* Top Actions Bar */}
          <div className="modal-top-bar">
            <div className="modal-top-left">
              <span className="modal-badge-ref font-mono">REF: {property.id}</span>
              <span className="modal-badge-permit font-mono">{property.permitNumber}</span>
              {property.goldenVisa && (
                <span className="modal-badge-visa">
                  <ShieldCheck size={12} />
                  <span>10-Yr Golden Visa</span>
                </span>
              )}
            </div>

            <div className="modal-top-right">
              {/* Favorite Button */}
              {onToggleFavorite && (
                <button
                  type="button"
                  className={`modal-tool-btn ${isFavorite ? 'active-fav' : ''}`}
                  onClick={() => onToggleFavorite(property.id)}
                  title={isFavorite ? 'Remove from shortlist' : 'Add to shortlist'}
                  aria-label="Toggle shortlist"
                >
                  <Heart size={15} className={isFavorite ? 'filled-heart' : ''} />
                  <span className="hide-mobile">{isFavorite ? 'Shortlisted' : 'Shortlist'}</span>
                </button>
              )}

              {/* Compare Button */}
              {onToggleCompare && (
                <button
                  type="button"
                  className={`modal-tool-btn ${isCompared ? 'active-compare' : ''}`}
                  onClick={() => onToggleCompare(property.id)}
                  title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                  aria-label="Toggle compare"
                >
                  <Scale size={15} />
                  <span className="hide-mobile">{isCompared ? 'Comparing' : 'Compare'}</span>
                </button>
              )}

              {/* Share Button */}
              <button
                type="button"
                className="modal-tool-btn"
                onClick={handleShare}
                title="Copy property link"
                aria-label="Share property link"
              >
                <Share2 size={15} />
                <span className="hide-mobile">{copyFeedback ? 'Link Copied!' : 'Share'}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close Property Details"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Header Title & Valuation */}
          <div className="modal-hero-header">
            <div className="modal-hero-title-group">
              <div className="modal-community-label">
                <span className="gold-dot"></span>
                <span>{property.community} &middot; {property.location}</span>
              </div>
              <h2 id="property-modal-title" className="modal-main-title">
                {property.title}
              </h2>
            </div>
            <div className="modal-hero-price-group">
              <div className="modal-price-number">{priceFormatted}</div>
              <div className="modal-price-sub">
                {property.beds > 0 ? `${property.beds} Bedrooms` : 'Commercial Suite'} &middot; {areaFormatted}
              </div>
            </div>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="modal-nav-tabs" role="tablist">
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Gallery &amp; Overview
            </button>
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'floorplan' ? 'active' : ''}`}
              onClick={() => setActiveTab('floorplan')}
            >
              Floor Plan &amp; Dimensions
            </button>
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'viewing' ? 'active' : ''}`}
              onClick={() => setActiveTab('viewing')}
            >
              Book Private Viewing
            </button>
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'financial' ? 'active' : ''}`}
              onClick={() => setActiveTab('financial')}
            >
              Financial &amp; ROI Yield
            </button>
          </div>

          {/* TAB 1: OVERVIEW & GALLERY */}
          {activeTab === 'overview' && (
            <div className="modal-tab-content modal-animate-fade">
              {/* Media Gallery */}
              <div className="modal-gallery-showcase">
                <div className="gallery-main-view">
                  <img
                    src={property.gallery[activeImgIndex]}
                    alt={`${property.title} - view ${activeImgIndex + 1}`}
                  />
                  <div className="gallery-controls-overlay">
                    <button
                      type="button"
                      className="gallery-nav-btn prev"
                      onClick={() => setActiveImgIndex((prev) => (prev - 1 + property.gallery.length) % property.gallery.length)}
                      aria-label="Previous Photo"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      className="gallery-nav-btn next"
                      onClick={() => setActiveImgIndex((prev) => (prev + 1) % property.gallery.length)}
                      aria-label="Next Photo"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button
                      type="button"
                      className="gallery-fullscreen-btn"
                      onClick={() => setIsLightboxOpen(true)}
                      title="Enlarge Photo"
                      aria-label="View Fullscreen Photo"
                    >
                      <Maximize2 size={16} />
                      <span>Expand ({activeImgIndex + 1}/{property.gallery.length})</span>
                    </button>
                  </div>
                </div>

                {/* Thumbnails row */}
                <div className="gallery-thumbs-row">
                  {property.gallery.map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`gallery-thumb-item ${i === activeImgIndex ? 'active' : ''}`}
                      onClick={() => setActiveImgIndex(i)}
                      aria-label={`View photo ${i + 1}`}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="modal-specs-strip">
                <div className="modal-spec-cell">
                  <span className="spec-cell-label">Property Type</span>
                  <span className="spec-cell-val font-semibold">{property.type}</span>
                </div>
                <div className="modal-spec-cell">
                  <span className="spec-cell-label">Bedrooms</span>
                  <span className="spec-cell-val font-mono">{property.beds > 0 ? property.beds : 'Studio/Suite'}</span>
                </div>
                <div className="modal-spec-cell">
                  <span className="spec-cell-label">Bathrooms</span>
                  <span className="spec-cell-val font-mono">{property.baths} Baths</span>
                </div>
                <div className="modal-spec-cell">
                  <span className="spec-cell-label">Built-Up Area</span>
                  <span className="spec-cell-val font-mono">{areaFormatted}</span>
                </div>
                <div className="modal-spec-cell">
                  <span className="spec-cell-label">Completion Status</span>
                  <span className="spec-cell-val text-gold">{property.status}</span>
                </div>
              </div>

              {/* Architectural Description */}
              <div className="modal-body-section">
                <h3 className="modal-section-subtitle">Architectural Description</h3>
                <p className="modal-desc-paragraph">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="modal-body-section">
                <h3 className="modal-section-subtitle">Private Amenities &amp; Inclusions</h3>
                <div className="modal-amenities-grid">
                  {property.amenities.map((am, i) => (
                    <div key={i} className="modal-amenity-item">
                      <Check size={14} className="amenity-gold-check" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLOOR PLAN & ARCHITECTURAL LAYOUT */}
          {activeTab === 'floorplan' && (
            <div className="modal-tab-content modal-animate-fade">
              <div className="floorplan-overview-card">
                <div className="floorplan-meta-row">
                  <div>
                    <span className="fp-label">Architectural Type</span>
                    <span className="fp-val">{property.floorPlan?.levels || 'Luxury Multi-Zone Floorplate'}</span>
                  </div>
                  <div>
                    <span className="fp-label">Sun &amp; Sightline Orientation</span>
                    <span className="fp-val">
                      <Compass size={14} className="inline-icon" />
                      {property.floorPlan?.orientation || 'Prime Panoramic Facing'}
                    </span>
                  </div>
                  <div>
                    <span className="fp-label">Finished Ceiling Clear</span>
                    <span className="fp-val">{property.floorPlan?.ceilingHeight || '3.40 m'}</span>
                  </div>
                  <div>
                    <span className="fp-label">Total Certified Area</span>
                    <span className="fp-val font-mono">{areaFormatted}</span>
                  </div>
                </div>

                {/* Architectural Blueprint Visualizer Schematic */}
                <div className="blueprint-schematic-wrapper">
                  <div className="blueprint-grid-bg"></div>
                  <div className="blueprint-header-tag">
                    <span>CAD SCHEMATIC &middot; {property.id} &middot; 1:100 SCALE CERTIFIED</span>
                  </div>

                  <div className="blueprint-rooms-diagram">
                    {(property.floorPlan?.zones || [
                      { name: 'Grand Living & Reception', area: '120 m²', desc: 'Dual exposure floor-to-ceiling glass curtain' },
                      { name: 'Master Bedroom Suite', area: '65 m²', desc: 'Integrated dressing suite and stone spa ensuite' },
                      { name: 'Private Terrace / Balcony', area: '50 m²', desc: 'Panoramic skyline & waterfront viewdeck' },
                      { name: 'Gourmet Kitchen & Dining', area: '40 m²', desc: 'European joinery & chef island' }
                    ]).map((zone, idx) => (
                      <div className="blueprint-room-box" key={idx}>
                        <div className="bp-room-header">
                          <span className="bp-room-name">{zone.name}</span>
                          <span className="bp-room-area">{zone.area}</span>
                        </div>
                        <p className="bp-room-desc">{zone.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="blueprint-footer-note">
                    Verified against Dubai Land Department (DLD) approved architectural schematics. Accurate to +/- 0.5%.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIP PRIVATE VIEWING SCHEDULER */}
          {activeTab === 'viewing' && (
            <div className="modal-tab-content modal-animate-fade">
              <div className="viewing-scheduler-card">
                {bookingConfirmed ? (
                  <div className="booking-success-box">
                    <div className="success-icon-wrap">
                      <Check size={36} />
                    </div>
                    <h3 className="success-title">VIP Viewing Appointment Requested</h3>
                    <p className="success-desc">
                      Thank you. <strong>{property.advisor?.name}</strong> has received your confidential viewing schedule for <strong>{property.title}</strong> on <strong>{viewDate}</strong> ({viewTime.toUpperCase()} slot).
                    </p>
                    {needChauffeur && (
                      <div className="chauffeur-confirmed-badge">
                        <Car size={16} />
                        <span>Complimentary Chauffeur requested for Dubai hotel/residence pick-up.</span>
                      </div>
                    )}
                    <div className="success-actions">
                      <a
                        href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waViewingMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold"
                      >
                        <MessageCircle size={15} />
                        <span>Confirm via WhatsApp Desk</span>
                      </a>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setBookingConfirmed(false)}
                      >
                        Modify Date/Time
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="viewing-form">
                    <div className="form-intro">
                      <h3 className="form-heading">Schedule a Discreet VIP Viewing</h3>
                      <p className="form-subtext">
                        Private inspections are conducted exclusively by senior directors with private access keys. No public queueing.
                      </p>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="view-date">
                          <Calendar size={13} className="inline-icon" />
                          <span>Preferred Date</span>
                        </label>
                        <input
                          type="date"
                          id="view-date"
                          className="form-control"
                          value={viewDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setViewDate(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="view-time">
                          <Clock size={13} className="inline-icon" />
                          <span>Preferred Time Window</span>
                        </label>
                        <select
                          id="view-time"
                          className="form-control"
                          value={viewTime}
                          onChange={(e) => setViewTime(e.target.value)}
                        >
                          <option value="morning">Morning (10:00 AM – 12:00 PM)</option>
                          <option value="midday">Midday (1:30 PM – 3:30 PM)</option>
                          <option value="sunset">Golden Hour Sunset Tour (5:00 PM – 6:30 PM)</option>
                          <option value="evening">Evening DIFC Skyline Tour (7:30 PM – 9:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="chauffeur-toggle-card">
                      <div className="chauffeur-info">
                        <Car size={18} className="gold-accent-icon" />
                        <div>
                          <div className="ch-title">Complimentary Executive Chauffeur Service</div>
                          <div className="ch-desc">Maybach or Range Rover pickup from your Dubai hotel or residence.</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        id="chauffeur-check"
                        className="custom-checkbox"
                        checked={needChauffeur}
                        onChange={(e) => setNeedChauffeur(e.target.checked)}
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="attendee-name">Your Full Name</label>
                        <input
                          type="text"
                          id="attendee-name"
                          className="form-control"
                          placeholder="e.g. Richard Hargreaves"
                          value={attendeeName}
                          onChange={(e) => setAttendeeName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="attendee-phone">Mobile / WhatsApp Number</label>
                        <input
                          type="tel"
                          id="attendee-phone"
                          className="form-control"
                          placeholder="+971 50 123 4567"
                          value={attendeePhone}
                          onChange={(e) => setAttendeePhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-actions-bar">
                      <button type="submit" className="btn btn-gold btn-lg">
                        <span>Request VIP Viewing Confirmation</span>
                        <ArrowRight size={14} />
                      </button>
                      <a
                        href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waViewingMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                      >
                        <MessageCircle size={14} />
                        <span>Direct WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: FINANCIAL & ROI YIELD */}
          {activeTab === 'financial' && (
            <div className="modal-tab-content modal-animate-fade">
              <div className="modal-financial-grid">
                <div className="financial-card">
                  <div className="fin-card-eyebrow">
                    <TrendingUp size={14} className="gold-accent-icon" />
                    <span>Projected Yield Analysis</span>
                  </div>
                  <h4 className="fin-card-title">Cashflow &amp; Net Returns</h4>

                  <div className="fin-metric-row">
                    <span className="fin-label">Projected Net ROI</span>
                    <span className="fin-val font-bold text-gold">{estimatedRoiRate}% p.a.</span>
                  </div>

                  <div className="fin-metric-row">
                    <span className="fin-label">Est. Gross Annual Rental</span>
                    <span className="fin-val font-mono">{cur.symbol} {annualGrossRental.toLocaleString('en-US')}</span>
                  </div>

                  {serviceChargePerYear > 0 && (
                    <div className="fin-metric-row">
                      <span className="fin-label">Est. Annual Service Charges</span>
                      <span className="fin-val font-mono text-muted">- {cur.symbol} {serviceChargePerYear.toLocaleString('en-US')}</span>
                    </div>
                  )}

                  <div className="fin-metric-row total">
                    <span className="fin-label">Est. Net Annual Cashflow</span>
                    <span className="fin-val font-mono text-white">{cur.symbol} {annualNetRental.toLocaleString('en-US')}</span>
                  </div>

                  <div className="fin-note">
                    Calculated against prevailing DIFC/DLD median rental rates for prime residences in {property.community}.
                  </div>
                </div>

                <div className="financial-card">
                  <div className="fin-card-eyebrow">
                    <ShieldCheck size={14} className="gold-accent-icon" />
                    <span>Acquisition Structuring</span>
                  </div>
                  <h4 className="fin-card-title">Mortgage &amp; Conveyance</h4>

                  <div className="fin-metric-row">
                    <span className="fin-label">Down Payment (20%)</span>
                    <span className="fin-val font-mono">{cur.symbol} {downPayment.toLocaleString('en-US')}</span>
                  </div>

                  <div className="fin-metric-row">
                    <span className="fin-label">Mortgage Financing (80%)</span>
                    <span className="fin-val font-mono">{cur.symbol} {loanAmount.toLocaleString('en-US')}</span>
                  </div>

                  <div className="fin-metric-row">
                    <span className="fin-label">Est. Monthly Repayment (25 Yrs)</span>
                    <span className="fin-val font-mono text-gold">~{cur.symbol} {monthlyMortgage.toLocaleString('en-US')} / mo</span>
                  </div>

                  <div className="fin-metric-row">
                    <span className="fin-label">DLD Registration (4%)</span>
                    <span className="fin-val font-mono">{cur.symbol} {Math.round(convertedPrice * 0.04).toLocaleString('en-US')}</span>
                  </div>

                  <div className="golden-visa-callout">
                    <div className="gv-icon">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="gv-title">
                        {property.goldenVisa ? '10-Year UAE Golden Visa Included' : 'Standard Title Deed Registration'}
                      </div>
                      <div className="gv-text">
                        {property.goldenVisa
                          ? 'This property value exceeds AED 2,000,000, granting 10-year residency for buyer, spouse, children, and staff.'
                          : 'Property qualifies for standard residency under UAE real estate ownership laws.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Bar with Dedicated Listing Advisor */}
          <div className="modal-footer-advisor-bar">
            <div className="advisor-info-group">
              <div className="advisor-eyebrow">Senior Private Client Advisor</div>
              <div className="advisor-name">{property.advisor?.name} &mdash; {property.advisor?.role}</div>
              <div className="advisor-phone font-mono">{property.advisor?.phone}</div>
            </div>

            <div className="advisor-actions-group">
              <button
                type="button"
                className="btn btn-gold"
                onClick={() => setActiveTab('viewing')}
              >
                <span>Book VIP Viewing</span>
                <ArrowRight size={13} />
              </button>
              <a
                href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${encodeURIComponent(
                  `Hello ${property.advisor?.name || 'Nova Properties'}, I am inquiring about ${property.title} (${property.id}) listed at ${priceFormatted}. Please send the institutional investment dossier.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Advisor</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="High Resolution Photo Lightbox"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            className="lightbox-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImgIndex((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
            }}
            aria-label="Previous Photo"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-img-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={property.gallery[activeImgIndex]}
              alt={`${property.title} view ${activeImgIndex + 1}`}
            />
            <div className="lightbox-caption">
              <span>{property.title} &middot; Photo {activeImgIndex + 1} of {property.gallery.length}</span>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImgIndex((prev) => (prev + 1) % property.gallery.length);
            }}
            aria-label="Next Photo"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
