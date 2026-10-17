import React from 'react';
import { NOVA_DATA } from '../data/propertiesData';

export default function OffPlanSection({ currency, onShowNotice }) {
  const formatStartingPrice = (priceAED) => {
    const cur = NOVA_DATA.currencies[currency] || NOVA_DATA.currencies.AED;
    const converted = priceAED * cur.rate;
    if (converted >= 1000000) {
      return `${cur.symbol} ${(converted / 1000000).toFixed(2)}M`;
    }
    return `${cur.symbol} ${Math.round(converted).toLocaleString('en-US')}`;
  };

  return (
    <section className="section-padding offplan-section" id="off-plan">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Developer Direct Allocations</span>
            <h2 className="section-title">Exclusive <em>Off-Plan Opportunities</em></h2>
            <p className="section-desc">
              Pre-launch access to Dubai's most anticipated architectural marvels &mdash; secured at entry valuations with customized post-handover payment schedules.
            </p>
          </div>
          <a href="#contact" className="btn btn-gold">
            <span>Request VIP Pre-Launch List</span>
          </a>
        </div>

        <div className="offplan-grid">
          {NOVA_DATA.offPlanProjects.map((proj) => {
            const waMsg = encodeURIComponent(
              `Hello Nova Properties, I would like to request the brochure and pre-launch prices for ${proj.title} by ${proj.developer} in ${proj.location}.`
            );

            return (
              <article className="offplan-card" key={proj.id}>
                <div className="offplan-media">
                  <img src={proj.image} alt={proj.title} loading="lazy" />
                  <div className="offplan-dev-badge">{proj.developer}</div>
                </div>
                <div className="offplan-body">
                  <div className="offplan-top-info">
                    <div>
                      <h3 className="offplan-title">{proj.title}</h3>
                      <div className="offplan-location">{proj.location}</div>
                    </div>
                    <span className="badge-tag">{proj.tag}</span>
                  </div>

                  <div className="offplan-specs-table">
                    <div>
                      <div className="spec-cell-label">Starting Price</div>
                      <div className="spec-cell-val">{formatStartingPrice(proj.priceStartingAED)}</div>
                    </div>
                    <div>
                      <div className="spec-cell-label">Handover</div>
                      <div className="spec-cell-val">{proj.handover}</div>
                    </div>
                    <div>
                      <div className="spec-cell-label">Est. ROI</div>
                      <div className="spec-cell-val">{proj.roi}</div>
                    </div>
                  </div>

                  <p className="offplan-desc">{proj.description}</p>
                  <div className="payment-plan-pill">
                    <strong>Payment Plan:</strong> {proj.paymentPlan}
                  </div>

                  <div className="offplan-ctas">
                    <a
                      href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold"
                      style={{ flex: 1 }}
                    >
                      Register VIP Interest
                    </a>
                    <button
                      className="btn btn-outline"
                      onClick={() => onShowNotice(proj.title)}
                    >
                      Brochure
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
