import Link from 'next/link';
import { BookOpen, Calculator, HeartHandshake, HelpCircle, Truck } from 'lucide-react';

const pages = [
  {
    href: '/custos',
    icon: Calculator,
    title: 'Custos e simulador',
    description: 'Mensalidades UCP e UNADES, custo de vida em Foz e estimativa de economia em 6 anos.'
  },
  {
    href: '/familia',
    icon: HeartHandshake,
    title: 'Espaço da família',
    description: 'Canal direto para pais e responsáveis: segurança, moradia, diploma e acompanhamento.'
  },
  {
    href: '/duvidas',
    icon: HelpCircle,
    title: 'Mitos, verdades e FAQ',
    description: 'Vestibular, transferência com aproveitamento, Revalida, legalidade e o que mais perguntam.'
  },
  {
    href: '/servicos',
    icon: Truck,
    title: 'Carreto e mudança',
    description: 'Apoio para transporte de malas e móveis entre Foz do Iguaçu e Ciudad del Este.'
  },
  {
    href: '/parceiros',
    icon: BookOpen,
    title: 'Rede de parceiros',
    description: 'Prestadores locais de moradia, transporte e serviços para quem está se instalando na fronteira.'
  }
];

export default function ExplorePages() {
  return (
    <section id="guias" className="frame frame-cream">
      <div className="container">
        <div className="section-intro">
          <div className="badge-pill badge-navy" style={{ marginBottom: '12px' }}>
            <BookOpen size={16} />
            <span>Guias completos</span>
          </div>
          <h2 style={{ marginBottom: '12px' }}>Tudo o que saiu da página inicial continua aqui</h2>
          <p>
            A home é o convite. Os detalhes — custos, família, mitos, mudança e parceiros — estão nas páginas abaixo, intactos.
          </p>
        </div>

        <div className="explore-grid">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Link key={page.href} href={page.href} className="explore-card">
                <Icon size={22} color="var(--crossing)" />
                <h3>{page.title}</h3>
                <p>{page.description}</p>
                <span>Abrir página →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
