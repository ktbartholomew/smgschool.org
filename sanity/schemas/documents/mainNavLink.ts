import {defineField, defineType} from 'sanity'
import {page} from './page'

const secondaryLink = defineType({
  name: 'secondaryLink',
  type: 'object',
  fields: [
    defineField({
      name: 'page',
      type: 'reference',
      to: [page],
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'The text that appears for the link. Defaults to the title of the linked page.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'The URL the link takes you to.',
      hidden: ({parent, value}) => {
        return !value && !!parent?.page
      },
    }),
  ],
})

export const mainNavLink = defineType({
  type: 'document',
  name: 'mainNavLink',
  fields: [
    defineField({
      name: 'page',
      type: 'reference',
      to: [page],
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'The text that appears for the link. Defaults to the title of the linked page.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'The URL the link takes you to.',
      hidden: ({parent, value}) => {
        return !value && !!parent?.page
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      description:
        'A number that determines the order in which this link appears. Lower numbers appear first.',
      validation: (rule) => [rule.min(0), rule.max(100)],
      initialValue: 0,
    }),
    defineField({
      name: 'secondaryLinks',
      type: 'array',
      description: 'Additional links to show under the main link when hovered.',
      of: [secondaryLink],
    }),
  ],
})
