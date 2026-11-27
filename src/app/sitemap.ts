import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['equityguard', 'mediquery', 'returns-agent', 'daita'].map((slug) => ({
      url: `https://ibrahimsheriiff.com/lab/${slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: 'https://ibrahimsheriiff.com/lab/', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://ibrahimsheriiff.com/lab/automark/', changeFrequency: 'monthly', priority: 0.8 },
    {
      url: 'https://ibrahimsheriiff.com/work/mediquery/',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://ibrahimsheriiff.com/work/returns-agent/',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { url: 'https://ibrahimsheriiff.com/work/daita/', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://ibrahimsheriiff.com/', changeFrequency: 'monthly', priority: 1 },
    {
      url: 'https://ibrahimsheriiff.com/work/equityguard/',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://ibrahimsheriiff.com/work/automark/',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
