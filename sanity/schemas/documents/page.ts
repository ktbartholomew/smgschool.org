import {defineType, defineField, defineArrayMember} from 'sanity'

export const page = defineType({
  type: 'document',
  name: 'page',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Path',
      options: {
        source: 'title',
        maxLength: 128,
      },
      validation: (rule) =>
        rule.custom((value) =>
          value?.current?.match(/^\/[a-z0-9-_\/\.]+?[a-z0-9]$/)
            ? true
            : 'Path must begin with a `/` and contain only lowercase letters, numbers, hyphens, and forward slashes (`/`).',
        ),
      description: 'The URL path at which this page can be reached.',
    }),
    defineField({
      type: 'array',
      name: 'sections',
      title: 'Page sections',
      description:
        'Page sections comprise the main content of the page. Each section stands apart from its siblings; use them to control the vertical rhythm of a long page.',
      of: [
        defineArrayMember({
          type: 'heroBlock',
        }),
        defineArrayMember({
          type: 'textBlock',
        }),
        defineArrayMember({
          type: 'donationBlock',
        }),
        defineArrayMember({
          type: 'formEmbedBlock',
        }),
        defineArrayMember({
          type: 'ctaBlock',
        }),
        defineArrayMember({
          type: 'imageCarousel',
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'sidebarSections',
      title: 'Sidebar sections',
      description:
        'Sidebar sections appear next to the main content of the page. Use them for supporting resources and information, or leave them out if the main content speaks for itself.',
      of: [
        defineArrayMember({
          type: 'textBlock',
        }),
        defineArrayMember({
          type: 'ctaBlock',
        }),
      ],
    }),
    defineField({
      type: 'string',
      name: 'seoTitle',
      title: 'SEO Title',
      description:
        'This title appears in the web browser tab and in search results. "Saint Maria Goretti Catholic School" will automatically be appended to the end.',
      group: 'seo',
    }),
    defineField({
      type: 'string',
      name: 'seoDescription',
      title: 'SEO Description',
      description:
        'This is a description of what this page contains, which might appear as the "snippet" in search results. Be sure to make this unique, using essential keywords. Write it like a pitch that convinces the user that the page is exactly what they\'re looking for.',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
})
