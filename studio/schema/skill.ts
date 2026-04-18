export default {
  name: 'skill',
  title: 'Skill Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'The name of the Lucide icon to display',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 999,
    },
    {
      name: 'skills',
      title: 'Skills List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Skill Name', type: 'string' },
            { name: 'level', title: 'Proficiency Level (0-100)', type: 'number' },
            { name: 'years', title: 'Years of Experience', type: 'number' },
          ],
        },
      ],
    },
  ],
};
