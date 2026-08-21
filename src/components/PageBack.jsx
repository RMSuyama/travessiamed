import React from 'react';
import Link from 'next/link';

export default function PageBack({ dark = false }) {
  return (
    <Link href="/" className={`route-back-link${dark ? ' route-back-link-dark' : ''}`}>
      ← Voltar para o início
    </Link>
  );
}
