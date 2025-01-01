import {defineType, defineField, defineArrayMember} from 'sanity'

export const parentNews = defineType({
  type: 'document',
  name: 'parentNews',
  orderings: [{title: 'Date', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'date',
      name: 'date',
      validation: (rule) => rule.required(),
      description: 'The publish date of the news item.',
    }),
    defineField({
      type: 'array',
      name: 'content',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            {
              type: 'string',
              name: 'caption',
            },
          ],
          options: {hotspot: true},
        }),
      ],
    }),
  ],
})
