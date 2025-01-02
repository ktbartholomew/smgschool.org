import {defineType, defineField, defineArrayMember} from 'sanity'

export const parentDocument = defineType({
  type: 'document',
  name: 'parentDocument',
  orderings: [{title: 'Date', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'file',
      name: 'document',
    }),
  ],
})
