import React from 'react';

export default function DeveloperAlliance() {
  const developers = [
    'EMAAR Properties',
    'DAMAC Properties',
    'NAKHEEL',
    'SOBHA Realty',
    'SELECT GROUP',
    'MERAAS',
    'BINGHATTI'
  ];

  return (
    <section className="dev-alliance-strip" aria-label="Official Developer Partners">
      <div className="container">
        <div className="dev-alliance-title">
          Authorized Broker &amp; Alliance Partner to Dubai's Master Developers
        </div>
        <div className="dev-logos-row">
          {developers.map((dev, i) => (
            <div className="dev-logo-item" key={i}>
              {dev}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
