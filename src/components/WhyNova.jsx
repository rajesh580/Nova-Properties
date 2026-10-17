import React from 'react';
import { ShieldCheck, Clock, Lock, Award } from 'lucide-react';

export default function WhyNova() {
  const advantages = [
    {
      icon: ShieldCheck,
      title: 'RERA Certified Agency',
      desc: 'Every advisor is registered with RERA Dubai. Transparent escrow accounting, compliant Form A/B agreements, and strict legal protection on every Dirham.'
    },
    {
      icon: Clock,
      title: '12+ Years Market Longevity',
      desc: 'Established in DIFC in 2012 by Mayfair veteran James Whitfield. We have guided clients through multiple economic cycles with battle-tested prudence.'
    },
    {
      icon: Lock,
      title: 'Exclusive Pocket Inventory',
      desc: 'Over 40% of our ultra-prime transactions occur off-market. Gain access to private family office listings never advertised on public portals.'
    },
    {
      icon: Award,
      title: 'Golden Visa & Concierge',
      desc: 'End-to-end relocation management: UAE 10-year Golden Visa issuance via Dubai Land Department, bank account opening, and luxury asset management.'
    }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Institutional Prestige</span>
            <h2 className="section-title">The Nova Properties <em>Distinction</em></h2>
            <p className="section-desc">
              In a market crowded with transactional brokers, Nova Properties delivers private banking-grade fiduciary advisory.
            </p>
          </div>
        </div>

        <div className="advantages-grid">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <div className="advantage-card" key={i}>
                <div className="adv-icon-wrap">
                  <Icon size={24} style={{ color: 'var(--gold)' }} />
                </div>
                <h3 className="adv-title">{adv.title}</h3>
                <p className="adv-desc">{adv.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
