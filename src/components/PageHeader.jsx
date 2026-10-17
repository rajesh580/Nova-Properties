import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  breadcrumbs = [],
  meta = []
}) {
  return (
    <div className="page-header-banner">
      <div className="container">
        <div className="page-header-content">
          {breadcrumbs.length > 0 && (
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={crumb.label}>
                    {idx > 0 && <span className="sep"><ChevronRight size={12} /></span>}
                    {isLast || !crumb.path ? (
                      <span className="current" aria-current="page">{crumb.label}</span>
                    ) : (
                      <Link to={crumb.path}>{crumb.label}</Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          {eyebrow && <span className="eyebrow">{eyebrow}</span>}

          <h1 className="page-header-title">
            {title} {titleAccent && <em>{titleAccent}</em>}
          </h1>

          {description && (
            <p className="page-header-desc">
              {description}
            </p>
          )}

          {meta.length > 0 && (
            <div className="page-header-meta">
              {meta.map((item, idx) => (
                <div key={idx} className="page-header-meta-item">
                  <span className="gold-dot"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
