import Link from 'next/link';
import { Newspaper } from 'lucide-react';
import UcpNewsFeed from './UcpNewsFeed';

export default function UcpNewsPreview() {
  return (
    <section id="noticias-ucp" className="frame frame-white">
      <div className="container">
        <div className="section-intro">
          <div className="badge-pill badge-navy" style={{ marginBottom: '12px' }}>
            <Newspaper size={16} />
            <span>Central News · UCP</span>
          </div>
          <h2 style={{ marginBottom: '12px' }}>Notícias da universidade</h2>
          <p>Publicações oficiais da UCP, em português. O original está no site da universidade.</p>
        </div>
        <UcpNewsFeed limit={4} compact />
        <Link href="/noticias-ucp" className="section-continue">
          Ver todas as notícias →
        </Link>
      </div>
    </section>
  );
}
