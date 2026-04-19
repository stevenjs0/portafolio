import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'site',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'alias',
      title: 'Alias',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUsername',
      title: 'GitHub Username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'formspreeId',
      title: 'Formspree ID',
      type: 'string',
      description: 'The ID from your Formspree form URL (e.g., f/xxxxxx)',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'string',
    }),
    defineField({
      name: 'graduationDate',
      title: 'Graduation Date',
      type: 'string',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'github',
          title: 'GitHub URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
      ],
    }),
  ],
});
