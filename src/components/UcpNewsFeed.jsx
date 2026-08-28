'use client';

import { useEffect, useState } from 'react';
import { supabasePublic } from '../utils/supabaseClient';

function formatDate(value) {
  if (!value) return '';
  return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export default function UcpNewsFeed({ limit, compact = false }) {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let query = supabasePublic
        .from('ucp_noticias_public')
        .select('id, title_pt, excerpt_pt, source_url, image_url, category, published_at')
        .order('published_at', { ascending: false });

      if (limit) query = query.limit(limit);

      const { data } = await query;
      if (!cancelled) {
        setPosts(data || []);
        setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (!loaded) {
    return <p className="section-note">Carregando notícias da UCP…</p>;
  }

  if (!posts.length) {
    return <p className="section-note">Nenhuma notícia publicada ainda.</p>;
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
