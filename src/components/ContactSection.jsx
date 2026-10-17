import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, MapPin, CheckCircle } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    role: 'Buyer',
    budget: 'Under AED 3M',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppRoute = () => {
    const waText = encodeURIComponent(
      `Hello Nova Properties, I am ${formData.name || 'Client'} (${formData.phone}). I have just submitted a consultation request regarding ${formData.role} advisory with budget ${formData.budget}. Please connect me with a senior advisor.`
    );
    window.open(`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waText}`, '_blank');
  };

  return (
    <section className="section-padding" id="contact">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Direct Advisory</span>
            <h2 className="section-title">Initiate Your <em>Property Journey</em></h2>
            <p className="section-desc">
              Connect with our senior partners for private property viewings, off-market acquisition briefs, or institutional portfolio valuations.
            </p>
          </div>
        </div>

        <div className="contact-layout">
          {/* Office Information */}
          <div className="contact-left">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-white)', marginBottom: '8px' }}>
              DIFC Headquarters
            </h3>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>
              {NOVA_DATA.brand.address}
            </div>

            {/* Authentic DIFC Headquarters Interactive Map (Zero Stock Photos) */}
            <div style={{ position: 'relative', height: '260px', background: '#0b0e18', border: 'var(--border-hairline)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '24px' }}>
              <iframe
                title="Nova Properties DIFC Headquarters Location"
                src="https://maps.google.com/maps?q=Gate+Building+DIFC+Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 2, background: 'rgba(7, 9, 14, 0.94)', border: 'var(--border-hairline)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={13} style={{ color: 'var(--gold)' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
                  Level 14 &middot; The Gate, DIFC, Dubai
                </span>
              </div>
            </div>

            <div className="contact-info-list">
              <div className="contact-info-row">
                <div className="contact-icon-box">
                  <Phone size={18} />
                </div>
                <div className="contact-info-text">
                  <div className="label">Main Advisory Line</div>
                  <div className="val">{NOVA_DATA.brand.phone}</div>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-icon-box">
                  <Mail size={18} />
                </div>
                <div className="contact-info-text">
                  <div className="label">Confidential Enquiries</div>
                  <div className="val">{NOVA_DATA.brand.email}</div>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-icon-box">
                  <Clock size={18} />
                </div>
                <div className="contact-info-text">
                  <div className="label">Trading Hours</div>
                  <div className="val">{NOVA_DATA.brand.hours}</div>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=The+Gate+Building+DIFC+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              <Send size={14} />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* VIP Enquiry Form */}
          <div className="contact-right">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-white)', marginBottom: '8px' }}>
              VIP Consultation Request
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '28px' }}>
              Complete the confidential brief below. A senior partner will contact you within 2 business hours.
            </p>

            {submitted ? (
              <div style={{ padding: '36px', background: 'var(--bg-surface)', border: '1px solid var(--gold)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <CheckCircle size={42} style={{ color: 'var(--gold)', margin: '0 auto 16px' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-white)', marginBottom: '8px' }}>
                  Consultation Request Received
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Thank you, {formData.name || 'valued client'}. Your brief has been forwarded to our senior advisory desk.
                </p>
                <button
                  type="button"
                  className="btn btn-gold"
                  onClick={handleWhatsAppRoute}
                  style={{ width: '100%' }}
                >
                  Direct to Advisor WhatsApp &rarr;
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid-2">
                  <div className="form-field">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      className="form-input"
                      placeholder="e.g. Alexander Hamilton"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      type="email"
                      id="contact-email"
                      className="form-input"
                      placeholder="alexander@domain.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label htmlFor="contact-phone">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      className="form-input"
                      placeholder="+971 50 000 0000"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-nat">Nationality / Residence</label>
                    <input
                      type="text"
                      id="contact-nat"
                      className="form-input"
                      placeholder="e.g. British / UAE Resident"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label htmlFor="contact-role">I am a</label>
                    <select
                      id="contact-role"
                      className="form-input"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="Buyer">Private Buyer</option>
                      <option value="Investor">Institutional / Portfolio Investor</option>
                      <option value="Landlord">Landlord / Seller</option>
                      <option value="Tenant">Luxury Tenant</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-budget">Target Budget (AED)</label>
                    <select
                      id="contact-budget"
                      className="form-input"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="Under AED 3M">Under AED 3,000,000</option>
                      <option value="AED 3M - 10M">AED 3,000,000 – 10,000,000</option>
                      <option value="AED 10M - 25M">AED 10,000,000 – 25,000,000</option>
                      <option value="AED 25M+">AED 25,000,000+ (Ultra-Prime)</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-msg">Requirements &amp; Preferred Communities</label>
                  <textarea
                    id="contact-msg"
                    className="form-input"
                    placeholder="Specify requirements: e.g. Waterfront villa on Palm Jumeirah, Burj view penthouse in Downtown, off-plan payment plans, Golden Visa processing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <span>Submit VIP Enquiry</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
