import {defineType, defineField, defineArrayMember} from 'sanity'

export const person = defineType({
  type: 'document',
  name: 'person',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      description: 'First and last name',
    }),
    defineField({
      type: 'string',
      name: 'position',
      description: 'Job title or responsibility',
    }),
    defineField({
      type: 'image',
      name: 'photo',
      options: {hotspot: true, metadata: ['lqip', 'blurhash', 'palette']},
    }),
    defineField({
      type: 'string',
      name: 'contactEmail',
    }),
    defineField({
      type: 'string',
      name: 'contactPhone',
      placeholder: '8172755081',
      description:
        'Only include numbers, no punctuation like dashes or parenthesis. The number will be formatted correctly before showing it to visitors.',
    }),
    defineField({
      type: 'string',
      name: 'experience',
      description: "The person's education or professional credentials, if relevant.",
      placeholder: 'M. Ed. Stanford',
    }),
    defineField({
      type: 'array',
      name: 'bio',
      description:
        "A summary of the person's achievements, professional interests, or work history.",
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      type: 'date',
      name: 'startDate',
      description: 'The date the person first started their current position.',
    }),
    defineField({
      type: 'date',
      name: 'endDate',
      description:
        'The date the person last held their current position. They will not appear in lists if this date is in the past.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo',
    },
  },
})
