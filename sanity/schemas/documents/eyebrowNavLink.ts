import {defineField, defineType} from 'sanity'

export const eyebrowNavLink = defineType({
  type: 'document',
  name: 'eyebrowNavLink',
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      description: 'The text that appears for the link.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'The URL the link takes you to.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'newTab',
      type: 'boolean',
      description:
        'Whether to open the link in a new tab. Use this for links that take the user to a different website.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      description:
        'A number that determines the order in which this link appears. Lower numbers appear first.',
      validation: (rule) => rule.min(0) && rule.max(100),
    }),
  ],
  initialValue: {order: 0},
})
