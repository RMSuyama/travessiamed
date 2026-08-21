'use client';

import React, { useMemo, useRef, useState } from 'react';
import Turnstile from './Turnstile';

function nextChallenge() {
  const left = 2 + Math.floor(Math.random() * 8);
  const right = 2 + Math.floor(Math.random() * 8);
  return { left, right, sum: left + right };
}

function MathCaptcha({ onVerify }) {
  const challenge = useMemo(() => nextChallenge(), []);
  const [answer, setAnswer] = useState('');
  const verifyRef = useRef(onVerify);
  verifyRef.current = onVerify;

  const update = (value) => {
    setAnswer(value);
    const solved = Number(value) === challenge.sum;
    verifyRef.current(solved ? `math:${challenge.sum}` : '');
  };

  return (
    <div className="form-captcha">
      <label className="form-label" htmlFor="form-captcha-answer">
        Verificação: quanto é {challenge.left} + {challenge.right}?
      </label>
      <input
        id="form-captcha-answer"
        className="form-input"
        inputMode="numeric"
        autoComplete="off"
        value={answer}
        onChange={(event) => update(event.target.value)}
        required
      />
    </div>
  );
}

export default function FormCaptcha({ onVerify, onError, resetKey = 0 }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (siteKey) {
    return <Turnstile resetKey={resetKey} onVerify={onVerify} onError={onError} />;
  }

  return <MathCaptcha resetKey={resetKey} onVerify={onVerify} />;
}
