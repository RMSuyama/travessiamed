import React from 'react';

/**
 * Moldura de transição SVG entre dois quadros de fundo distintos.
 * O observador atravessa uma zona neutra antes do próximo cenário.
 */
export default function SectionDivider({ from, to, shape = 'wave', height = 72 }) {
  const paths = {
    wave: `M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,${height} L0,${height} Z`,
    angle: `M0,0 L1440,${height} L1440,${height} L0,${height} Z`,
    gentle: `M0,8 C480,${height} 960,${height} 1440,8 L1440,${height} L0,${height} Z`,
  };

  return (
    <div
      className="section-divider"
      aria-hidden="true"
      style={{ backgroundColor: from }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[shape] || paths.wave} fill={to} />
      </svg>
    </div>
  );
}
