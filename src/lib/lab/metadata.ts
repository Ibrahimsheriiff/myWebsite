import { experiments, type ExperimentSlug } from '@/content/lab/experiments';
import type { Metadata } from 'next';
export function labMetadata(experiment = false): Metadata {
  const path = experiment ? '/lab/automark/' : '/lab/';
  const title = experiment
    ? 'AutoMark Workload Simulator — The Engineering Lab'
    : 'The Engineering Lab — Let’s take things apart';
  const description = experiment
    ? 'Change a synthetic grading workload, follow its queue and independent workers, and discover why accepting work is different from finishing it.'
    : 'Small interactive engineering experiments by Ibrahim Sharif. Change an input, follow the consequences and explore the system underneath.';
  const image = experiment ? '/lab-automark-og.png' : '/lab-og.png';
  return {
    title: `${title} | Ibrahim Sharif`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export function experimentMetadata(slug: ExperimentSlug): Metadata {
  const e = experiments.find((e) => e.slug === slug)!;
  const title = `${e.name} — ${e.title}`;
  return {
    title: `${title} | Ibrahim Sharif`,
    description: e.description,
    alternates: { canonical: `/lab/${slug}/` },
    openGraph: {
      type: 'website',
      url: `/lab/${slug}/`,
      title,
      description: e.description,
      images: [{ url: `/lab-${slug}-og.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: e.description,
      images: [`/lab-${slug}-og.png`],
    },
  };
}
