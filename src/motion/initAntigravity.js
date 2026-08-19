import { getViewOffset } from '../utils/viewNavigation';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function syncViewOffset() {
  document.documentElement.style.setProperty('--view-offset', `${getViewOffset()}px`);
}

function bindViewSnap(frames) {
  let idle;
  let snapping = false;
  let navigationRelease;

  const holdSnapForNavigation = () => {
    snapping = true;
    window.clearTimeout(navigationRelease);
    navigationRelease = window.setTimeout(() => {
      snapping = false;
    }, 850);
  };

  const settleOnFrame = () => {
    if (snapping || prefersReducedMotion()) return;

    const active = document.activeElement;
    if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;

    const offset = getViewOffset();
    const band = Math.min(window.innerHeight * 0.4, 320);
    let nearest = null;
    let distance = Infinity;

    frames.forEach((frame) => {
      const gap = Math.abs(frame.getBoundingClientRect().top - offset);
      if (gap < distance) {
        distance = gap;
        nearest = frame;
      }
    });

    if (!nearest || distance < 8 || distance > band) return;

    snapping = true;
    const top = window.scrollY + nearest.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: 'smooth' });
    window.setTimeout(() => {
      snapping = false;
    }, 650);
  };

  const onScroll = () => {
    if (snapping) return;
    window.clearTimeout(idle);
    idle = window.setTimeout(settleOnFrame, 110);
  };

  syncViewOffset();
  window.addEventListener('view-navigation-start', holdSnapForNavigation);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', syncViewOffset);

  return () => {
    window.clearTimeout(idle);
    window.clearTimeout(navigationRelease);
    window.removeEventListener('view-navigation-start', holdSnapForNavigation);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', syncViewOffset);
  };
}

function bindViewFit(frames) {
  const desktop = window.matchMedia('(min-width: 821px)');
  const header = document.querySelector('header');
  const utilityBar = document.querySelector('.utility-bar');
  let animationFrame;

  const clearFit = (frame) => {
    frame.style.removeProperty('height');
    frame.style.removeProperty('min-height');
    frame.style.removeProperty('--view-pad');
    const content = frame.querySelector(':scope > .container, :scope > .container-narrow');
    content?.style.removeProperty('--view-scale');
  };

  const fitAll = () => {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(() => {
      syncViewOffset();

      if (!desktop.matches) {
        frames.forEach(clearFit);
        return;
      }

      const headerHeight = header?.getBoundingClientRect().height || 70;
      const utilityHeight = utilityBar?.getBoundingClientRect().height || 0;

      frames.forEach((frame) => {
        const content = frame.querySelector(':scope > .container, :scope > .container-narrow');
        if (!content) return;

        const firstViewOffset = frame.id === 'inicio' ? utilityHeight : 0;
        const availableHeight = Math.max(360, window.innerHeight - headerHeight - firstViewOffset);
        const viewPadding = Math.max(10, Math.min(28, availableHeight * 0.028));

        frame.style.setProperty('--view-pad', `${viewPadding}px`);
        content.style.setProperty('--view-scale', '1');

        const naturalHeight = content.scrollHeight;
        const targetHeight = Math.min(
          availableHeight,
          Math.max(360, naturalHeight + viewPadding * 2)
        );

        frame.style.height = `${targetHeight}px`;
        frame.style.minHeight = `${targetHeight}px`;

        const availableContent = targetHeight - viewPadding * 2;
        const idealScale = Math.min(1, availableContent / naturalHeight);
        const scale = Math.max(0.88, idealScale);
        const readableHeight = Math.ceil(naturalHeight * scale + viewPadding * 2);

        if (readableHeight > targetHeight) {
          frame.style.height = `${readableHeight}px`;
          frame.style.minHeight = `${readableHeight}px`;
        }

        content.style.setProperty('--view-scale', scale.toFixed(4));
      });
    });
  };

  const resizeObserver = new ResizeObserver(fitAll);
  frames.forEach((frame) => {
    const content = frame.querySelector(':scope > .container, :scope > .container-narrow');
    if (content) resizeObserver.observe(content);
  });

  window.addEventListener('resize', fitAll);
  desktop.addEventListener('change', fitAll);
  document.fonts?.ready.then(fitAll);
  fitAll();

  return () => {
    window.cancelAnimationFrame(animationFrame);
    resizeObserver.disconnect();
    window.removeEventListener('resize', fitAll);
    desktop.removeEventListener('change', fitAll);
    frames.forEach(clearFit);
  };
}

export function initAntigravity(root = document) {
  const frames = root.querySelectorAll('section.frame');
  const unbindSnap = bindViewSnap(frames);
  const unbindFit = bindViewFit(frames);

  if (prefersReducedMotion()) {
    frames.forEach((frame) => frame.classList.add('is-revealed'));
    return () => {
      unbindSnap();
      unbindFit();
    };
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
  );

  frames.forEach((frame, index) => {
    if (index === 0) frame.classList.add('is-revealed');
    else revealObserver.observe(frame);
  });

  return () => {
    unbindSnap();
    unbindFit();
    revealObserver.disconnect();
  };
}
