import React, { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';
import { scrollToView } from '../utils/viewNavigation';

const pageToc = [
  { id: 'inicio', label: 'Início' },
  { id: 'mitos', label: 'Mitos e verdades' },
  { id: 'universidades', label: 'Universidades' },
  { id: 'comparativo', label: 'Brasil vs Paraguai' },
  { id: 'custo', label: 'Custo de vida' },
  { id: 'instalacao', label: 'Mudança e reparos' },
  { id: 'parceiros', label: 'Seja parceiro' },
  { id: 'calculadora', label: 'Simulador' },
  { id: 'pilares', label: 'Como funciona' },
  { id: 'familia', label: 'Espaço da família' },
  { id: 'depoimentos', label: 'Alunos' },
  { id: 'formulario', label: 'Pré-matrícula' },
  { id: 'faq', label: 'Dúvidas' },
  { id: 'privacidade', label: 'Privacidade' },
];

export default function ViewToc() {
  const [activeId, setActiveId] = useState('inicio');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const frames = pageToc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!frames.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] }
    );

    frames.forEach((frame) => observer.observe(frame));
    return () => observer.disconnect();
  }, []);

  const goTo = (event, id) => {
    event.preventDefault();
    setActiveId(id);
    setOpen(false);
    scrollToView(id);
  };

  return (
    <nav className={`view-toc${open ? ' is-open' : ''}`} aria-label="Sumário da página">
      <button
        type="button"
        className="view-toc-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="view-toc-panel"
      >
        {open ? <X size={18} /> : <List size={18} />}
        <span>Sumário</span>
      </button>

      <div id="view-toc-panel" className="view-toc-panel">
        <p className="view-toc-kicker">Nesta página</p>
        <ol className="view-toc-list">
          {pageToc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'is-active' : ''}
                aria-current={activeId === item.id ? 'location' : undefined}
                onClick={(event) => goTo(event, item.id)}
              >
                <span className="view-toc-node" aria-hidden="true" />
                <span className="view-toc-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
