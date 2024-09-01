import {defineType, defineField, defineArrayMember} from 'sanity'

export const personListBlock = defineType({
  type: 'object',
  name: 'personListBlock',
  title: 'People List Block',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
    }),
    defineField({
      type: 'array',
      name: 'people',
      of: [defineArrayMember({type: 'reference', to: [{type: 'person'}]})],
    }),
  ],
})
