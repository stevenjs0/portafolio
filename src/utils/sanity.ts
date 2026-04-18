import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET;

export const client = createClient({
  projectId: projectId || 'fallback',
  dataset: dataset || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

if (!projectId) {
  console.warn('Sanity Project ID is missing. Please check your .env file.');
}

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function fetchSanity<T>(query: string, params = {}): Promise<T> {
  return await client.fetch(query, params);
}

