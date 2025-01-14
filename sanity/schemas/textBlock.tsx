import {defineType, defineField} from 'sanity'
import {richContent} from './fields/richContent'

export const textBlock = defineType({
  type: 'object',
  name: 'textBlock',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      description:
        'This title isn’t displayed anywhere; it’s only used to help you identify this text block.',
    }),
    richContent({name: 'content'}),
  ],
})
