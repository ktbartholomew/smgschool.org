import {defineType, defineField, defineArrayMember} from 'sanity'
import {LinkIcon} from '@sanity/icons'

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
    defineField({
      type: 'array',
      name: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                icon: LinkIcon,
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'sms', 'tel', 'webcal'],
                        allowRelative: true,
                      }),
                  },
                  {name: 'blank', type: 'boolean', title: 'Open in new tab'},
                ],
              },
              {
                name: 'fileLink',
                type: 'object',
                title: 'File Link',
                icon: () => '📄',
                fields: [
                  {type: 'file', title: 'File', name: 'file'},
                  {name: 'blank', type: 'boolean', title: 'Open in new tab'},
                ],
                validation: (rule) => rule.required(),
              },
              {
                name: 'button',
                type: 'object',
                title: 'Button',
                description:
                  'Like a link, but looks like a button. Use for important actions. A single page should only have one or two buttons.',
                icon: () => '🔤',
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({
                        scheme: ['http', 'https', 'mailto', 'sms', 'tel', 'webcal'],
                        allowRelative: true,
                      }),
                  },
                  {
                    type: 'string',
                    title: 'Color',
                    name: 'color',
                    options: {
                      list: [
                        {title: 'Blue (normal)', value: 'blue'},
                        {title: 'Green (money- or progress-related)', value: 'green'},
                        {title: 'Red (use sparingly)', value: 'red'},
                      ],
                    },
                    initialValue: 'blue',
                    validation: (rule) => rule.required(),
                  },
                  {name: 'blank', type: 'boolean', title: 'Open in new tab'},
                ],
              },
            ],
          },
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
