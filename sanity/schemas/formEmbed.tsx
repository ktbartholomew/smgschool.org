import {defineType, defineField} from 'sanity'

export const formEmbedBlock = defineType({
  type: 'object',
  name: 'formEmbedBlock',
  title: 'Embedded Form (iframe)',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      description:
        'This title isn’t displayed anywhere; it’s only used to help you identify this embed block.',
    }),
    defineField({
      type: 'string',
      name: 'url',
      title: 'URL',
      validation: (rule) => rule.required() && rule.regex(/^https:\/\/forms\.office\.com\/.+?$/),
      description: (
        <>
          A URL like <code>https://forms.office.com/Pages/ResponsePage.aspx?id=...</code>. Office
          forms shows this with a "Copy Link" button when collecting responses.
        </>
      ),
    }),
  ],
})
