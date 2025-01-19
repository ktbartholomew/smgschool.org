import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import {defineLocations, presentationTool} from 'sanity/presentation'

const SANITY_STUDIO_PREVIEW_ORIGIN =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000'

const plugins = [
  structureTool(),
  media(),
  presentationTool({
    resolve: {
      locations: {
        // Add more locations for other post types
        page: defineLocations({
          select: {
            title: 'title',
            slug: 'slug.current',
          },
          resolve: (doc) => {
            return {
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `${doc?.slug}`,
                },
              ],
            }
          },
        }),
      },
    },
    previewUrl: {
      origin: SANITY_STUDIO_PREVIEW_ORIGIN,
      preview: '/',
      previewMode: {
        enable: '/api/draft-mode/enable',
      },
    },
  }),
]

if (isDev) {
  plugins.push(visionTool())
}

export default defineConfig({
  name: 'default',
  title: 'Saint Maria Goretti',
  projectId: 'yqyo9yvq',
  dataset: 'production',
  plugins,
  schema: {
    types: schemaTypes,
  },
})
