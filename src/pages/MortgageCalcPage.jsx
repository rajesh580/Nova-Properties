import React from 'react';
import PageHeader from '../components/PageHeader';
import MortgageCalculator from '../components/MortgageCalculator';
import { Landmark, Percent, Calculator, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';
import { Link } from 'react-router-dom';

export default function MortgageCalcPage({ currency }) {
  return (
    <div className="mortgage-calc-page-view">
      {/* 1. Subpage Hero Header */}
      <PageHeader
        eyebrow="Financial Structuring & Advisory"
        title="Mortgage & Investment"
        titleAccent="ROI Calculator"
        description="Calculate estimated debt servicing, mandatory DLD 4% acquisition charges, and trustee fees. Plan your capital deployment with current UAE Central Bank mortgage regulations."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Mortgage & ROI Calculator' }
        ]}
        meta={[
          'UAE Central Bank LTV Guidelines',
          'Expats & Non-Resident Financing',
          'DLD 4% Statutory Fee Breakdown',
          'Institutional Private Banking Desk'
        ]}
      />

      {/* 2. Interactive Calculator Component */}
      <MortgageCalculator currency={currency} />

      {/* 3. UAE Financing Regulations & Statutory Costs Guide */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: 'var(--border-hairline)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">Regulatory Framework</span>
              <h2 className="section-title">UAE Central Bank <em>Financing Standards</em></h2>
              <p className="section-desc">
                Key statutory limits and closing fees applicable to expatriates, UAE residents, and non-resident international buyers.
              </p>
            </div>
          </div>

          <div className="why-grid" style={{ marginTop: '32px' }}>
            <div className="why-card">
              <div className="why-num">
                <Landmark size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Expatriate Resident LTV</h3>
              <p className="why-text">
                For first-time UAE resident buyers purchasing properties under AED 5,000,000, the maximum loan-to-value (LTV) is 80% (20% minimum down payment). For properties above AED 5M, the maximum LTV is 70% (30% down payment).
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <Percent size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Non-Resident International Buyers</h3>
              <p className="why-text">
                Non-residents can finance Dubai properties through partner private banks (Emirates NBD, FAB, HSBC UAE) with loan-to-values typically ranging between 50% and 60% based on verified overseas assets and proof of income.
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <FileCheck size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Mandatory Closing Costs</h3>
              <p className="why-text">
                Statutory closing fees include: 4% Dubai Land Department (DLD) transfer fee, AED 4,000 Trustee registration fee (+VAT), 0.25% mortgage registration fee to DLD, and an independent property valuation fee (~AED 3,000).
              </p>
            </div>

            <div className="why-card">
              <div className="why-num">
                <ShieldCheck size={26} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="why-title">Debt Burden Ratio (DBR)</h3>
              <p className="why-text">
                Under UAE Central Bank regulations, total monthly debt servicing across all liabilities (credit cards, personal loans, mortgages) must not exceed 50% of the applicant's verified monthly income.
              </p>
            </div>
          </div>

          {/* Capital Desk Pre-Approval CTA */}
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
                Require an In-Principle Mortgage Pre-Approval?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '640px' }}>
                Nova Capital partners with the UAE's premier mortgage desks to secure competitive fixed-rate terms (starting from 3.99%) and expedited pre-approval in 72 hours.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-gold">
                <span>Request Financing Pre-Approval</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=Hello%20Nova%20Properties,%20I%20would%20like%20to%20discuss%20mortgage%20pre-approval%20rates.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <span>WhatsApp Capital Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
