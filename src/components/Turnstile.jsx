import React, { useEffect, useRef } from 'react';

const SCRIPT_ID = 'cloudflare-turnstile-script';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.turnstile), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => resolve(window.turnstile), { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });
}

export default function Turnstile({ onVerify, onError, resetKey = 0 }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef();
  const verifyRef = useRef(onVerify);
  const errorRef = useRef(onError);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  verifyRef.current = onVerify;
  errorRef.current = onError;

  useEffect(() => {
    if (!siteKey) return undefined;

    let active = true;
    let widgetId;

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !containerRef.current) return;
        widgetId = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => verifyRef.current?.(token),
          'expired-callback': () => verifyRef.current?.(''),
          'error-callback': () => {
            verifyRef.current?.('');
            errorRef.current?.();
          },
          theme: 'light'
        });
        widgetIdRef.current = widgetId;
      })
      .catch(() => errorRef.current?.());

    return () => {
      active = false;
      if (widgetId !== undefined && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
      widgetIdRef.current = undefined;
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetKey > 0 && widgetIdRef.current !== undefined && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  if (!siteKey) {
    return null;
  }

  return <div ref={containerRef} className="turnstile-container" />;
}
