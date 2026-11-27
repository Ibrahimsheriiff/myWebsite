import type { Metadata } from 'next';
import { profile } from '@/content/identity';
export function studyMetadata(slug: string, title: string, description: string): Metadata {
  return {
    title: `${title} | Ibrahim Sharif`,
    description,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: {
      type: 'article',
      url: `https://ibrahimsheriiff.com/work/${slug}/`,
      title,
      description,
      authors: [profile.name],
      images: [{ url: `/${slug}-og.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`/${slug}-og.png`] },
  };
}
export function studySchema(slug: string, title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Person', name: profile.name, url: 'https://ibrahimsheriiff.com/' },
    mainEntityOfPage: `https://ibrahimsheriiff.com/work/${slug}/`,
    image: `https://ibrahimsheriiff.com/${slug}-og.png`,
    inLanguage: 'en-AU',
  };
}
