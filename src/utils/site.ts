import { fetchSanity } from './sanity';

export interface SiteConfig {
  name: string;
  alias: string;
  title: string;
  description: string;
  url: string;
  githubUsername: string;
  email: string;
  location: string;
  education: string;
  graduationDate: string;
  social: {
    github: string;
    linkedin: string;
  };
}

const FALLBACK_SITE: SiteConfig = {
  name: 'Steven Muñoz',
  alias: 'stevenjs',
  title: 'Software Engineer',
  description:
    'Software Engineer from Ecuador. Building exceptional digital experiences with 3+ years delivering impactful solutions for US clients.',
  url: 'https://stevenjs.vercel.app',
  githubUsername: 'stevenjs0',
  email: 'erick.steven@email.com',
  location: 'Ecuador',
  education: 'Universidad Politécnica Nacional del Ecuador',
  graduationDate: 'April 2024',
  social: {
    github: 'https://github.com/stevenjs0',
    linkedin: 'https://linkedin.com/in/stevenjs0',
  },
};

// Fetch site settings from Sanity with a fallback to static data
let sanitySite = null;
try {
  sanitySite = await fetchSanity<SiteConfig>(`*[_type == "site"][0]`);
} catch (error) {
  console.error('Error fetching site config from Sanity:', error);
}

export const SITE = sanitySite || FALLBACK_SITE;
