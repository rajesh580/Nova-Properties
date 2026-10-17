import React from 'react';
import PageHeader from '../components/PageHeader';
import OffPlanSection from '../components/OffPlanSection';
import DeveloperAlliance from '../components/DeveloperAlliance';
import { ArrowRight, Download, ShieldCheck, TrendingUp, Layers, CheckCircle } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';
import { Link } from 'react-router-dom';

export default function OffPlanPage({
  currency,
  onShowNotice
}) {
  return (
    <div className="off-plan-page-view">
      {/* 1. Subpage Hero Header */}
      <PageHeader
        eyebrow="Direct Master Developer Allocations"
        title="Prime Dubai"
        titleAccent="Off-Plan Portfolio"
        description="Secure pre-launch VIP units directly through Nova's master developer alliances. Capitalize on milestone payment plans, phased appreciation, and comprehensive Dubai Land Department escrow account protection."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Off-Plan Developments' }
        ]}
        meta={[
          'Zero Commission to Buyers',
          'Tier 1 Pre-Launch Inventory',
          'DLD Escrow Account Guaranteed',
          'Flexible Milestone Payment Plans'
        ]}
      />

      {/* 2. Developer Alliance Ribbon */}
      <DeveloperAlliance />

      {/* 3. Featured Off-Plan Projects */}
      <OffPlanSection
        currency={currency}
        onShowNotice={onShowNotice}
      />

      {/* 4. Off-Plan Investment Fundamentals */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: 'var(--border-hairline)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">Strategic Wealth Building</span>
              <h2 className="section-title">Why Global Capital Allocates to <em>Dubai Off-Plan</em></h2>
              <p className="section-desc">
                From progressive staggered milestone installments to statutory escrow safeguards, off-plan acquisitions offer unparalleled risk-adjusted yields.
              </p>
            </div>
          </div>

          <div className="why-grid" style={{ marginTop: '32px' }}>
            <div className="why-card">
              <div className="why-num">
                <TrendingUp size={28} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Phased Capital Uplift</h3>
              <p className="why-text">
                Historically, prime Dubai off-plan projects experience 20% to 35% capital appreciation from initial foundation release to keys-in-hand handover.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <Layers size={28} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Staggered Cashflow</h3>
              <p className="why-text">
                Pay in manageable tranches linked to verifiable construction milestones (e.g. 10% on booking, 10% per semester, 40% on completion or post-handover).
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <ShieldCheck size={28} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">DLD Escrow Law No. 8</h3>
              <p className="why-text">
                Every developer is legally bound by Dubai Land Department regulations: 100% of buyer payments reside in a regulated trust account, disbursed solely upon audited construction stages.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <CheckCircle size={28} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Golden Visa Qualification</h3>
              <p className="why-text">
                Off-plan acquisitions valued at AED 2M or higher qualify for the 10-year Golden Visa once the initial deposit threshold is confirmed by the land registrar.
              </p>
            </div>
          </div>

          {/* Developer Release Enquiry CTA */}
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
                Join the Nova Priority Allocation Registry
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '640px' }}>
                Receive VIP pre-launch brochures, floorplans, and inventory allocations 48 hours before public launch events from Emaar, Meraas, and Nakheel.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-gold">
                <span>Join VIP Pre-Launch List</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=Hello%20Nova%20Properties,%20please%20add%20me%20to%20the%20VIP%20Off-Plan%20Allocation%20Registry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <span>WhatsApp Off-Plan Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
