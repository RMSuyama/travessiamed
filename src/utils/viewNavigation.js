export function getViewOffset() {
  const header = document.querySelector('.site-header');
  return header ? Math.round(header.getBoundingClientRect().height) : 70;
}

export function scrollToView(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = getViewOffset();
  document.documentElement.style.setProperty('--view-offset', `${offset}px`);
  window.dispatchEvent(new CustomEvent('view-navigation-start'));

  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';

  window.scrollTo({
    top: Math.max(0, Math.round(top)),
    behavior
  });
}
