import React from 'react';

export default function AboutSection() {
  return (
    <section className="section-padding" id="about" style={{ background: 'var(--bg-surface)', borderTop: 'var(--border-hairline)', borderBottom: 'var(--border-hairline)' }}>
      <div className="container">
        <div className="about-grid">
          <div className="about-visual-column">
            <div className="about-main-img-box">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Nova Properties DIFC Headquarters"
                loading="lazy"
              />
            </div>
            <div className="about-floating-stat">
              <div className="num">30+</div>
              <div className="lbl">Senior Advisors</div>
            </div>
          </div>

          <div className="about-text-column">
            <span className="eyebrow">Our Heritage &middot; Founded 2012</span>
            <h2 className="section-title">Founded on Integrity.<br /><em>Built on Results.</em></h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '18px' }}>
              Nova Properties was founded in 2012 by James Whitfield, a distinguished veteran of London's prime residential market who relocated to Dubai and recognised the Emirate's extraordinary trajectory. Operating from Level 14 in the iconic DIFC Gate Building, Nova has grown into one of the region's most reputable luxury real estate advisory firms.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '18px' }}>
              With dual locations in DIFC and Downtown Dubai, our team of 30+ specialists represents 14 languages across six continents. Whether you are purchasing your first Dubai pied-à-terre or expanding a multi-hundred-million-dirham institutional fund, we provide bespoke, discreet representation.
            </p>

            <div className="about-facts-grid">
              <div className="fact-item">
                <div className="num">2012</div>
                <div className="lbl">Year Established</div>
              </div>
              <div className="fact-item">
                <div className="num">14</div>
                <div className="lbl">Languages Spoken</div>
              </div>
              <div className="fact-item">
                <div className="num">2</div>
                <div className="lbl">DIFC &amp; Downtown Hubs</div>
              </div>
              <div className="fact-item">
                <div className="num">AED 2.4B+</div>
                <div className="lbl">Cumulative Volume</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
