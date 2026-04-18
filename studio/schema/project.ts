export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'problem',
      title: 'The Problem',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'The Solution',
      type: 'text',
    },
    {
      name: 'impact',
      title: 'The Impact',
      type: 'text',
    },
    {
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        { name: 'demo', title: 'Live Demo', type: 'url' },
        { name: 'github', title: 'GitHub Repo', type: 'url' },
        { name: 'caseStudy', title: 'Case Study URL', type: 'url' },
      ],
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'Web Development',
    },
    {
      name: 'isCaseStudy',
      title: 'Is Case Study',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'content',
      title: 'Project Details Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
};
