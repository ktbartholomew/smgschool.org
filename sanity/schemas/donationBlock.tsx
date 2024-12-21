import {defineType, defineField, defineArrayMember} from 'sanity'

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
      name: 'content',
      type: 'array',
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
      type: 'string',
      name: 'paymentLinkUrl',
      title: 'Payment Link URL',
      validation: (rule) => rule.required() && rule.regex(/^https:\/\/square\.link\/.+?$/),
      description: (
        <>
          A URL for a{' '}
          <a href="https://app.squareup.com/dashboard/payment-links" target="_blank">
            Square Payment Link
          </a>
          .
        </>
      ),
    }),
  ],
})
