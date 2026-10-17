import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Car, HelpCircle } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function ContactPage() {
  const faqs = [
    {
      q: 'Where can I park when visiting the DIFC Gate Building headquarters?',
      a: 'Complimentary executive valet parking is available directly at the main entrance of The Gate Building, DIFC. Please inform the concierge you are visiting Nova Properties on Level 14.'
    },
    {
      q: 'Can our initial consultation be conducted under an NDA?',
      a: 'Absolutely. We routinely sign non-disclosure agreements prior to reviewing client portfolios, tax structures, or off-market acquisition briefs.'
    },
    {
      q: 'Can I purchase property or process my Golden Visa remotely?',
      a: 'Yes. Through Dubai REST, digital DLD notary services, and our dedicated DIFC legal conveyance desk, international buyers can complete transactions and residency applications from anywhere worldwide.'
    },
    {
      q: 'How fast will a senior partner contact me after submitting an enquiry?',
      a: 'Inquiries submitted through this portal or via WhatsApp are assigned to a qualified senior specialist within 2 business hours.'
    }
  ];

  return (
    <div className="contact-page-view">
      {/* 1. Subpage Hero Header */}
      <PageHeader
        eyebrow="VIP Client Concierge"
        title="Direct Advisory &"
        titleAccent="DIFC Headquarters"
        description="Connect directly with our partners at Level 14, The Gate Building, DIFC. Schedule private viewings, order comprehensive valuations, or register for off-market allocations."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact Us' }
        ]}
        meta={[
          'Level 14, The Gate Building, DIFC',
          'Phone: +971 4 879 9900',
          'WhatsApp: +971 50 123 4567',
          'Confidential Response within 2 Hours'
        ]}
      />

      {/* 2. Interactive Map & Contact Form Section */}
      <ContactSection />

      {/* 3. Executive Visit & FAQ Strip */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: 'var(--border-hairline)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">Client Services Guide</span>
              <h2 className="section-title">Visiting Our <em>DIFC Headquarters</em></h2>
              <p className="section-desc">
                Everything you need to know about scheduling appointments, parking, and confidentiality.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  padding: '28px',
                  background: 'var(--bg-card)',
                  border: 'var(--border-hairline)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <HelpCircle size={20} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--text-white)',
                    lineHeight: 1.3
                  }}>
                    {faq.q}
                  </h3>
                </div>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  lineHeight: 1.7,
                  paddingLeft: '32px'
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
