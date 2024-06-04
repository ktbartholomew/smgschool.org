import {defineType, defineField, defineArrayMember} from 'sanity'

export const volunteerNeed = defineType({
  type: 'document',
  name: 'volunteerNeed',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'shortDescription',
    }),
    defineField({
      type: 'date',
      name: 'date',
      validation: (rule) => rule.required(),
      description:
        'The date of the volunteer commitment. The volunteer need will no longer appear after this date.',
    }),
    defineField({
      type: 'string',
      name: 'signupUrl',
      title: 'Signup URL',
      validation: (rule) => rule.required(),
      description: (
        <>
          A URL like <code>https://www.signupgenius.com/go/example</code> or an email address that
          people can use to sign up for this volunteer need.
        </>
      ),
    }),
    defineField({
      type: 'array',
      name: 'description',
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
