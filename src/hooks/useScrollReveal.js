import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for scroll-reveal animations.
 * Observes all elements matching '.reveal-on-scroll' or '.reveal-stagger'
 * and adds '.is-revealed' class when they enter the viewport.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    // If IntersectionObserver is not supported, reveal all immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll, .reveal-stagger').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed), .reveal-stagger:not(.is-revealed)');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, deps);
}
