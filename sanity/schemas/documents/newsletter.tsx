import {defineType, defineField, defineArrayMember} from 'sanity'
import {richContent} from '../fields/richContent'

export const newsletter = defineType({
  type: 'document',
  name: 'newsletter',
  fields: [
    defineField({
      type: 'url',
      name: 'url',
      title: 'URL',
      description: (
        <>
          The URL to view the newsletter, like{' '}
          <code>https://secure.smore.com/n/euv5y-the-trojan-times</code>
        </>
      ),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'datetime',
      name: 'date',
      description:
        'The date after which the newsletter is published and publicly available. The most recent published newsletter will be displayed in navigation links.',
      validation: (Rule) => Rule.required(),
    }),
    richContent({name: 'summary', description: "A brief summary of the newsletter's contents."}),
  ],
  orderings: [
    {
      name: 'dateDesc',
      title: 'Date Descending',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      name: 'dateAsc',
      title: 'Date Ascending',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'date',
    },
    prepare: (value) => ({
      title: new Date(value.title).toLocaleString(),
    }),
  },
})
