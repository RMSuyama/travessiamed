import PageBack from '../../../components/PageBack';
import UcpNewsFeed from '../../../components/UcpNewsFeed';

export const metadata = {
  title: 'Notícias da UCP',
  description: 'Resumos em português das publicações oficiais da Universidad Central del Paraguay, com link para o texto original.'
};

export default function UcpNewsPage() {
  return (
    <section id="noticias-ucp" className="frame frame-white frame-flow">
      <div className="container">
        <PageBack />
        <div className="section-intro">
          <div className="badge-pill badge-navy" style={{ marginBottom: '12px' }}>
            <span>Central News · UCP</span>
          </div>
          <h2 style={{ marginBottom: '12px' }}>O que a UCP publicou</h2>
          <p>
            Resumos em português para famílias brasileiras. O texto completo é da universidade.
            Cada card abre a notícia original em{' '}
            <a href="https://central.edu.py/noticias" target="_blank" rel="noreferrer">central.edu.py</a>.
          </p>
        </div>
        <UcpNewsFeed />
        <p className="section-note">
          Fonte:{' '}
          <a href="https://central.edu.py/noticias" target="_blank" rel="noreferrer">
            Universidad Central del Paraguay
          </a>
          . A Travessia Med traduz o resumo; não substitui o comunicado oficial.
        </p>
      </div>
    </section>
  );
}
