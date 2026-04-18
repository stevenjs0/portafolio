import { fetchSanity } from './sanity';

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  summary: string;
  coverImage: any;
  problem: string;
  solution: string;
  impact: string;
  metrics: string[];
  technologies: string[];
  role: string;
  featured: boolean;
  category: string;
  isCaseStudy: boolean;
  content: any;
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(date desc)`;
  return await fetchSanity<Project[]>(query);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0]`;
  return await fetchSanity<Project>(query, { slug });
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(date desc) [0...$limit]`;
  return await fetchSanity<Project[]>(query, { limit });
}
