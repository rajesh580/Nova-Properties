import React from 'react';
import { X, Trash2, ArrowRight, MessageCircle, Heart } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearFavorites,
  onSelectProperty,
  currency
}) {
  if (!isOpen) return null;

  const cur = NOVA_DATA.currencies[currency] || NOVA_DATA.currencies.AED;

  const favoriteProperties = NOVA_DATA.properties.filter(p => favorites.includes(p.id));

  const totalPortfolioAED = favoriteProperties.reduce((acc, p) => acc + p.priceAED, 0);
  const totalConverted = Math.round(totalPortfolioAED * cur.rate);
  const totalFormatted = `${cur.symbol} ${totalConverted.toLocaleString('en-US')}`;

  const formatPrice = (priceAED, rentPeriod) => {
    const converted = Math.round(priceAED * cur.rate);
    const formatted = `${cur.symbol} ${converted.toLocaleString('en-US')}`;
    return rentPeriod ? `${formatted} ${rentPeriod}` : formatted;
  };

  const savedIdsString = favoriteProperties.map(p => `${p.id} (${p.title})`).join(', ');
  const waMsg = encodeURIComponent(
    `Hello Nova Properties VIP Desk, I have shortlisted ${favoriteProperties.length} properties for acquisition inquiry: ${savedIdsString}. Please provide full investment memorandums.`
  );

  return (
    <div className="drawer-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="favorites-drawer-panel" role="dialog" aria-modal="true" aria-label="Shortlisted Residences">
        {/* Header */}
        <div className="drawer-panel-header">
          <div className="drawer-title-group">
            <div className="drawer-eyebrow">
              <Heart size={14} className="gold-accent-icon filled" />
              <span>Private Shortlist</span>
            </div>
            <h3 className="drawer-heading">
              Saved Residences <span className="drawer-badge">{favoriteProperties.length}</span>
            </h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Shortlist">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-panel-body">
          {favoriteProperties.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-icon-wrap">
                <Heart size={32} strokeWidth={1.5} />
              </div>
              <h4 className="empty-title">Your Shortlist is Empty</h4>
              <p className="empty-desc">
                Click the heart icon on any residence to curate your private portfolio for institutional comparison and VIP viewings.
              </p>
              <button
                className="btn btn-outline"
                onClick={onClose}
              >
                Browse Residences
              </button>
            </div>
          ) : (
            <div className="favorites-list">
              {favoriteProperties.map((prop) => (
                <div className="favorite-card-item" key={prop.id}>
                  <div className="fav-item-thumb" onClick={() => { onSelectProperty(prop); onClose(); }}>
                    <img src={prop.image} alt={prop.title} />
                    <span className="fav-item-badge">{prop.badge}</span>
                  </div>
                  <div className="fav-item-details">
                    <div className="fav-item-loc">{prop.location}</div>
                    <h4 className="fav-item-title" onClick={() => { onSelectProperty(prop); onClose(); }}>
                      {prop.title}
                    </h4>
                    <div className="fav-item-price">
                      {formatPrice(prop.priceAED, prop.rentPeriod)}
                    </div>
                    <div className="fav-item-specs">
                      <span>{prop.beds > 0 ? `${prop.beds} Beds` : 'Commercial'}</span>
                      <span className="sep">&bull;</span>
                      <span>{prop.baths} Baths</span>
                      <span className="sep">&bull;</span>
                      <span>{prop.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                  <div className="fav-item-actions">
                    <button
                      className="fav-remove-btn"
                      onClick={() => onRemoveFavorite(prop.id)}
                      title="Remove from shortlist"
                      aria-label={`Remove ${prop.title} from shortlist`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProperties.length > 0 && (
          <div className="drawer-panel-footer">
            <div className="portfolio-total-row">
              <span className="total-label">Combined Portfolio Value</span>
              <span className="total-value">{totalFormatted}</span>
            </div>
            <div className="drawer-footer-actions">
              <a
                href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold drawer-cta-btn"
              >
                <MessageCircle size={15} />
                <span>Inquire on Shortlist</span>
              </a>
              <button
                className="btn btn-subtle-outline"
                onClick={onClearFavorites}
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
