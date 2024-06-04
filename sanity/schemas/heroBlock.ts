import {defineType, defineField, defineArrayMember} from 'sanity'

export const heroBlock = defineType({
  type: 'object',
  name: 'heroBlock',
  description: 'A very large header with a background image',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
    }),
    defineField({
      type: 'string',
      name: 'subtitle',
    }),
    defineField({
      type: 'image',
      name: 'image',
      description:
        "A background image which will fill the hero section. If you don't specify an image, the SMG plaid pattern will be used instead.",
      options: {hotspot: true},
    }),
    defineField({
      type: 'boolean',
      description:
        'Whether to blur the background image. Use this if the image is low-resolution or has too many distracting details.',
      name: 'blurImage',
      options: {layout: 'checkbox'},
    }),
    defineField({
      type: 'string',
      name: 'colorOverlay',
      description:
        'A color to cast over the background image. This makes the image less distracting and makes the text on top of it easier to read.',
      options: {
        list: ['Dark Red', 'Navy Blue', 'Gold'],
      },
    }),
    defineField({
      type: 'array',
      name: 'cta',
      title: 'Call to actions',
      of: [
        defineArrayMember({
          type: 'cta',
        }),
      ],
    }),
  ],
})
