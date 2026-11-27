import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { profile } from '@/content/portfolio';
import './globals.css';
import './editorial.css';

const geist = localFont({
  src: [
    { path: './fonts/geist-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/geist-latin-500-normal.woff2', weight: '500' },
    { path: './fonts/geist-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--font-geist',
  display: 'swap',
  preload: true,
});
const serif = localFont({
  src: [
    { path: './fonts/instrument-serif-latin-400-normal.woff2', style: 'normal', weight: '400' },
    { path: './fonts/instrument-serif-latin-400-italic.woff2', style: 'italic', weight: '400' },
  ],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
});
const mono = localFont({
  src: './fonts/geist-mono-latin-400-normal.woff2',
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ibrahimsheriiff.com'),
  title: 'Ibrahim Sharif — Software Engineer & Curious Mind',
  description:
    'Sydney-based software engineer building across the stack: interfaces, backend services, distributed workflows, cloud infrastructure and applied AI.',
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
  authors: [{ name: profile.name }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/',
    siteName: 'Ibrahim Sharif',
    title: 'Ibrahim Sharif — The Curious Engineer',
    description:
      'Figuring things out. And building them. Full-stack software engineering, distributed systems and applied AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ibrahim Sharif — Software Engineer. Figuring things out. And building them.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ibrahim Sharif — The Curious Engineer',
    description: 'Full-stack software engineering, distributed systems and applied AI.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.fullName,
    jobTitle: 'Software Engineer',
    knowsAbout: [
      'Full-stack software engineering',
      'Distributed systems',
      'Software architecture',
      'Cloud infrastructure',
      'Reliability and testing',
      'Applied AI',
    ],
    url: 'https://ibrahimsheriiff.com/',
    email: profile.email,
    sameAs: [profile.github, profile.linkedin],
    address: { '@type': 'PostalAddress', addressLocality: 'Sydney', addressCountry: 'AU' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Western Sydney University' },
  };
  return (
    <html lang="en-AU" className={`${geist.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
