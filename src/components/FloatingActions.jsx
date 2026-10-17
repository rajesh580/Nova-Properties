import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, X, CheckCircle2 } from 'lucide-react';
import { NOVA_DATA } from '../data/propertiesData';

export default function FloatingActions({ toastMessage, onCloseToast }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waMsg = encodeURIComponent(
    'Hello Nova Properties, I am interested in Dubai luxury real estate advisory.'
  );

  return (
    <>
      {/* Toast Notification with Progress Bar */}
      {toastMessage && (
        <div className="luxury-toast-notification" role="status" aria-live="polite">
          <div className="toast-inner">
            <CheckCircle2 size={20} className="toast-icon-gold" />
            <div className="toast-body">
              <strong className="toast-title">Executive Notice</strong>
              <div className="toast-desc">{toastMessage}</div>
            </div>
            {onCloseToast && (
              <button
                type="button"
                className="toast-close-btn"
                onClick={onCloseToast}
                aria-label="Dismiss notice"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="toast-progress-bar">
            <div className="toast-progress-fill"></div>
          </div>
        </div>
      )}

      {/* Floating Action Cluster */}
      <div className="floating-actions-widget" aria-label="Instant Contact & Utilities">
        {showScrollTop && (
          <button
            type="button"
            className="floating-btn scroll-top-btn"
            onClick={scrollToTop}
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        )}

        <a
          href={`https://wa.me/${NOVA_DATA.brand.mobileClean}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-wa"
          title="Chat directly with DIFC VIP Desk"
          aria-label="Chat on WhatsApp"
        >
          <div className="wa-pulse-ring"></div>
          <MessageCircle size={18} />
          <span className="wa-label">VIP Desk</span>
        </a>
      </div>
    </>
  );
}
