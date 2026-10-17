import React from 'react';
import { Scale, X, ArrowRight } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function CompareDock({
  comparedIds,
  onRemoveCompare,
  onClearCompare,
  onOpenModal
}) {
  if (!comparedIds || comparedIds.length === 0) return null;

  const comparedProperties = NOVA_DATA.properties.filter(p => comparedIds.includes(p.id));

  return (
    <div className="compare-floating-dock" role="region" aria-label="Property Comparison Tray">
      <div className="compare-dock-inner">
        <div className="compare-dock-header">
          <div className="compare-dock-title">
            <Scale size={16} className="gold-accent-icon" />
            <span>Compare Residences (<strong>{comparedProperties.length}</strong>/4)</span>
          </div>
          <span className="compare-dock-hint hide-mobile">
            {comparedProperties.length === 1 ? 'Add at least 1 more to compare specs side-by-side' : 'Ready for architectural comparison'}
          </span>
        </div>

        <div className="compare-dock-thumbs">
          {comparedProperties.map((prop) => (
            <div className="compare-thumb-pill" key={prop.id}>
              <img src={prop.image} alt={prop.title} />
              <span className="compare-thumb-title">{prop.title}</span>
              <button
                type="button"
                className="compare-thumb-remove"
                onClick={() => onRemoveCompare(prop.id)}
                aria-label={`Remove ${prop.title} from comparison`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="compare-dock-actions">
          <button
            type="button"
            className="btn btn-gold btn-sm"
            onClick={onOpenModal}
            disabled={comparedProperties.length < 2}
            title={comparedProperties.length < 2 ? 'Select at least 2 properties to compare' : 'Open comparison table'}
          >
            <span>Compare Now</span>
            <ArrowRight size={13} />
          </button>
          <button
            type="button"
            className="compare-clear-btn"
            onClick={onClearCompare}
            aria-label="Clear comparison selection"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
