import React, { useState } from 'react';
import { Calculator, TrendingUp, ShieldCheck, ArrowRight, DollarSign, Percent, FileText } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function MortgageCalculator({ currency }) {
  const [activeMode, setActiveMode] = useState('mortgage'); // 'mortgage' | 'investment'

  // Mortgage parameters
  const [price, setPrice] = useState(5500000);
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(4.25);

  // Investment parameters
  const [rentalYieldPct, setRentalYieldPct] = useState(7.5);
  const [appreciationPct, setAppreciationPct] = useState(6.0);
  const [serviceChargePerSqft, setServiceChargePerSqft] = useState(18);

  const cur = NOVA_DATA.currencies[currency] || NOVA_DATA.currencies.AED;

  const formatMoney = (valAED) => {
    const converted = Math.round(valAED * cur.rate);
    return `${cur.symbol} ${converted.toLocaleString('en-US')}`;
  };

  // Preset quick selectors
  const presets = [
    { label: 'JBR Beachfront', price: 1850000 },
    { label: 'Opera Grand Suite', price: 3200000 },
    { label: 'Fairway Mansion', price: 12800000 },
    { label: 'Royal Atlantis Penthouse', price: 18500000 },
    { label: 'Emirates Hills Trophy', price: 42000000 }
  ];

  // Mortgage calculations
  const downPayment = price * (downPct / 100);
  const loanAmount = price - downPayment;
  const annualRate = rate / 100;
  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;

  let monthlyPayment = 0;
  if (loanAmount > 0 && monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = (loanAmount * (monthlyRate * factor)) / (factor - 1);
  }

  const totalInterest = monthlyPayment * totalMonths - loanAmount;
  const dldFee = price * 0.04; // 4% DLD fee
  const dldAdmin = 4200;
  const mortgageRegFee = loanAmount * 0.0025 + 290; // 0.25% mortgage registration + admin

  // Investment calculations
  const estimatedSqft = Math.round(price / 2200); // estimated sqft based on AED 2,200/sqft average
  const annualGrossRental = price * (rentalYieldPct / 100);
  const annualServiceChargeTotal = estimatedSqft * serviceChargePerSqft;
  const annualNetRental = annualGrossRental - annualServiceChargeTotal;
  const netYieldPct = ((annualNetRental / price) * 100).toFixed(2);

  // 5-year capital appreciation projection (compound)
  const fiveYearValue = Math.round(price * Math.pow(1 + appreciationPct / 100, 5));
  const fiveYearRentalCumulative = annualNetRental * 5;
  const totalFiveYearReturn = fiveYearValue - price + fiveYearRentalCumulative;

  const isGoldenVisaEligible = price >= 2000000;

  return (
    <section className="section-padding calc-section" id="calculator">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Financial &amp; Quantitative Advisory</span>
            <h2 className="section-title">Dubai <em>Mortgage &amp; ROI Suite</em></h2>
            <p className="section-desc">
              Model monthly bank lending repayments, Dubai Land Department acquisition duties, and 5-year capital growth forecasts in real-time.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="calc-mode-switcher" role="tablist">
            <button
              type="button"
              className={`calc-mode-btn ${activeMode === 'mortgage' ? 'active' : ''}`}
              onClick={() => setActiveMode('mortgage')}
            >
              <Calculator size={15} />
              <span>Mortgage Repayment</span>
            </button>
            <button
              type="button"
              className={`calc-mode-btn ${activeMode === 'investment' ? 'active' : ''}`}
              onClick={() => setActiveMode('investment')}
            >
              <TrendingUp size={15} />
              <span>ROI &amp; Capital Growth</span>
            </button>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="calc-presets-bar">
          <span className="preset-label">Dubai Benchmark Presets:</span>
          <div className="preset-chips">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={`preset-chip ${price === preset.price ? 'active' : ''}`}
                onClick={() => setPrice(preset.price)}
              >
                <span>{preset.label}</span>
                <span className="chip-price">({formatMoney(preset.price)})</span>
              </button>
            ))}
          </div>
        </div>

        {activeMode === 'mortgage' ? (
          /* MODE 1: MORTGAGE REPAYMENT */
          <div className="calc-layout modal-animate-fade">
            {/* Interactive Sliders */}
            <div className="calc-inputs">
              {/* Property Value */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <span className="calc-label">Property Value</span>
                  <span className="calc-val-display">{formatMoney(price)}</span>
                </div>
                <input
                  type="range"
                  className="calc-slider"
                  min="1000000"
                  max="50000000"
                  step="250000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  aria-label="Property Price Slider"
                />
                <div className="slider-ticks">
                  <span>AED 1M</span>
                  <span>AED 25M</span>
                  <span>AED 50M</span>
                </div>
              </div>

              {/* Down Payment Percentage */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <span className="calc-label">Down Payment (%)</span>
                  <span className="calc-val-display">
                    {downPct}% ({formatMoney(downPayment)})
                  </span>
                </div>
                <input
                  type="range"
                  className="calc-slider"
                  min="10"
                  max="50"
                  step="5"
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                  aria-label="Down Payment Slider"
                />
                <div className="slider-ticks">
                  <span>10% (Min Expat)</span>
                  <span>20% (Standard)</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Loan Period */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <span className="calc-label">Loan Term</span>
                  <span className="calc-val-display">{years} Years ({totalMonths} payments)</span>
                </div>
                <input
                  type="range"
                  className="calc-slider"
                  min="5"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  aria-label="Loan Term Slider"
                />
                <div className="slider-ticks">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years (Max)</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <span className="calc-label">Interest Rate (% p.a.)</span>
                  <span className="calc-val-display">{rate.toFixed(2)}% Fixed/Variable</span>
                </div>
                <input
                  type="range"
                  className="calc-slider"
                  min="2.5"
                  max="8.0"
                  step="0.25"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  aria-label="Interest Rate Slider"
                />
                <div className="slider-ticks">
                  <span>2.5%</span>
                  <span>4.25% (Prime)</span>
                  <span>8.0%</span>
                </div>
              </div>
            </div>

            {/* Repayment Summary Card */}
            <div className="calc-results">
              <div className="calc-result-header">
                <span className="calc-result-tag">Estimated Monthly Payment</span>
                <div className="calc-monthly-val">
                  {formatMoney(monthlyPayment)}
                  <span className="calc-period">/ month</span>
                </div>
                <span className="calc-notice">
                  Based on {years}-year amortization at {rate}% fixed
                </span>
              </div>

              <div className="calc-breakdown">
                <div className="calc-row">
                  <span className="calc-row-label">Down Payment Required</span>
                  <span className="calc-row-val">{formatMoney(downPayment)}</span>
                </div>
                <div className="calc-row">
                  <span className="calc-row-label">Total Loan Financed</span>
                  <span className="calc-row-val">{formatMoney(loanAmount)}</span>
                </div>
                <div className="calc-row">
                  <span className="calc-row-label">Estimated Total Interest</span>
                  <span className="calc-row-val">{formatMoney(totalInterest)}</span>
                </div>
                <div className="calc-row">
                  <span className="calc-row-label">Dubai Land Dept. (DLD 4% + Admin)</span>
                  <span className="calc-row-val">{formatMoney(dldFee + dldAdmin)}</span>
                </div>
                <div className="calc-row">
                  <span className="calc-row-label">Mortgage Registration (0.25%)</span>
                  <span className="calc-row-val">{formatMoney(mortgageRegFee)}</span>
                </div>
              </div>

              <div className="calc-visa-badge">
                <ShieldCheck size={16} />
                <span>
                  {isGoldenVisaEligible
                    ? 'Acquisition Value Qualifies for 10-Year UAE Golden Visa'
                    : 'Values under AED 2M qualify for standard 2-year property visa'}
                </span>
              </div>

              <a
                href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${encodeURIComponent(
                  `Hello Nova Properties, I am inquiring about pre-approval for a property valued at ${formatMoney(price)} with ${formatMoney(downPayment)} down payment.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold calc-cta"
              >
                <span>Request Bank Pre-Approval</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ) : (
          /* MODE 2: INVESTMENT ROI & CAPITAL GROWTH */
          <div className="calc-layout modal-animate-fade">
            {/* Interactive Sliders for Investment */}
            <div className="calc-inputs">
              {/* Property Value */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <span className="calc-label">Acquisition Capital</span>
                  <span className="calc-val-display">{formatMoney(price)}</span>
                </div>
                <input
                  type="range"
                  className="calc-slider"
                  min="1000000"
                  max="50000000"
                  step="250000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  aria-label="Acquisition Capital Slider"
                />
              </div>

              {/* Expected Gross Rental Yield */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <span className="calc-label">Projected Gross Rental Yield</span>
                  <span className="calc-val-display">{rentalYieldPct.toFixed(1)}% p.a.</span>
                </div>
                <input
                  type="range"
                  className="calc-slider"
                  min="4.0"
                  max="11.0"
                  step="0.2"
                  value={rentalYieldPct}
                  onChange={(e) => setRentalYieldPct(Number(e.target.value))}
                  aria-label="Gross Rental Yield Slider"
                />
                <div className="slider-ticks">
                  <span>4.0% (Trophy Villa)</span>
                  <span>7.5% (Prime Downtown)</span>
                  <span>11.0% (Holiday Home JBR)</span>
                </div>
              </div>

              {/* Annual Capital Appreciation */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <span className="calc-label">Annual Capital Appreciation Forecast</span>
                  <span className="calc-val-display">{appreciationPct.toFixed(1)}% p.a.</span>
                </div>
                <input
                  type="range"
                  className="calc-slider"
                  min="2.0"
                  max="12.0"
                  step="0.5"
                  value={appreciationPct}
                  onChange={(e) => setAppreciationPct(Number(e.target.value))}
                  aria-label="Capital Appreciation Slider"
                />
                <div className="slider-ticks">
                  <span>2.0% (Conservative)</span>
                  <span>6.0% (Historical Avg)</span>
                  <span>12.0% (Off-plan Launch)</span>
                </div>
              </div>

              {/* Estimated Service Charges */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <span className="calc-label">Service Charges (AED / sq. ft.)</span>
                  <span className="calc-val-display">AED {serviceChargePerSqft} / sq. ft.</span>
                </div>
                <input
                  type="range"
                  className="calc-slider"
                  min="5"
                  max="35"
                  step="1"
                  value={serviceChargePerSqft}
                  onChange={(e) => setServiceChargePerSqft(Number(e.target.value))}
                  aria-label="Service Charge Slider"
                />
                <div className="slider-ticks">
                  <span>AED 5 (Villas)</span>
                  <span>AED 18 (Standard Prime)</span>
                  <span>AED 35 (Luxury Penthouses)</span>
                </div>
              </div>
            </div>

            {/* ROI Results Card */}
            <div className="calc-results">
              <div className="calc-result-header">
                <span className="calc-result-tag">5-Year Projected Total Gain</span>
                <div className="calc-monthly-val text-gold">
                  +{formatMoney(totalFiveYearReturn)}
                </div>
                <span className="calc-notice">
                  Combined net rental cashflow + {appreciationPct}% annual asset appreciation
                </span>
              </div>

              <div className="calc-breakdown">
                <div className="calc-row">
                  <span className="calc-row-label">Gross Annual Rental Income</span>
                  <span className="calc-row-val">{formatMoney(annualGrossRental)} / yr</span>
                </div>
                <div className="calc-row">
                  <span className="calc-row-label">Est. Annual Service Charges</span>
                  <span className="calc-row-val text-muted">- {formatMoney(annualServiceChargeTotal)} / yr</span>
                </div>
                <div className="calc-row highlight">
                  <span className="calc-row-label">Net Annual Rental Cashflow</span>
                  <span className="calc-row-val font-bold text-white">{formatMoney(annualNetRental)} / yr</span>
                </div>
                <div className="calc-row">
                  <span className="calc-row-label">Net Rental Yield</span>
                  <span className="calc-row-val font-bold text-gold">{netYieldPct}% Net</span>
                </div>
                <div className="calc-row">
                  <span className="calc-row-label">Projected Asset Value (Year 5)</span>
                  <span className="calc-row-val font-mono">{formatMoney(fiveYearValue)}</span>
                </div>
              </div>

              <div className="calc-visa-badge">
                <ShieldCheck size={16} />
                <span>Zero Personal Income Tax &amp; Zero Capital Gains Tax in Dubai</span>
              </div>

              <a
                href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${encodeURIComponent(
                  `Hello Nova Properties, I modeled an investment of ${formatMoney(price)} with a projected 5-year return of ${formatMoney(totalFiveYearReturn)}. Please send high-yield off-plan or ready portfolio allocations.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold calc-cta"
              >
                <span>Request High-Yield Portfolio</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
