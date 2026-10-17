import React, { useState } from 'react';
import { ShieldCheck, Award, TrendingUp, Calculator, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function GoldenVisaChecker({ onShowNotice }) {
  const [budgetAED, setBudgetAED] = useState(3500000);
  const [taxJurisdiction, setTaxJurisdiction] = useState('uk');
  const [goal, setGoal] = useState('residency');

  // Calculation parameters
  const isEligible = budgetAED >= 2000000;
  const isMansionTier = budgetAED >= 10000000;

  // Tax rates for comparative savings
  const jurisdictionRates = {
    uk: { name: 'United Kingdom', capGainRate: 0.24, incomeRate: 0.45, propertyTax: 'Stamp Duty up to 15%' },
    eu: { name: 'European Union (Avg)', capGainRate: 0.26, incomeRate: 0.42, propertyTax: 'Annual Wealth Tax up to 2.5%' },
    us: { name: 'United States', capGainRate: 0.20, incomeRate: 0.37, propertyTax: 'Annual Property Tax 1.5% - 2.5%' },
    india: { name: 'India', capGainRate: 0.20, incomeRate: 0.39, propertyTax: 'Capital Gains + Surcharges' },
    other: { name: 'Other International', capGainRate: 0.22, incomeRate: 0.35, propertyTax: 'Standard Foreign Rates' }
  };

  const selectedJur = jurisdictionRates[taxJurisdiction] || jurisdictionRates.uk;

  // Assuming an 7.5% gross annual rental income on the property value
  const estimatedAnnualRental = budgetAED * 0.075;
  const estimatedTaxSaved = Math.round(estimatedAnnualRental * selectedJur.incomeRate);

  const formatAED = (val) => `AED ${val.toLocaleString('en-US')}`;

  const waMsg = encodeURIComponent(
    `Hello Nova Properties, I ran the Golden Visa Assessment with a budget of ${formatAED(budgetAED)} from ${selectedJur.name}. Please send the official DIFC residency advisory package.`
  );

  return (
    <section className="section-padding visa-checker-section" id="golden-visa">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Institutional Residency Advisory</span>
            <h2 className="section-title">Dubai Golden Visa &amp; <em>Tax Assessment</em></h2>
            <p className="section-desc">
              Real-time calculation of your eligibility for the UAE 10-Year Renewable Golden Residency and comparative sovereign tax advantages.
            </p>
          </div>
          <div className="visa-badge-cert">
            <ShieldCheck size={20} className="gold-accent-icon" />
            <div>
              <div className="cert-title">Cabinet Resolution No. 56</div>
              <div className="cert-sub">Official Real Estate Golden Residency Law</div>
            </div>
          </div>
        </div>

        <div className="visa-checker-grid">
          {/* Interactive Inputs */}
          <div className="visa-inputs-card">
            <h3 className="visa-card-title">1. Investment Profile Parameters</h3>

            {/* Slider: Property Value */}
            <div className="visa-input-group">
              <div className="visa-label-row">
                <span className="visa-label">Target Acquisition Value</span>
                <span className="visa-val-badge">{formatAED(budgetAED)}</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min="1000000"
                max="30000000"
                step="250000"
                value={budgetAED}
                onChange={(e) => setBudgetAED(Number(e.target.value))}
                aria-label="Acquisition Value Range"
              />
              <div className="slider-ticks">
                <span>AED 1M</span>
                <span className="threshold-marker">AED 2M (Golden Visa Minimum)</span>
                <span>AED 30M+</span>
              </div>
            </div>

            {/* Current Tax Jurisdiction */}
            <div className="visa-input-group">
              <label className="visa-label" htmlFor="jurisdiction-select">
                Current Tax &amp; Residency Jurisdiction
              </label>
              <select
                id="jurisdiction-select"
                className="visa-select"
                value={taxJurisdiction}
                onChange={(e) => setTaxJurisdiction(e.target.value)}
              >
                <option value="uk">United Kingdom (HMRC)</option>
                <option value="eu">European Union / Switzerland</option>
                <option value="us">United States / Canada</option>
                <option value="india">India</option>
                <option value="other">Other International / GCC</option>
              </select>
            </div>

            {/* Primary Objective */}
            <div className="visa-input-group">
              <span className="visa-label">Primary Acquisition Focus</span>
              <div className="visa-pills-row">
                <button
                  type="button"
                  className={`visa-pill-opt ${goal === 'residency' ? 'active' : ''}`}
                  onClick={() => setGoal('residency')}
                >
                  Family Residency &amp; Relocation
                </button>
                <button
                  type="button"
                  className={`visa-pill-opt ${goal === 'yield' ? 'active' : ''}`}
                  onClick={() => setGoal('yield')}
                >
                  Passive High Rental Yield
                </button>
                <button
                  type="button"
                  className={`visa-pill-opt ${goal === 'capital' ? 'active' : ''}`}
                  onClick={() => setGoal('capital')}
                >
                  Capital Preservation
                </button>
              </div>
            </div>
          </div>

          {/* Assessment Real-time Results */}
          <div className="visa-results-card">
            <div className="visa-result-status-header">
              <div className="status-indicator">
                {isEligible ? (
                  <div className="status-icon-wrap qualified">
                    <CheckCircle2 size={24} />
                  </div>
                ) : (
                  <div className="status-icon-wrap pending">
                    <Calculator size={24} />
                  </div>
                )}
                <div>
                  <div className="status-eyebrow">Residency Status</div>
                  <h4 className="status-heading">
                    {isEligible ? '10-Year UAE Golden Visa Qualified' : 'Standard 2-Year Property Residency'}
                  </h4>
                </div>
              </div>

              <div className="status-pill">
                {isEligible ? '100% Pre-Approved Criteria' : 'Requires AED 2M+ for 10-Yr'}
              </div>
            </div>

            <div className="visa-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Estimated Dubai Tax Liability</span>
                <span className="metric-value text-gold">0.0%</span>
                <span className="metric-sub">0% Capital Gains, 0% Income, 0% Wealth Tax</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Est. Annual Tax Advantage vs {selectedJur.name}</span>
                <span className="metric-value text-white">~{formatAED(estimatedTaxSaved)} / yr</span>
                <span className="metric-sub">Retained cashflow on ~7.5% rental yields</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Family Coverage Included</span>
                <span className="metric-value text-white">Spouse, Children &amp; Staff</span>
                <span className="metric-sub">No maximum child age limit for unmarried dependents</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Physical Stay Requirement</span>
                <span className="metric-value text-gold">0 Minimum Days</span>
                <span className="metric-sub">Zero restriction on time spent outside UAE</span>
              </div>
            </div>

            <div className="visa-action-row">
              <a
                href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ flex: 1 }}
              >
                <span>Request Golden Visa Protocol</span>
                <ArrowRight size={14} />
              </a>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => onShowNotice('UAE Golden Visa & Tax Strategy Guide')}
              >
                Download Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
