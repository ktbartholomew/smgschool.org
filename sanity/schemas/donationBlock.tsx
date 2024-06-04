import {defineType, defineField} from 'sanity'

export const donationBlock = defineType({
  type: 'object',
  name: 'donationBlock',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      description:
        'This title isn’t displayed anywhere; it’s only used to help you identify this donation block.',
    }),
    defineField({
      type: 'string',
      name: 'challengeUrl',
      title: 'Challenge URL',
      validation: (rule) => rule.required() && rule.regex(/^https:\/\/p2p\.onecause\.com\/.+?$/),
      description: (
        <>
          A URL like <code>https://p2p.onecause.com/smgschool</code>. This is the OneCause campaign
          that will receive donations.
        </>
      ),
    }),
  ],
})
