/**
 * Nova Properties - Application Controller
 * Handles Multi-Currency Conversion, Search & Filter Engine, Mortgage Calculator,
 * Property Detail Modal, Off-Plan Showcases, and Form Submissions.
 */

(function () {
  'use strict';

  // Application State
  const state = {
    currency: 'AED',
    unit: 'sqft',
    activeTab: 'buy',
    activeFilter: 'all',
    searchParams: {
      community: '',
      type: '',
      beds: '',
      priceRange: ''
    },
    calc: {
      price: 5500000,
      downPaymentPct: 20,
      loanYears: 25,
      interestRate: 4.25
    }
  };

  // DOM Elements cache
  let elements = {};

  function init() {
    cacheElements();
    bindEvents();
    renderAll();
    initScrollHeader();
  }

  function cacheElements() {
    elements = {
      header: document.querySelector('.site-header'),
      mobileMenuBtn: document.getElementById('mobile-menu-btn'),
      mobileDrawer: document.getElementById('mobile-drawer'),
      drawerCloseBtn: document.getElementById('drawer-close-btn'),
      currencySelect: document.getElementById('currency-select'),
      unitSelect: document.getElementById('unit-select'),
      searchTabs: document.querySelectorAll('.search-tab-btn'),
      searchForm: document.getElementById('search-engine-form'),
      searchCommunity: document.getElementById('search-community'),
      searchType: document.getElementById('search-type'),
      searchBeds: document.getElementById('search-beds'),
      searchBudget: document.getElementById('search-budget'),
      propertiesGrid: document.getElementById('properties-grid'),
      filterPills: document.querySelectorAll('.filter-pill'),
      offplanGrid: document.getElementById('offplan-grid'),
      communitiesGrid: document.getElementById('communities-grid'),
      teamGrid: document.getElementById('team-grid'),
      testimonialsGrid: document.getElementById('testimonials-grid'),
      calcPriceSlider: document.getElementById('calc-price-slider'),
      calcPriceDisplay: document.getElementById('calc-price-display'),
      calcDownSlider: document.getElementById('calc-down-slider'),
      calcDownDisplay: document.getElementById('calc-down-display'),
      calcTermSlider: document.getElementById('calc-term-slider'),
      calcTermDisplay: document.getElementById('calc-term-display'),
      calcRateSlider: document.getElementById('calc-rate-slider'),
      calcRateDisplay: document.getElementById('calc-rate-display'),
      calcMonthlyPayment: document.getElementById('calc-monthly-payment'),
      calcLoanAmount: document.getElementById('calc-loan-amount'),
      calcTotalDown: document.getElementById('calc-total-down'),
      calcTotalInterest: document.getElementById('calc-total-interest'),
      calcDldFee: document.getElementById('calc-dld-fee'),
      propertyModal: document.getElementById('property-modal'),
      modalContent: document.getElementById('modal-dynamic-content'),
      modalCloseBtn: document.getElementById('modal-close-btn'),
      contactForm: document.getElementById('vip-contact-form')
    };
  }

  // ── Currency & Measurement Formatting ──
  function formatMoney(amountAED, includeSymbol = true) {
    const cur = NOVA_DATA.currencies[state.currency] || NOVA_DATA.currencies.AED;
    const converted = amountAED * cur.rate;
    
    let formatted;
    if (converted >= 1000000) {
      formatted = (converted / 1000000).toFixed(2) + 'M';
    } else {
      formatted = Math.round(converted).toLocaleString('en-US');
    }

    if (!includeSymbol) return formatted;
    return `${cur.symbol} ${formatted}`;
  }

  function formatFullMoney(amountAED) {
    const cur = NOVA_DATA.currencies[state.currency] || NOVA_DATA.currencies.AED;
    const converted = Math.round(amountAED * cur.rate);
    return `${cur.symbol} ${converted.toLocaleString('en-US')}`;
  }

  function formatArea(sqft, sqm) {
    if (state.unit === 'sqm') {
      return `${sqm.toLocaleString('en-US')} m²`;
    }
    return `${sqft.toLocaleString('en-US')} sq. ft.`;
  }

  // ── Render Functions ──
  function renderAll() {
    renderProperties();
    renderOffPlan();
    renderCommunities();
    renderTeam();
    renderTestimonials();
    updateMortgageCalculator();
  }

  // 1. Featured Properties Grid
  function renderProperties() {
    if (!elements.propertiesGrid) return;

    let list = NOVA_DATA.properties;

    // Filter by Tab (buy vs rent)
    if (state.activeTab === 'buy') {
      list = list.filter(p => p.purpose === 'buy');
    } else if (state.activeTab === 'rent') {
      list = list.filter(p => p.purpose === 'rent');
    } else if (state.activeTab === 'commercial') {
      list = list.filter(p => p.type.toLowerCase() === 'commercial');
    }

    // Filter by Pill
    if (state.activeFilter !== 'all') {
      if (state.activeFilter === 'villa') {
        list = list.filter(p => p.type.toLowerCase().includes('villa'));
      } else if (state.activeFilter === 'penthouse') {
        list = list.filter(p => p.type.toLowerCase().includes('penthouse'));
      } else if (state.activeFilter === 'commercial') {
        list = list.filter(p => p.type.toLowerCase().includes('commercial'));
      } else {
        list = list.filter(p => p.community.toLowerCase().includes(state.activeFilter.toLowerCase()));
      }
    }

    // Search Params filter
    if (state.searchParams.community) {
      list = list.filter(p => p.community.toLowerCase() === state.searchParams.community.toLowerCase());
    }
    if (state.searchParams.type) {
      list = list.filter(p => p.type.toLowerCase() === state.searchParams.type.toLowerCase());
    }
    if (state.searchParams.beds) {
      const b = parseInt(state.searchParams.beds, 10);
      if (b === 5) {
        list = list.filter(p => p.beds >= 5);
      } else if (!isNaN(b)) {
        list = list.filter(p => p.beds === b);
      }
    }
    if (state.searchParams.priceRange) {
      const [min, max] = state.searchParams.priceRange.split('-').map(Number);
      if (min && max) {
        list = list.filter(p => p.priceAED >= min && p.priceAED <= max);
      } else if (min) {
        list = list.filter(p => p.priceAED >= min);
      }
    }

    if (list.length === 0) {
      elements.propertiesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border: var(--border-hairline);">
          <div style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--gold-light); margin-bottom: 8px;">No matching properties found</div>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Try adjusting your search criteria or reset filters to explore more luxury listings.</p>
          <button class="btn btn-outline" id="reset-filters-btn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.activeFilter = 'all';
          state.searchParams = { community: '', type: '', beds: '', priceRange: '' };
          if (elements.searchCommunity) elements.searchCommunity.value = '';
          if (elements.searchType) elements.searchType.value = '';
          if (elements.searchBeds) elements.searchBeds.value = '';
          if (elements.searchBudget) elements.searchBudget.value = '';
          elements.filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter === 'all'));
          renderProperties();
        });
      }
      return;
    }

    elements.propertiesGrid.innerHTML = list.map(prop => {
      const priceFormatted = formatFullMoney(prop.priceAED) + (prop.rentPeriod ? ` <span class="rent-period">${prop.rentPeriod}</span>` : '');
      const areaFormatted = formatArea(prop.sqft, prop.sqm);
      const waMsg = encodeURIComponent(`Hello Nova Properties, I am interested in viewing ${prop.title} (${prop.location}) ref ${prop.id}. Please send more information.`);

      return `
        <article class="property-card" data-id="${prop.id}">
          <div class="card-media">
            <img class="card-img" src="${prop.image}" alt="${prop.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'" />
            <div class="card-overlay-gradient"></div>
            <div class="card-badges">
              <span class="badge-tag">${prop.badge}</span>
              <span class="badge-status">${prop.status}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="card-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${prop.location}</span>
            </div>
            <h3 class="card-title">${prop.title}</h3>
            <div class="card-price">${priceFormatted}</div>
            
            <div class="card-specs">
              ${prop.beds > 0 ? `
              <div class="spec-item" title="Bedrooms">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22V12a1 1 0 011-1h16a1 1 0 011 1v10M3 22h18"/></svg>
                <span>${prop.beds} Beds</span>
              </div>` : `
              <div class="spec-item" title="Property Type">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                <span>Commercial</span>
              </div>`}
              <div class="spec-item" title="Bathrooms">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 12V6a2 2 0 012-2h12a2 2 0 012 2v6"/></svg>
                <span>${prop.baths} Baths</span>
              </div>
              <div class="spec-item" title="Built-up Area">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/></svg>
                <span>${areaFormatted}</span>
              </div>
            </div>

            <div class="card-actions">
              <button class="btn-card-primary view-details-btn" data-id="${prop.id}">View Details</button>
              <a href="https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}" target="_blank" rel="noopener" class="btn-card-wa">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind modal clicks
    elements.propertiesGrid.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openPropertyModal(id);
      });
    });
  }

  // 2. Off-Plan Projects Grid
  function renderOffPlan() {
    if (!elements.offplanGrid) return;

    elements.offplanGrid.innerHTML = NOVA_DATA.offPlanProjects.map(proj => {
      const startingPrice = formatMoney(proj.priceStartingAED);
      const waMsg = encodeURIComponent(`Hello Nova Properties, I would like to request the brochure and pre-launch prices for ${proj.title} by ${proj.developer} in ${proj.location}.`);

      return `
        <article class="offplan-card">
          <div class="offplan-media">
            <img src="${proj.image}" alt="${proj.title}" loading="lazy" />
            <div class="offplan-dev-badge">${proj.developer}</div>
          </div>
          <div class="offplan-body">
            <div class="offplan-top-info">
              <div>
                <h3 class="offplan-title">${proj.title}</h3>
                <div class="offplan-location">${proj.location}</div>
              </div>
              <span class="badge-tag">${proj.tag}</span>
            </div>

            <div class="offplan-specs-table">
              <div>
                <div class="spec-cell-label">Starting Price</div>
                <div class="spec-cell-val">${startingPrice}</div>
              </div>
              <div>
                <div class="spec-cell-label">Handover</div>
                <div class="spec-cell-val">${proj.handover}</div>
              </div>
              <div>
                <div class="spec-cell-label">Est. ROI</div>
                <div class="spec-cell-val">${proj.roi}</div>
              </div>
            </div>

            <p class="offplan-desc">${proj.description}</p>
            <div class="payment-plan-pill">
              <strong>Payment Plan:</strong> ${proj.paymentPlan}
            </div>

            <div class="offplan-ctas">
              <a href="https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}" target="_blank" rel="noopener" class="btn btn-gold" style="flex:1;">
                Register VIP Interest
              </a>
              <button class="btn btn-outline download-brochure-btn" data-project="${proj.title}">
                Brochure
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    elements.offplanGrid.querySelectorAll('.download-brochure-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.currentTarget.dataset.project;
        triggerBrochureDownload(title);
      });
    });
  }

  // 3. Communities Grid
  function renderCommunities() {
    if (!elements.communitiesGrid) return;

    elements.communitiesGrid.innerHTML = NOVA_DATA.communities.map(comm => {
      return `
        <div class="community-card" data-community="${comm.name}">
          <img src="${comm.image}" alt="${comm.name}" loading="lazy" />
          <div class="community-card-overlay">
            <span class="community-tagline">${comm.tagline}</span>
            <h3 class="community-name">${comm.name}</h3>
            <div class="community-meta">
              <span>${comm.propertiesCount}</span>
              <span>Avg: ${comm.avgPriceAED}</span>
              <span style="color:var(--gold-light);">${comm.yield}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    elements.communitiesGrid.querySelectorAll('.community-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const commName = e.currentTarget.dataset.community;
        state.searchParams.community = commName;
        state.activeFilter = commName;
        if (elements.searchCommunity) elements.searchCommunity.value = commName;
        document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
        renderProperties();
      });
    });
  }

  // 4. Senior Advisors / Team Grid
  function renderTeam() {
    if (!elements.teamGrid) return;

    elements.teamGrid.innerHTML = NOVA_DATA.team.map(member => {
      const waMsg = encodeURIComponent(`Hello ${member.name}, I would like to schedule a private real estate consultation with you via Nova Properties.`);
      return `
        <div class="advisor-card">
          <div class="advisor-photo-box">
            <img src="${member.image}" alt="${member.name}" loading="lazy" />
          </div>
          <div class="advisor-body">
            <h3 class="advisor-name">${member.name}</h3>
            <div class="advisor-title">${member.title}</div>
            <p class="advisor-specialty">${member.specialty}</p>
            <div class="advisor-contact-actions">
              <a href="tel:${member.phone.replace(/\s+/g, '')}" class="advisor-btn advisor-btn-call">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.05 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                <span>Call</span>
              </a>
              <a href="https://wa.me/${member.phone.replace(/[\s+]/g, '')}?text=${waMsg}" target="_blank" rel="noopener" class="advisor-btn advisor-btn-wa">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 5. Client Testimonials
  function renderTestimonials() {
    if (!elements.testimonialsGrid) return;

    elements.testimonialsGrid.innerHTML = NOVA_DATA.testimonials.map(item => {
      const starsHtml = '&#9733;'.repeat(item.stars);
      return `
        <div class="testi-card">
          <div class="testi-stars">${starsHtml}</div>
          <div class="testi-deal-tag">${item.deal}</div>
          <blockquote class="testi-quote">&ldquo;${item.quote}&rdquo;</blockquote>
          <div class="testi-author-row">
            <div class="testi-avatar-circle">${item.avatar}</div>
            <div class="testi-author-info">
              <div class="name">${item.author}</div>
              <div class="designation">${item.designation}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── Interactive Mortgage Calculator ──
  function updateMortgageCalculator() {
    if (!elements.calcPriceSlider) return;

    const price = state.calc.price;
    const downPct = state.calc.downPaymentPct;
    const years = state.calc.loanYears;
    const annualRate = state.calc.interestRate / 100;

    const downPayment = price * (downPct / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    // Monthly Payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    let monthlyPayment = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
    }

    const totalPaid = (monthlyPayment * totalMonths) + downPayment;
    const totalInterest = (monthlyPayment * totalMonths) - loanAmount;
    const dldFee = price * 0.04 + 4200; // 4% DLD + standard admin/trustee fee

    // Update Display elements
    if (elements.calcPriceDisplay) elements.calcPriceDisplay.textContent = formatFullMoney(price);
    if (elements.calcDownDisplay) elements.calcDownDisplay.textContent = `${downPct}% (${formatFullMoney(downPayment)})`;
    if (elements.calcTermDisplay) elements.calcTermDisplay.textContent = `${years} Years (${totalMonths} payments)`;
    if (elements.calcRateDisplay) elements.calcRateDisplay.textContent = `${state.calc.interestRate.toFixed(2)}% per annum`;

    if (elements.calcMonthlyPayment) elements.calcMonthlyPayment.textContent = formatFullMoney(monthlyPayment) + ' / mo';
    if (elements.calcLoanAmount) elements.calcLoanAmount.textContent = formatFullMoney(loanAmount);
    if (elements.calcTotalDown) elements.calcTotalDown.textContent = formatFullMoney(downPayment);
    if (elements.calcTotalInterest) elements.calcTotalInterest.textContent = formatFullMoney(totalInterest);
    if (elements.calcDldFee) elements.calcDldFee.textContent = formatFullMoney(dldFee);
  }

  // ── Property Modal ──
  function openPropertyModal(propertyId) {
    const prop = NOVA_DATA.properties.find(p => p.id === propertyId);
    if (!prop || !elements.propertyModal || !elements.modalContent) return;

    const priceFormatted = formatFullMoney(prop.priceAED) + (prop.rentPeriod ? ` ${prop.rentPeriod}` : '');
    const areaFormatted = formatArea(prop.sqft, prop.sqm);
    const waMsg = encodeURIComponent(`Hello ${prop.advisor.name}, I am inquiring about ${prop.title} (${prop.id}) listed at ${priceFormatted}. Please arrange a private VIP viewing.`);

    elements.modalContent.innerHTML = `
      <div style="padding: 36px 36px 20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-family:var(--font-display); font-size:0.68rem; font-weight:700; color:var(--gold); letter-spacing:0.18em; text-transform:uppercase;">
              ${prop.community} &middot; RERA Ref: ${prop.permitNumber}
            </div>
            <h2 style="font-family:var(--font-serif); font-size:2.2rem; color:var(--text-white); margin-top:4px;">
              ${prop.title}
            </h2>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-serif); font-size:2rem; font-weight:600; color:var(--gold-light);">
              ${priceFormatted}
            </div>
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">
              ${prop.goldenVisa ? '<span style="color:#25d366;">&check; UAE 10-Yr Golden Visa Eligible</span>' : 'Standard Title Deed'}
            </div>
          </div>
        </div>

        <!-- Gallery Showcase -->
        <div style="margin: 20px 0;">
          <div style="aspect-ratio:16/9; background:#0c0f18; border:var(--border-hairline); overflow:hidden; margin-bottom:12px;" id="modal-main-gallery">
            <img id="modal-active-img" src="${prop.gallery[0]}" style="width:100%; height:100%; object-fit:cover;" alt="${prop.title}" />
          </div>
          <div style="display:grid; grid-template-columns: repeat(${prop.gallery.length}, 1fr); gap:10px;">
            ${prop.gallery.map((img, i) => `
              <div class="modal-thumb ${i === 0 ? 'active' : ''}" data-src="${img}" style="aspect-ratio:16/10; border:var(--border-subtle); cursor:pointer; overflow:hidden;">
                <img src="${img}" style="width:100%; height:100%; object-fit:cover;" />
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Specs row -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:14px; background:var(--bg-surface); border:var(--border-hairline); padding:18px 24px; margin:24px 0;">
          <div>
            <div style="font-family:var(--font-display); font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.14em;">Bedrooms</div>
            <div style="font-family:var(--font-mono); font-size:1.1rem; color:var(--text-white);">${prop.beds > 0 ? prop.beds + ' Beds' : 'Office Suite'}</div>
          </div>
          <div>
            <div style="font-family:var(--font-display); font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.14em;">Bathrooms</div>
            <div style="font-family:var(--font-mono); font-size:1.1rem; color:var(--text-white);">${prop.baths} Baths</div>
          </div>
          <div>
            <div style="font-family:var(--font-display); font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.14em;">Built-up Area</div>
            <div style="font-family:var(--font-mono); font-size:1.1rem; color:var(--text-white);">${areaFormatted}</div>
          </div>
          <div>
            <div style="font-family:var(--font-display); font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.14em;">Status</div>
            <div style="font-family:var(--font-mono); font-size:1.1rem; color:var(--gold-light);">${prop.status}</div>
          </div>
        </div>

        <!-- Description -->
        <div style="margin-bottom:28px;">
          <h4 style="font-family:var(--font-display); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.16em; color:var(--gold); margin-bottom:8px;">Property Overview</h4>
          <p style="color:var(--text-secondary); line-height:1.75; font-size:0.95rem;">${prop.description}</p>
        </div>

        <!-- Amenities -->
        <div style="margin-bottom:32px;">
          <h4 style="font-family:var(--font-display); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.16em; color:var(--gold); margin-bottom:12px;">Features &amp; Exclusive Amenities</h4>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
            ${prop.amenities.map(am => `
              <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-white);">
                <span style="color:var(--gold); font-size:1rem;">&bull;</span>
                <span>${am}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Assigned Advisor & VIP Booking Action -->
        <div style="background:var(--bg-surface); border:var(--border-hairline); padding:24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="font-family:var(--font-display); font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.16em;">Dedicated Listing Advisor</div>
            <div style="font-family:var(--font-serif); font-size:1.35rem; color:var(--text-white); font-weight:500;">${prop.advisor.name} &mdash; ${prop.advisor.role}</div>
            <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--gold-light);">${prop.advisor.phone}</div>
          </div>
          <div style="display:flex; gap:12px;">
            <a href="https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}" target="_blank" rel="noopener" class="btn btn-gold">
              Book Private Viewing
            </a>
            <button class="btn btn-outline" id="modal-download-specs-btn" data-title="${prop.title}">
              Save Specification
            </button>
          </div>
        </div>
      </div>
    `;

    // Thumbnails click
    const activeImg = document.getElementById('modal-active-img');
    elements.modalContent.querySelectorAll('.modal-thumb').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        elements.modalContent.querySelectorAll('.modal-thumb').forEach(t => t.style.borderColor = 'rgba(255,255,255,0.08)');
        e.currentTarget.style.borderColor = 'var(--gold)';
        if (activeImg) activeImg.src = e.currentTarget.dataset.src;
      });
    });

    const specBtn = document.getElementById('modal-download-specs-btn');
    if (specBtn) {
      specBtn.addEventListener('click', () => {
        triggerBrochureDownload(prop.title);
      });
    }

    elements.propertyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePropertyModal() {
    if (!elements.propertyModal) return;
    elements.propertyModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Brochure Download Simulation ──
  function triggerBrochureDownload(projectName) {
    const notice = document.createElement('div');
    notice.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 3000;
      background: #0f1322;
      border: 1px solid var(--gold);
      color: var(--text-white);
      padding: 16px 24px;
      border-radius: 4px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      font-family: var(--font-display);
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: fadeIn 0.3s ease;
    `;
    notice.innerHTML = `
      <span style="color:var(--gold); font-size:1.2rem;">&#10003;</span>
      <div>
        <strong>VIP Brochure Prepared</strong><br/>
        <span style="color:var(--text-secondary); font-size:0.75rem;">Official investor package for ${projectName} is ready.</span>
      </div>
    `;
    document.body.appendChild(notice);
    setTimeout(() => {
      notice.style.opacity = '0';
      notice.style.transition = 'opacity 0.4s ease';
      setTimeout(() => notice.remove(), 400);
    }, 4000);
  }

  // ── Event Bindings ──
  function bindEvents() {
    // Currency Selector
    if (elements.currencySelect) {
      elements.currencySelect.addEventListener('change', (e) => {
        state.currency = e.target.value;
        renderAll();
      });
    }

    // Unit Selector (sqft vs sqm)
    if (elements.unitSelect) {
      elements.unitSelect.addEventListener('change', (e) => {
        state.unit = e.target.value;
        renderProperties();
      });
    }

    // Mobile Menu Drawer
    if (elements.mobileMenuBtn && elements.mobileDrawer) {
      elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }
    if (elements.drawerCloseBtn && elements.mobileDrawer) {
      elements.drawerCloseBtn.addEventListener('click', () => {
        elements.mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close drawer when link clicked
    document.querySelectorAll('.drawer-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (elements.mobileDrawer) elements.mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Search Tabs (Buy / Rent / Off-Plan / Commercial)
    elements.searchTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        elements.searchTabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.activeTab = e.currentTarget.dataset.tab;

        if (state.activeTab === 'offplan') {
          document.getElementById('off-plan').scrollIntoView({ behavior: 'smooth' });
        } else {
          renderProperties();
        }
      });
    });

    // Search Form Submit
    if (elements.searchForm) {
      elements.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        state.searchParams.community = elements.searchCommunity ? elements.searchCommunity.value : '';
        state.searchParams.type = elements.searchType ? elements.searchType.value : '';
        state.searchParams.beds = elements.searchBeds ? elements.searchBeds.value : '';
        state.searchParams.priceRange = elements.searchBudget ? elements.searchBudget.value : '';
        document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
        renderProperties();
      });
    }

    // Filter Pills
    elements.filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        elements.filterPills.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.activeFilter = e.currentTarget.dataset.filter;
        renderProperties();
      });
    });

    // Modal Close
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', closePropertyModal);
    }
    if (elements.propertyModal) {
      elements.propertyModal.addEventListener('click', (e) => {
        if (e.target === elements.propertyModal) closePropertyModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePropertyModal();
    });

    // Mortgage Calculator Sliders
    if (elements.calcPriceSlider) {
      elements.calcPriceSlider.addEventListener('input', (e) => {
        state.calc.price = Number(e.target.value);
        updateMortgageCalculator();
      });
    }
    if (elements.calcDownSlider) {
      elements.calcDownSlider.addEventListener('input', (e) => {
        state.calc.downPaymentPct = Number(e.target.value);
        updateMortgageCalculator();
      });
    }
    if (elements.calcTermSlider) {
      elements.calcTermSlider.addEventListener('input', (e) => {
        state.calc.loanYears = Number(e.target.value);
        updateMortgageCalculator();
      });
    }
    if (elements.calcRateSlider) {
      elements.calcRateSlider.addEventListener('input', (e) => {
        state.calc.interestRate = Number(e.target.value);
        updateMortgageCalculator();
      });
    }

    // VIP Contact Form
    if (elements.contactForm) {
      elements.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = elements.contactForm.querySelector('button[type="submit"]');
        const origText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<span style="color:#25d366;">&#10003; VIP Consultation Scheduled</span>`;
        btn.style.borderColor = '#25d366';

        // Also offer instant WhatsApp handover
        const fd = new FormData(elements.contactForm);
        const name = fd.get('name') || 'Client';
        const phone = fd.get('phone') || '';
        const interest = fd.get('propertyType') || 'Dubai Property';
        const waText = encodeURIComponent(`Hello Nova Properties, I am ${name} (${phone}). I have just submitted a consultation request regarding ${interest}. Please connect me with a senior advisor.`);

        setTimeout(() => {
          btn.innerHTML = `<span>Direct to Advisor WhatsApp &rarr;</span>`;
          btn.disabled = false;
          btn.onclick = () => {
            window.open(`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waText}`, '_blank');
          };
        }, 2000);
      });
    }
  }

  // ── Scroll Header Styling ──
  function initScrollHeader() {
    window.addEventListener('scroll', () => {
      if (!elements.header) return;
      if (window.scrollY > 40) {
        elements.header.classList.add('scrolled');
      } else {
        elements.header.classList.remove('scrolled');
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
