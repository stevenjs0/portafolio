import { fetchSanity } from './sanity';

export interface Experience {
  _id: string;
  company: string;
  role: string;
  period: string;
  order: number;
  achievements: string[];
  tech: string[];
  description: any;
}

export async function getAllExperience(): Promise<Experience[]> {
  const query = `*[_type == "experience"] | order(order asc)`;
  return await fetchSanity<Experience[]>(query);
}
