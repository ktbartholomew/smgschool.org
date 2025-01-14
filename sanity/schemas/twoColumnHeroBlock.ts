import {defineType, defineField, defineArrayMember} from 'sanity'
import {richContent} from './fields/richContent'

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
    richContent({
      name: 'column1',
      description: 'This column appears to the left on large screens, or on top on narrow screens.',
    }),
    richContent({
      name: 'column2',
      description:
        'This column appears to the right on large screens, or on bottom on narrow screens.',
    }),
  ],
})
