import Link from 'next/link';
import { BookOpen, Calculator, HeartHandshake, HelpCircle, Newspaper, Truck } from 'lucide-react';

const pages = [
  {
    href: '/custos',
    icon: Calculator,
    title: 'Custos e simulador',
    description: 'Mensalidades da UCP, custo de vida em Foz e estimativa de economia em 6 anos.'
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
    href: '/noticias-ucp',
    icon: Newspaper,
    title: 'Notícias da UCP',
    description: 'Resumos em português das publicações oficiais da Universidad Central del Paraguay.'
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
        <div className="explore-grid">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Link key={page.href} href={page.href} className="explore-card">
                <Icon size={22} color="var(--signal)" />
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
