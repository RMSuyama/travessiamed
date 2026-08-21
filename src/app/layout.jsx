import { Archivo_Black, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import '../index.css';

const display = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap'
});

const body = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex',
  display: 'swap'
});

const mono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap'
});

const description =
  'Assessoria educacional completa para cursar Medicina no Paraguai (UCP e UNADES). Ingresso sem vestibular, transferência com aproveitamento de matérias, suporte documental, moradia e mentoria Revalida.';

export const metadata = {
  metadataBase: new URL('https://travessiamed.vercel.app'),
  title: {
    default: 'Travessia Med | Assessoria em Medicina no Paraguai - UCP & UNADES',
    template: '%s | Travessia Med'
  },
  description,
  icons: {
    icon: [
      { url: '/travessia-med-icon.png', type: 'image/png' },
      { url: '/travessia-med-mark.svg', type: 'image/svg+xml' }
    ],
    apple: '/travessia-med-icon.png'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://travessiamed.vercel.app/',
    siteName: 'Travessia Med',
    title: 'Travessia Med | Medicina no Paraguai — UCP & UNADES',
    description,
    images: [
      {
        url: '/og-travessia-med.jpg?v=3',
        width: 1200,
        height: 630,
        alt: 'Travessia Med — Medicina no Paraguai, UCP e UNADES'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travessia Med | Medicina no Paraguai — UCP & UNADES',
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
