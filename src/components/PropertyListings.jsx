import React, { useState, useMemo } from 'react';
import {
  MapPin, Bed, Bath, Maximize, MessageCircle, Heart, Scale,
  Search, SlidersHorizontal, LayoutGrid, List, Check, X, ArrowRight, ShieldCheck
} from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function PropertyListings({
  currency,
  unit,
  activeTab,
  searchParams,
  onOpenModal,
  onResetFilters,
  favorites = [],
  onToggleFavorite,
  comparedIds = [],
  onToggleCompare
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'beds-desc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const formatPrice = (priceAED, rentPeriod) => {
    const cur = NOVA_DATA.currencies[currency] || NOVA_DATA.currencies.AED;
    const converted = Math.round(priceAED * cur.rate);
    const formatted = `${cur.symbol} ${converted.toLocaleString('en-US')}`;
    return rentPeriod ? `${formatted} ${rentPeriod}` : formatted;
  };

  const formatArea = (sqft, sqm) => {
    if (unit === 'sqm') {
      return `${sqm.toLocaleString('en-US')} m²`;
    }
    return `${sqft.toLocaleString('en-US')} sq. ft.`;
  };

  // Filter listings
  const filteredList = useMemo(() => {
    let list = [...NOVA_DATA.properties];

    if (activeTab === 'buy') {
      list = list.filter(p => p.purpose === 'buy');
    } else if (activeTab === 'rent') {
      list = list.filter(p => p.purpose === 'rent');
    } else if (activeTab === 'commercial') {
      list = list.filter(p => p.type.toLowerCase() === 'commercial');
    }

    if (activeFilter !== 'all') {
      if (activeFilter === 'villa') {
        list = list.filter(p => p.type.toLowerCase().includes('villa'));
      } else if (activeFilter === 'penthouse') {
        list = list.filter(p => p.type.toLowerCase().includes('penthouse'));
      } else if (activeFilter === 'commercial') {
        list = list.filter(p => p.type.toLowerCase().includes('commercial'));
      } else {
        list = list.filter(p => p.community.toLowerCase().includes(activeFilter.toLowerCase()));
      }
    }

    if (searchParams?.community) {
      list = list.filter(p => p.community.toLowerCase() === searchParams.community.toLowerCase());
    }
    if (searchParams?.type) {
      list = list.filter(p => p.type.toLowerCase() === searchParams.type.toLowerCase());
    }
    if (searchParams?.beds) {
      const b = parseInt(searchParams.beds, 10);
      if (b === 5) {
        list = list.filter(p => p.beds >= 5);
      } else if (!isNaN(b)) {
        list = list.filter(p => p.beds === b);
      }
    }
    if (searchParams?.budget) {
      const [min, max] = searchParams.budget.split('-').map(Number);
      if (min && max) {
        list = list.filter(p => p.priceAED >= min && p.priceAED <= max);
      } else if (min) {
        list = list.filter(p => p.priceAED >= min);
      }
    }

    // Keyword search filter (title, description, community, location, amenities)
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.community.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.amenities && p.amenities.some(a => a.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceAED - b.priceAED);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceAED - a.priceAED);
    } else if (sortBy === 'area-desc') {
      list.sort((a, b) => b.sqft - a.sqft);
    } else if (sortBy === 'beds-desc') {
      list.sort((a, b) => b.beds - a.beds);
    } else {
      // 'featured'
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [activeTab, activeFilter, searchParams, keyword, sortBy]);

  const hasActiveFilters =
    activeFilter !== 'all' ||
    keyword.trim() !== '' ||
    Boolean(searchParams?.community || searchParams?.type || searchParams?.beds || searchParams?.budget);

  return (
    <section className="section-padding listings-section" id="listings">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Exclusive Portfolio</span>
            <h2 className="section-title">Curated <em>Luxury Listings</em></h2>
            <p className="section-desc">
              Handpicked across Palm Jumeirah, Downtown Dubai, and Emirates Hills &mdash; vetted for architectural rarity and sustained capital appreciation.
            </p>
          </div>

          <div className="filter-pills" role="tablist" aria-label="Property Categories">
            <button
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Properties
            </button>
            <button
              className={`filter-pill ${activeFilter === 'Palm Jumeirah' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Palm Jumeirah')}
            >
              Palm Jumeirah
            </button>
            <button
              className={`filter-pill ${activeFilter === 'Downtown Dubai' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Downtown Dubai')}
            >
              Downtown Dubai
            </button>
            <button
              className={`filter-pill ${activeFilter === 'Emirates Hills' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Emirates Hills')}
            >
              Emirates Hills
            </button>
            <button
              className={`filter-pill ${activeFilter === 'villa' ? 'active' : ''}`}
              onClick={() => setActiveFilter('villa')}
            >
              Luxury Villas
            </button>
            <button
              className={`filter-pill ${activeFilter === 'penthouse' ? 'active' : ''}`}
              onClick={() => setActiveFilter('penthouse')}
            >
              Sky Penthouses
            </button>
            <button
              className={`filter-pill ${activeFilter === 'commercial' ? 'active' : ''}`}
              onClick={() => setActiveFilter('commercial')}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Dynamic Controls Bar: Live Search, Sort, View Toggle */}
        <div className="listings-control-bar">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="listings-search-field"
              placeholder="Filter by keyword (e.g. pool, penthouse, sea view, DIFC)..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              aria-label="Filter properties by keyword"
            />
            {keyword && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setKeyword('')}
                aria-label="Clear keyword search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="control-bar-right">
            {/* Sort Selector */}
            <div className="sort-group">
              <span className="sort-label">Sort By:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort listings by"
              >
                <option value="featured">Featured &amp; Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest First</option>
                <option value="beds-desc">Bedrooms: Most to Least</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle" role="group" aria-label="View layout switch">
              <button
                type="button"
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
                aria-label="Switch to Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Executive List View"
                aria-label="Switch to Executive List View"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Metadata & Reset Trigger */}
        <div className="listings-meta-strip">
          <div className="results-count">
            Showing <strong>{filteredList.length}</strong> verified luxury {filteredList.length === 1 ? 'residence' : 'residences'}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="reset-filters-chip"
              onClick={() => {
                setActiveFilter('all');
                setKeyword('');
                setSortBy('featured');
                onResetFilters?.();
              }}
            >
              <span>Reset Filters</span>
              <X size={12} />
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredList.length === 0 ? (
          <div className="listings-empty-card">
            <div className="empty-title">No matching residences found</div>
            <p className="empty-text">
              Try adjusting your search criteria, widening the budget range, or clearing current keywords.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setActiveFilter('all');
                setKeyword('');
                setSortBy('featured');
                onResetFilters?.();
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="properties-grid">
            {filteredList.map((prop) => {
              const isFav = favorites.includes(prop.id);
              const isComp = comparedIds.includes(prop.id);
              const waMsg = encodeURIComponent(
                `Hello Nova Properties, I am interested in viewing ${prop.title} (${prop.location}) ref ${prop.id}. Please send more information.`
              );

              return (
                <article className="property-card" key={prop.id}>
                  <div className="card-media">
                    <img
                      className="card-img"
                      src={prop.image}
                      alt={prop.title}
                      loading="lazy"
                    />
                    <div className="card-overlay-gradient"></div>

                    {/* Badges */}
                    <div className="card-badges">
                      <span className="badge-tag">{prop.badge}</span>
                      <span className="badge-status">{prop.status}</span>
                    </div>

                    {/* Card Floating Quick Actions (Heart & Compare) */}
                    <div className="card-quick-actions">
                      {onToggleFavorite && (
                        <button
                          type="button"
                          className={`card-tool-btn fav-btn ${isFav ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(prop.id);
                          }}
                          title={isFav ? 'Remove from shortlist' : 'Add to shortlist'}
                          aria-label={`Shortlist ${prop.title}`}
                        >
                          <Heart size={14} className={isFav ? 'filled-heart' : ''} />
                        </button>
                      )}

                      {onToggleCompare && (
                        <button
                          type="button"
                          className={`card-tool-btn compare-btn ${isComp ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(prop.id);
                          }}
                          title={isComp ? 'Remove from comparison' : 'Compare property'}
                          aria-label={`Compare ${prop.title}`}
                        >
                          <Scale size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-location">
                      <MapPin size={12} />
                      <span>{prop.location}</span>
                    </div>

                    <h3
                      className="card-title"
                      onClick={() => onOpenModal(prop)}
                      role="button"
                      tabIndex={0}
                    >
                      {prop.title}
                    </h3>

                    <div className="card-price-row">
                      <div className="card-price">
                        {formatPrice(prop.priceAED, prop.rentPeriod)}
                      </div>
                      {prop.goldenVisa && (
                        <span className="card-gv-pill" title="Qualifies for UAE 10-Yr Golden Visa">
                          <ShieldCheck size={11} />
                          <span>Golden Visa</span>
                        </span>
                      )}
                    </div>

                    <div className="card-specs">
                      {prop.beds > 0 ? (
                        <div className="spec-item" title="Bedrooms">
                          <Bed size={14} style={{ color: 'var(--gold)' }} />
                          <span>{prop.beds} Beds</span>
                        </div>
                      ) : (
                        <div className="spec-item" title="Property Type">
                          <span>Commercial Suite</span>
                        </div>
                      )}
                      <div className="spec-item" title="Bathrooms">
                        <Bath size={14} style={{ color: 'var(--gold)' }} />
                        <span>{prop.baths} Baths</span>
                      </div>
                      <div className="spec-item" title="Built-up Area">
                        <Maximize size={14} style={{ color: 'var(--gold)' }} />
                        <span>{formatArea(prop.sqft, prop.sqm)}</span>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        type="button"
                        className="btn-card-primary"
                        onClick={() => onOpenModal(prop)}
                      >
                        View Details
                      </button>
                      <a
                        href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-card-wa"
                      >
                        <MessageCircle size={13} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* EDITORIAL EXECUTIVE LIST VIEW */
          <div className="properties-list-editorial">
            {filteredList.map((prop) => {
              const isFav = favorites.includes(prop.id);
              const isComp = comparedIds.includes(prop.id);
              const waMsg = encodeURIComponent(
                `Hello Nova Properties, I am interested in viewing ${prop.title} (${prop.location}) ref ${prop.id}. Please send more information.`
              );

              return (
                <article className="property-editorial-card" key={prop.id}>
                  <div
                    className="editorial-media"
                    onClick={() => onOpenModal(prop)}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={prop.image} alt={prop.title} loading="lazy" />
                    <div className="editorial-badge-group">
                      <span className="badge-tag">{prop.badge}</span>
                      <span className="badge-status">{prop.status}</span>
                    </div>
                  </div>

                  <div className="editorial-content">
                    <div className="editorial-top-row">
                      <div className="editorial-loc-title">
                        <div className="card-location">
                          <MapPin size={12} />
                          <span>{prop.location} &middot; Ref: {prop.id}</span>
                        </div>
                        <h3
                          className="editorial-title"
                          onClick={() => onOpenModal(prop)}
                        >
                          {prop.title}
                        </h3>
                      </div>

                      <div className="editorial-price-box">
                        <div className="card-price">{formatPrice(prop.priceAED, prop.rentPeriod)}</div>
                        {prop.goldenVisa && (
                          <div className="visa-text-tag">
                            <ShieldCheck size={12} className="inline-icon" />
                            <span>10-Yr Golden Visa Eligible</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="editorial-desc">{prop.description}</p>

                    <div className="editorial-specs-row">
                      <div className="ed-spec">
                        <span className="ed-label">Type</span>
                        <span className="ed-val">{prop.type}</span>
                      </div>
                      <div className="ed-spec">
                        <span className="ed-label">Bedrooms</span>
                        <span className="ed-val">{prop.beds > 0 ? `${prop.beds} Beds` : 'Commercial'}</span>
                      </div>
                      <div className="ed-spec">
                        <span className="ed-label">Bathrooms</span>
                        <span className="ed-val">{prop.baths} Baths</span>
                      </div>
                      <div className="ed-spec">
                        <span className="ed-label">Built-Up Area</span>
                        <span className="ed-val">{formatArea(prop.sqft, prop.sqm)}</span>
                      </div>
                      {prop.roiRate && (
                        <div className="ed-spec">
                          <span className="ed-label">Projected Yield</span>
                          <span className="ed-val text-gold">{prop.roiRate}% Net</span>
                        </div>
                      )}
                    </div>

                    <div className="editorial-bottom-row">
                      <div className="editorial-amenities-pills">
                        {prop.amenities.slice(0, 3).map((am, i) => (
                          <span key={i} className="am-pill">&bull; {am}</span>
                        ))}
                        {prop.amenities.length > 3 && (
                          <span className="am-pill text-muted">+{prop.amenities.length - 3} more</span>
                        )}
                      </div>

                      <div className="editorial-actions">
                        {onToggleFavorite && (
                          <button
                            type="button"
                            className={`tool-btn-icon ${isFav ? 'active' : ''}`}
                            onClick={() => onToggleFavorite(prop.id)}
                            title={isFav ? 'Remove from shortlist' : 'Add to shortlist'}
                          >
                            <Heart size={15} className={isFav ? 'filled-heart' : ''} />
                          </button>
                        )}

                        {onToggleCompare && (
                          <button
                            type="button"
                            className={`tool-btn-icon ${isComp ? 'active' : ''}`}
                            onClick={() => onToggleCompare(prop.id)}
                            title={isComp ? 'Remove from comparison' : 'Compare property'}
                          >
                            <Scale size={15} />
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn-card-primary"
                          onClick={() => onOpenModal(prop)}
                        >
                          View Dossier
                        </button>
                        <a
                          href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-wa"
                        >
                          <MessageCircle size={13} />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
