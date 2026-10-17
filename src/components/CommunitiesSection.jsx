import React from 'react';
import { NOVA_DATA } from '../data/propertiesData';

export default function CommunitiesSection({ onSelectCommunity }) {
  const handleClick = (communityName) => {
    onSelectCommunity(communityName);
    const target = document.getElementById('listings');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding" id="communities">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Neighborhood Guide</span>
            <h2 className="section-title">Explore <em>Prime Communities</em></h2>
            <p className="section-desc">
              Each enclave has its own identity, rhythm, and financial yield profile. Discover where ultra-wealth chooses to live and invest in Dubai.
            </p>
          </div>
          <a href="#listings" className="btn btn-outline">
            <span>View All Enclaves</span>
          </a>
        </div>

        <div className="communities-grid">
          {NOVA_DATA.communities.map((comm) => (
            <div
              className="community-card"
              key={comm.name}
              onClick={() => handleClick(comm.name)}
            >
              <img src={comm.image} alt={comm.name} loading="lazy" />
              <div className="community-card-overlay">
                <span className="community-tagline">{comm.tagline}</span>
                <h3 className="community-name">{comm.name}</h3>
                <div className="community-meta">
                  <span>{comm.propertiesCount}</span>
                  <span>Avg: {comm.avgPriceAED}</span>
                  <span style={{ color: 'var(--gold-light)' }}>{comm.yield}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
