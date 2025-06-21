import { createClient } from '@sanity/client'

// Validate required environment variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

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
