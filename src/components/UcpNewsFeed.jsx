import { ucpNoticias } from '../data/ucpNoticias';

function formatDate(value) {
  if (!value) return '';
  return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export default function UcpNewsFeed({ limit, compact = false }) {
  const posts = limit ? ucpNoticias.slice(0, limit) : ucpNoticias;

  if (!posts.length) {
    return <p className="section-note">Nenhuma notícia exportada ainda.</p>;
  }

  return (
    <div className={`ucp-news-grid${compact ? ' is-compact' : ''}`}>
      {posts.map((post) => (
        <article key={post.id} className="ucp-news-card">
          {post.image_url && (
            <img src={post.image_url} alt="" loading="lazy" />
          )}
          <div className="ucp-news-card-body">
            <p className="ucp-news-meta">
              {post.category || 'UCP'}
              {post.published_at ? ` · ${formatDate(post.published_at)}` : ''}
            </p>
            <h3>{post.title_pt}</h3>
            {!compact && post.excerpt_pt && <p>{post.excerpt_pt}</p>}
            <a href={post.source_url} target="_blank" rel="noreferrer">
              Ler no site da UCP →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
