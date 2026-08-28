import { Bricolage_Grotesque, IBM_Plex_Mono, Source_Sans_3 } from 'next/font/google';
import '../index.css';

const display = Bricolage_Grotesque({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display-face',
  display: 'swap'
});

const body = Source_Sans_3({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body-face',
  display: 'swap'
});

const mono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap'
});

const description =
  'Assessoria educacional completa para cursar Medicina na UCP, no Paraguai. Ingresso sem vestibular, transferência com aproveitamento de matérias, suporte documental, moradia e mentoria Revalida.';

export const metadata = {
  metadataBase: new URL('https://travessiamed.vercel.app'),
  title: {
    default: 'Travessia Med | Assessoria em Medicina no Paraguai — UCP',
    template: '%s | Travessia Med'
  },
  description,
  icons: {
    icon: [
      { url: '/travessia-med-logo.png', type: 'image/png' },
      { url: '/travessia-med-icon.png', type: 'image/png' }
    ],
    apple: '/travessia-med-logo.png'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://travessiamed.vercel.app/',
    siteName: 'Travessia Med',
    title: 'Travessia Med | Medicina no Paraguai — UCP',
    description,
    images: [
      {
        url: '/og-travessia-med.jpg?v=3',
        width: 1200,
        height: 630,
        alt: 'Travessia Med — Medicina na UCP, Paraguai'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travessia Med | Medicina no Paraguai — UCP',
    description,
    images: ['/og-travessia-med.jpg?v=3']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
