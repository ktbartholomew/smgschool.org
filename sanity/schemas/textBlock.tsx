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
                  {name: 'href', title: 'URL', type: 'url'},
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
