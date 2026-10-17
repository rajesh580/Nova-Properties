import React from 'react';
import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';
import WhyNova from '../components/WhyNova';
import { Award, ShieldCheck, Landmark, CheckCircle, ArrowRight, Users } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const milestones = [
    {
      year: '2012',
      title: 'Founding at Level 14, DIFC Gate',
      desc: 'Established by James Whitfield following a distinguished decade in London prime property, bringing institutional transparency and discretion to the burgeoning Dubai luxury scene.'
    },
    {
      year: '2016',
      title: 'Tier-1 Master Developer Alliances',
      desc: 'Formed direct executive allocations with Emaar, Nakheel, and Meraas, securing early VIP access for international private banking clients.'
    },
    {
      year: '2019',
      title: 'Ultra-Prime Waterfront Division',
      desc: 'Created the dedicated Palm Jumeirah and Emirates Hills advisory desk, handling confidential transactions exceeding AED 50M each.'
    },
    {
      year: '2022',
      title: 'In-House Golden Visa & Legal Desk',
      desc: 'Integrated full legal conveyance, escrow oversight, and UAE 10-Year Golden Visa government liaison under one roof.'
    },
    {
      year: '2024',
      title: 'AED 4.8B+ Benchmark Reached',
      desc: 'Surpassed 4.8 Billion Dirhams in transacted volume across luxury residential sales, off-plan projects, and prime commercial assets.'
    }
  ];

  return (
    <div className="about-page-view">
      {/* 1. Subpage Hero Header */}
      <PageHeader
        eyebrow="Our Heritage & Architecture"
        title="Founded on Integrity."
        titleAccent="Built on Results."
        description="Operating from Level 14 in the iconic DIFC Gate Building since 2012, Nova Properties delivers institutional precision, discretion, and access to Dubai's most coveted residential assets."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About Us' }
        ]}
        meta={[
          'DIFC Registered Advisory',
          'RERA Licensed Brokerage #28491',
          '30+ Senior Advisors',
          '14 Global Languages'
        ]}
      />

      {/* 2. Core Story & Heritage */}
      <AboutSection />

      {/* 3. The 5 Pillars of The Nova Advantage */}
      <WhyNova />

      {/* 4. Chronology of Milestones */}
      <section className="section-padding" style={{ background: 'var(--bg-canvas)', borderTop: 'var(--border-hairline)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">A Decade of Growth</span>
              <h2 className="section-title">Chronology of <em>Milestones</em></h2>
              <p className="section-desc">
                From a boutique DIFC advisory to a multi-billion dirham luxury authority, our trajectory reflects Dubai's unstoppable evolution.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {milestones.map((m) => (
              <div
                key={m.year}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(80px, 110px) 1fr',
                  gap: '24px',
                  padding: '24px',
                  background: 'var(--bg-card)',
                  border: 'var(--border-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  alignItems: 'baseline'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                  fontWeight: 600
                }}>
                  {m.year}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    color: 'var(--text-white)',
                    marginBottom: '8px'
                  }}>
                    {m.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7
                  }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Connect to Advisors CTA */}
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
                Meet the Leadership & Senior Advisory Board
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '640px' }}>
                Our partners combine over 75 years of collective real estate experience across London, Geneva, Singapore, and Dubai.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/advisors" className="btn btn-gold">
                <span>View Senior Advisors</span>
                <Users size={14} />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <span>Contact Headquarters</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
