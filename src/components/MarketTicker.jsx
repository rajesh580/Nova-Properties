import React from 'react';

export default function MarketTicker() {
  const tickerItems = [
    { tag: 'Dubai 2025/2026', text: '+17.4% Prime Capital Appreciation YoY' },
    { tag: 'Yield Benchmark', text: '6.8% – 8.5% Net Average Rental Yields' },
    { tag: 'UAE Residency', text: '10-Year Golden Visa with AED 2M Investment' },
    { tag: 'Tax Efficiency', text: '0% Capital Gains & 0% Property Tax' },
    { tag: 'Nova Track Record', text: 'AED 2.4B+ Verified Lifetime Transactions' },
    { tag: 'Global Advisory', text: '30+ Multilingual Advisors · 14 Languages' }
  ];

  return (
    <section className="market-ticker-strip" aria-label="Live Market Statistics">
      <div className="ticker-track">
        {/* Render twice for continuous loop */}
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <React.Fragment key={index}>
            <div className="ticker-item">
              <span className="ticker-tag">{item.tag}</span>
              {item.text}
            </div>
            <div className="ticker-dot"></div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
