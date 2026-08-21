import { getViewOffset } from '../utils/viewNavigation';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function syncViewOffset() {
  document.documentElement.style.setProperty('--view-offset', `${getViewOffset()}px`);
}

export function initAntigravity(root = document) {
  const frames = root.querySelectorAll('section.frame');
  syncViewOffset();
  window.addEventListener('resize', syncViewOffset);

  if (prefersReducedMotion()) {
    frames.forEach((frame) => frame.classList.add('is-revealed'));
    return () => window.removeEventListener('resize', syncViewOffset);
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  frames.forEach((frame, index) => {
    if (index === 0) frame.classList.add('is-revealed');
    else revealObserver.observe(frame);
  });

  return () => {
    window.removeEventListener('resize', syncViewOffset);
    revealObserver.disconnect();
  };
}
