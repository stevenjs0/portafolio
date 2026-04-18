import { fetchSanity } from './sanity';

export interface SkillItem {
  name: string;
  level: number;
  years: number;
}

export interface SkillCategory {
  _id: string;
  name: string;
  icon: string;
  order: number;
  skills: SkillItem[];
}

export async function getAllSkills(): Promise<SkillCategory[]> {
  const query = `*[_type == "skill"] | order(order asc)`;
  return await fetchSanity<SkillCategory[]>(query);
}
