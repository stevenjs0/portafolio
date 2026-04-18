import { fetchSanity } from './sanity';

export interface PageContent {
  pageId: string;
  seoTitle?: string;
  seoDescription?: string;
  greeting?: string;
  tagline?: string;
  description?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  statusBadge?: string;
  techStack: string[];
  footerTagline?: string;
  navLabels: string[];
  sectionHeadingFeaturedProjects?: string;
  sectionDescFeaturedProjects?: string;
  sectionHeadingLatestWriting?: string;
  sectionDescLatestWriting?: string;
  sectionHeadingLetsWorkTogether?: string;
  sectionDescLetsWorkTogether?: string;
  ctaViewAllProjects?: string;
  ctaReadAllPosts?: string;
  statsYearsExperience?: string;
  statsProjectsBuilt?: string;
  statsGitHubFollowers?: string;
  statsClientsServed?: string;
  bioParagraphs: string[];
  whatDrivesMe: string[];
  skillsCurrentlyExploring: string[];
  skillsSoft: string[];
  availabilityStatus?: string;
  formPlaceholdersName?: string;
  formPlaceholdersEmail?: string;
  formPlaceholdersSubject?: string;
  formPlaceholdersMessage?: string;
  experienceHeading?: string;
  experienceDescription?: string;
  aboutHeading?: string;
  aboutDescription?: string;
  whatDrivesMeHeading?: string;
  ctaDownloadResume?: string;
  skillsHeading?: string;
  skillsDescription?: string;
  currentlyExploringHeading?: string;
  beyondCodeHeading?: string;
  contactHeading?: string;
  contactDescription?: string;
  contactMethodsHeading?: string;
  socialHeading?: string;
  ctaSendMessage?: string;
  navCtaText?: string;
}

export async function getPageContent(pageId: string): Promise<PageContent | null> {
  const query = `*[_type == "page" && pageId == $pageId][0] {
    ...,
    "statsYearsExperience": stats.yearsExperience,
    "statsProjectsBuilt": stats.projectsBuilt,
    "statsGitHubFollowers": stats.githubFollowers,
    "statsClientsServed": stats.clientsServed
  }`;
  const page = await fetchSanity<any>(query, { pageId });
  if (!page) return null;
  return page as PageContent;
}

export interface ParsedSkill {
  title: string;
  description: string;
}

export function parseSkillList(skills: string[]): ParsedSkill[] {
  return skills.map((skill) => {
    const [title, ...descParts] = skill.split(' - ');
    return {
      title: title.trim(),
      description: descParts.join(' - ').trim(),
    };
  });
}