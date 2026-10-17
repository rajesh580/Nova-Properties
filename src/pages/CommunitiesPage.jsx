import React from 'react';
import PageHeader from '../components/PageHeader';
import CommunitiesSection from '../components/CommunitiesSection';
import GoldenVisaChecker from '../components/GoldenVisaChecker';
import { ArrowRight, Compass, TrendingUp, Building2, MapPin } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';
import { Link, useNavigate } from 'react-router-dom';

export default function CommunitiesPage({ onSelectCommunity }) {
  const navigate = useNavigate();

  const handleCommunityClick = (name) => {
    if (onSelectCommunity) {
      onSelectCommunity(name);
    }
    navigate('/residential');
  };

  const communityDetails = [
    {
      name: 'Downtown Dubai',
      character: 'Cosmopolitan Capital',
      yield: '6.8% Net',
      avgSqft: 'AED 2,850',
      vibe: 'Burj Khalifa views, world-class opera, luxury retail and dynamic urban energy.',
      suitedFor: 'Executives, international investors, pied-à-terre owners.'
    },
    {
      name: 'Palm Jumeirah',
      character: 'Global Beachfront Icon',
      yield: '7.2% Net',
      avgSqft: 'AED 3,600',
      vibe: 'Private beachfront villas, private boat docks, Atlantis The Royal, and Michelin-starred dining.',
      suitedFor: 'Ultra-high-net-worth families, lifestyle connoisseurs, holiday home investors.'
    },
    {
      name: 'DIFC',
      character: 'Financial & Cultural Powerhouse',
      yield: '7.5% Net',
      avgSqft: 'AED 2,450',
      vibe: 'Gate Village contemporary art galleries, executive boardrooms, and renowned fine dining.',
      suitedFor: 'Finance leaders, legal partners, tech executives, single professionals.'
    },
    {
      name: 'Dubai Hills Estate',
      character: 'The Green Heart of Dubai',
      yield: '6.4% Net',
      avgSqft: 'AED 1,950',
      vibe: 'Championship 18-hole golf course, King\'s College Hospital, elite private academies, and green parks.',
      suitedFor: 'Families, golf enthusiasts, long-term capital preservation portfolios.'
    },
    {
      name: 'Emirates Hills',
      character: 'Billionaires\' Gated Enclave',
      yield: '5.1% Net',
      avgSqft: 'AED 4,200',
      vibe: 'Sovereign-scale custom mansions overlooking Montgomerie Golf Club with unmatched security and privacy.',
      suitedFor: 'Family offices, diplomats, sovereign wealth representatives, privacy-first buyers.'
    },
    {
      name: 'Dubai Marina',
      character: 'Riviera Waterfront Living',
      yield: '7.8% Net',
      avgSqft: 'AED 1,820',
      vibe: 'Dynamic 7km palm-lined promenade, private yacht moorings, beachfront clubs, and sunset lounges.',
      suitedFor: 'Short-term holiday rental investors, yachting enthusiasts, young international professionals.'
    }
  ];

  return (
    <div className="communities-page-view">
      {/* 1. Subpage Hero Header */}
      <PageHeader
        eyebrow="Dubai Prime Neighborhoods"
        title="Iconic Dubai"
        titleAccent="Communities & Enclaves"
        description="Every Dubai community possesses its own architectural DNA, legal zoning, and rental yield dynamics. Discover our curated neighborhood profiles and market metrics to align with your lifestyle and portfolio goals."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Prime Communities' }
        ]}
        meta={[
          'Yield Analytics across 6 Prime Zones',
          'Freehold Foreign Ownership Status',
          'School & Infrastructure Heatmaps',
          'Capital Growth Trajectories'
        ]}
      />

      {/* 2. Interactive Communities Cards Grid */}
      <CommunitiesSection onSelectCommunity={handleCommunityClick} />

      {/* 3. In-Depth Community Intelligence Matrix */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: 'var(--border-hairline)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">Market Intelligence</span>
              <h2 className="section-title">Enclave Comparative <em>Performance Matrix</em></h2>
              <p className="section-desc">
                Granular pricing and yield benchmarks compiled by the Nova Analytics Desk for informed portfolio allocations.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '32px', overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.88rem',
              color: 'var(--text-primary)',
              minWidth: '700px'
            }}>
              <thead>
                <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid rgba(201, 168, 76, 0.3)' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>Community</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>Character</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>Avg Price / Sq.Ft</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>Est. Rental Yield</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>Recommended For</th>
                  <th style={{ padding: '16px 20px', textAlign: 'right', fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {communityDetails.map((c, idx) => (
                  <tr
                    key={c.name}
                    style={{
                      borderBottom: 'var(--border-hairline)',
                      background: idx % 2 === 0 ? 'rgba(15, 19, 32, 0.4)' : 'transparent',
                      transition: 'background var(--transition-fast)'
                    }}
                  >
                    <td style={{ padding: '18px 20px', fontWeight: 600, color: 'var(--text-white)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={14} style={{ color: 'var(--gold)' }} />
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '18px 20px', color: 'var(--text-secondary)' }}>{c.character}</td>
                    <td style={{ padding: '18px 20px', fontFamily: 'var(--font-mono)', color: 'var(--gold-light)' }}>{c.avgSqft}</td>
                    <td style={{ padding: '18px 20px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#3cd070' }}>{c.yield}</td>
                    <td style={{ padding: '18px 20px', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{c.suitedFor}</td>
                    <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleCommunityClick(c.name)}
                        className="btn btn-outline"
                        style={{ padding: '6px 14px', fontSize: '0.65rem' }}
                      >
                        <span>View Listings</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bespoke Location Match CTA */}
          <div style={{
            marginTop: '48px',
            padding: '36px',
            background: 'linear-gradient(135deg, rgba(20, 25, 43, 0.9) 0%, rgba(11, 14, 23, 0.95) 100%)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-white)', marginBottom: '8px' }}>
                Unsure Which Community Best Aligns With Your Goals?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '640px' }}>
                Our senior community advisors provide personalized private area tours, school catchment briefings, and rental yield forecasting.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-gold">
                <span>Book a Neighborhood Briefing</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Golden Visa & Tax Assessment Widget */}
      <GoldenVisaChecker />
    </div>
  );
}
