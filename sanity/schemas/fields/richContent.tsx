import {defineArrayMember, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const richContent = ({name, description}: {name: string; description?: string}) =>
  defineField({
    type: 'array',
    name,
    description,
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
                  description: (
                    <>
                      Where the link takes the user. Use relative URLs (only include the
                      "/path/to/page" part) for links within this site. Use full URLs (including
                      "https://" at the beginning) for links on other sites.
                      <br />
                      Examples:
                      <ul>
                        <li>
                          Same site: <code>/admissions/tour</code>
                        </li>
                        <li>
                          Other site: <code>https://familyportal.renweb.com/</code>
                        </li>
                        <li>
                          Telephone number: <code>tel:18172755081</code>
                        </li>
                        <li>
                          Email: <code>mailto:development@smgschool.org</code>
                        </li>
                      </ul>
                    </>
                  ),

                  type: 'url',
                  validation: (rule) =>
                    rule.required().uri({
                      scheme: ['http', 'https', 'mailto', 'sms', 'tel', 'webcal'],
                      allowRelative: true,
                    }),
                },
                {
                  name: 'blank',
                  type: 'boolean',
                  title: 'Open in new tab',
                  description:
                    'Opens the link a new tab or window. Use this only if linking to a different website.',
                },
              ],
            },
            {
              name: 'fileLink',
              type: 'object',
              title: 'File Link',
              icon: () => '📄',
              fields: [
                {
                  type: 'file',
                  title: 'File',
                  name: 'file',
                  validation: (rule) => rule.required().reference(),
                },
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
  })
