import { fetchSanity } from './sanity';

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage: any;
  categories: string[];
  draft: boolean;
  body: any;
}

export async function getAllPosts(): Promise<Post[]> {
  const query = `*[_type == "post" && !draft] | order(publishedAt desc)`;
  return await fetchSanity<Post[]>(query);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  return await fetchSanity<Post>(query, { slug });
}

export async function getLatestPosts(limit = 2): Promise<Post[]> {
  const query = `*[_type == "post" && !draft] | order(publishedAt desc) [0...$limit]`;
  return await fetchSanity<Post[]>(query, { limit });
}
