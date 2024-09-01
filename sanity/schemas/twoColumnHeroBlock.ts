import {defineType, defineField, defineArrayMember} from 'sanity'

export const twoColumnHeroBlock = defineType({
  type: 'object',
  name: 'twoColumnHeroBlock',
  description: 'A very large message in two columns',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      description:
        'This title isn’t displayed anywhere; it’s only used to help you identify this text block.',
    }),
    defineField({
      type: 'array',
      name: 'column1',
      title: 'Column 1',
      description: 'This column appears to the left on large screens, or on top on narrow screens.',
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
    defineField({
      type: 'array',
      name: 'column2',
      title: 'Column 2',
      description:
        'This column appears to the right on large screens, or on bottom on narrow screens.',
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
