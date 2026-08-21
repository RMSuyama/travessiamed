import Link from 'next/link';

const usefulPages = [
  { href: '/', label: 'Página inicial' },
  { href: '/custos', label: 'Custos e simulador' },
  { href: '/familia', label: 'Espaço da família' },
  { href: '/duvidas', label: 'Mitos e dúvidas' },
  { href: '/servicos', label: 'Carreto e mudança' },
  { href: '/parceiros', label: 'Parceiros' }
];

export default function NotFoundPage() {
  return (
    <section className="frame frame-white">
      <div className="container-narrow">
        <p className="badge-pill badge-navy" style={{ marginBottom: '16px' }}>Página não encontrada</p>
        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', marginBottom: '16px' }}>Esse endereço não existe.</h1>
        <p style={{ marginBottom: '28px' }}>
          O conteúdo não foi apagado. Use um dos guias abaixo — custos, família, dúvidas e mudança estão em páginas próprias.
        </p>
        <div className="explore-grid">
          {usefulPages.map((page) => (
            <Link key={page.href} href={page.href} className="explore-card">
              <h3>{page.label}</h3>
              <span>Abrir →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
