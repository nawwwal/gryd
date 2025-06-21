import { createClient } from '@sanity/client'

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID || import.meta.env.SANITY_API_PROJECT_ID
const dataset =
  import.meta.env.VITE_SANITY_DATASET || import.meta.env.SANITY_API_DATASET
const token =
  import.meta.env.VITE_SANITY_READ_TOKEN || import.meta.env.SANITY_API_READ_TOKEN

  projectId,
  dataset,
  useCdn: !token,
  token,

if (!projectId) {
  throw new Error('Missing required environment variable: VITE_SANITY_PROJECT_ID')
}

if (!dataset) {
  throw new Error('Missing required environment variable: VITE_SANITY_DATASET')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

export default client
