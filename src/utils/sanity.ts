import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function fetchSanity<T>(query: string, params = {}): Promise<T> {
  return await client.fetch(query, params);
}

