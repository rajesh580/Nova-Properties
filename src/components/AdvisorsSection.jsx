import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function AdvisorsSection() {
  return (
    <section className="section-padding" id="team">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">World-Class Advisory</span>
            <h2 className="section-title">Meet Your <em>Senior Advisors</em></h2>
            <p className="section-desc">
              Direct access to industry leaders with decades of market intelligence and trusted relationships with Dubai's elite master developers.
            </p>
          </div>
          <a href="#contact" className="btn btn-outline">
            <span>Join Our Advisory Board</span>
          </a>
        </div>

        <div className="team-grid">
          {NOVA_DATA.team.map((member, i) => {
            const waMsg = encodeURIComponent(
              `Hello ${member.name}, I would like to schedule a private real estate consultation with you via Nova Properties.`
            );

            return (
              <div className="advisor-card" key={i}>
                <div className="advisor-photo-box">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="advisor-body">
                  <h3 className="advisor-name">{member.name}</h3>
                  <div className="advisor-title">{member.title}</div>
                  <p className="advisor-specialty">{member.specialty}</p>
                  <div className="advisor-contact-actions">
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, '')}`}
                      className="advisor-btn advisor-btn-call"
                    >
                      <Phone size={12} />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${member.phone.replace(/[\s+]/g, '')}?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="advisor-btn advisor-btn-wa"
                    >
                      <MessageCircle size={12} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
