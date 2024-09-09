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
      of: [
        defineArrayMember({
          type: 'object',
          name: 'peopleLink',
          fields: [
            defineField({name: 'person', type: 'reference', to: [{type: 'person'}]}),
            defineField({
              type: 'string',
              name: 'alternateTitle',
              title: 'Alternate Title',
              description:
                "An alternate title for this person to be used in this list only. If unset, the person's primary title will be used.",
            }),
          ],
          preview: {
            select: {
              title: 'person.name',
              subtitle: 'alternateTitle',
              media: 'person.photo',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'people.0.person.photo',
    },
  },
})
