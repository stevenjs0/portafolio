export default {
  name: 'page',
  title: 'Page Content',
  type: 'document',
  fields: [
    {
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      description: 'e.g., home, about, hero, footer',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    },
    // Hero & Home specific
    {
      name: 'greeting',
      title: 'Greeting (Hero)',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline (Hero)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'ctaPrimary',
      title: 'Primary CTA Label',
      type: 'string',
    },
    {
      name: 'ctaSecondary',
      title: 'Secondary CTA Label',
      type: 'string',
    },
    {
      name: 'statusBadge',
      title: 'Status Badge Text',
      type: 'string',
    },
    {
      name: 'techStack',
      title: 'Tech Stack (Badges)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    // About specific
    {
      name: 'bioParagraphs',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'whatDrivesMe',
      title: 'What Drives Me (Bullet points)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    // Footer
    {
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
    },
    // Skills Page specific
    {
      name: 'skillsHeading',
      title: 'Skills Heading',
      type: 'string',
    },
    {
      name: 'skillsDescription',
      title: 'Skills Description',
      type: 'text',
    },
    {
      name: 'skillsSoft',
      title: 'Soft Skills',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Format: "Title - Description"',
    },
    {
      name: 'currentlyExploringHeading',
      title: 'Currently Exploring Heading',
      type: 'string',
    },
    {
      name: 'skillsCurrentlyExploring',
      title: 'Skills Currently Exploring',
      type: 'array',
      of: [{ type: 'string' }],
    },
    // Stats
    {
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        { name: 'yearsExperience', title: 'Years of Experience', type: 'string' },
        { name: 'projectsBuilt', title: 'Projects Built', type: 'string' },
        { name: 'githubFollowers', title: 'GitHub Followers', type: 'string' },
        { name: 'clientsServed', title: 'Clients Served', type: 'string' },
      ],
    },
  ],
};
