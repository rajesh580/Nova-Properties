import React from 'react';
import PageHeader from '../components/PageHeader';
import AdvisorsSection from '../components/AdvisorsSection';
import { ShieldCheck, Lock, Award, Briefcase, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';
import { Link } from 'react-router-dom';

export default function AdvisorsPage() {
  return (
    <div className="advisors-page-view">
      {/* 1. Subpage Hero Header */}
      <PageHeader
        eyebrow="Private Client Advisory Board"
        title="Veteran Dubai"
        titleAccent="Real Estate Strategists"
        description="Our partners are not merely transactional agents; they are seasoned asset managers and portfolio advisors trusted by global family offices, sovereign funds, and private collectors."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Senior Advisors' }
        ]}
        meta={[
          '100% RERA Certified Practitioners',
          'Discreet Off-Market Representation',
          'Direct Developer Board Access',
          'Multi-Jurisdictional Tax & Conveyance'
        ]}
      />

      {/* 2. Advisors Directory Grid */}
      <AdvisorsSection />

      {/* 3. Advisory Standards & Code of Conduct */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: 'var(--border-hairline)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">Our Fiduciary Standard</span>
              <h2 className="section-title">The Nova <em>Advisory Protocol</em></h2>
              <p className="section-desc">
                How our senior advisors safeguard client confidentiality and extract maximum value across every transaction.
              </p>
            </div>
          </div>

          <div className="why-grid" style={{ marginTop: '32px' }}>
            <div className="why-card">
              <div className="why-num">
                <Lock size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Strict Confidentiality (NDAs)</h3>
              <p className="why-text">
                Every member of our Private Client desk operates under strict non-disclosure obligations. Your identity, acquisition brief, and financial structuring remain confidential.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <Award size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Direct C-Suite Developer Access</h3>
              <p className="why-text">
                Our advisors maintain direct personal ties with C-suite executives at Emaar, Nakheel, and Meraas, ensuring priority unit release allocations and custom payment terms.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <Briefcase size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Comprehensive Legal Conveyance</h3>
              <p className="why-text">
                From drafting specialized Form F contracts to escrow reconciliation and Dubai Land Department trustee transfer, our advisors supervise each step with zero ambiguity.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <ShieldCheck size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Post-Handover Asset Care</h3>
              <p className="why-text">
                We manage snagging inspections, tenant screening, high-yield leasing, and Golden Visa application procedures, ensuring your Dubai asset functions seamlessly from day one.
              </p>
            </div>
          </div>

          {/* Book Consultation Banner */}
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
                Require Dedicated Advisory for an Institutional Brief?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '640px' }}>
                Schedule a confidential in-person consultation at our DIFC Gate Building headquarters or request a secure virtual briefing.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-gold">
                <span>Book Advisor Consultation</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={`tel:${NOVA_DATA.brand.mobileClean}`}
                className="btn btn-outline"
              >
                <Phone size={14} />
                <span>Call VIP Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
