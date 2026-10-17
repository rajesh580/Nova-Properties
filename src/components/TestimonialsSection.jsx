import React from 'react';
import { NOVA_DATA } from '../data/propertiesData';

export default function TestimonialsSection() {
  return (
    <section className="section-padding testimonials-section">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Client Voices</span>
            <h2 className="section-title">A Reputation Built on <em>Discretion</em></h2>
            <p className="section-desc">
              What private equity partners, portfolio trustees, and international families say about partnering with Nova Properties.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-card)', border: 'var(--border-hairline)', padding: '10px 20px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--gold-light)' }}>
              4.9
            </div>
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Google Verified Reviews
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials-grid">
          {NOVA_DATA.testimonials.map((item, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-stars">{'★'.repeat(item.stars)}</div>
              <div className="testi-deal-tag">{item.deal}</div>
              <blockquote className="testi-quote">&ldquo;{item.quote}&rdquo;</blockquote>
              <div className="testi-author-row">
                <div className="testi-avatar-circle">{item.avatar}</div>
                <div className="testi-author-info">
                  <div className="name">{item.author}</div>
                  <div className="designation">{item.designation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
