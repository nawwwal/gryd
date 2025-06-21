import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'c0rjrvm3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

async function debugFrontendData() {
  console.log('🔍 Debugging frontend data loading issues...\n')

  try {
    // Test exact same queries as contentLoader.ts
    console.log('1️⃣ Testing loadWorkProjects query...')
    const workQuery = `*[_type == "workProject"]|order(metadata.publishDate desc){
      "slug": slug.current,
      title,
      subtitle,
      description,
      timeline,
      impact,
      content,
      heroImage{
        asset->{
          _id,
          url,
          metadata
        },
        alt,
        hotspot
      },
      gallery[]{
        asset->{
          _id,
          url,
          metadata
        },
        alt,
        caption,
        hotspot
      },
      attachments[]{
        asset->{
          _id,
          url,
          originalFilename,
          size
        },
        title,
        description
      },
      metadata
    }`

    const workProjects = await client.fetch(workQuery)
    console.log(`✅ Work Projects: ${workProjects.length} found`)

    if (workProjects.length > 0) {
      console.log('\n📋 First Work Project:')
      const first = workProjects[0]
      console.log(`   • Title: ${first.title}`)
      console.log(`   • Slug: ${first.slug}`)
      console.log(`   • Featured: ${first.metadata?.featured}`)
      console.log(`   • Category: ${first.metadata?.category}`)
      console.log(`   • Status: ${first.metadata?.status}`)
      console.log(`   • Hero Image: ${first.heroImage ? '✅ Present' : '❌ Missing'}`)
    }

    console.log('\n2️⃣ Testing loadPlaygroundExperiments query...')
    const playgroundQuery = `*[_type == "playgroundExperiment"]|order(metadata.publishDate desc){
      "slug": slug.current,
      title,
      subtitle,
      description,
      intensity,
      visual,
      content,
      heroImage{
        asset->{
          _id,
          url,
          metadata
        },
        alt,
        hotspot
      },
      gallery[]{
        asset->{
          _id,
          url,
          metadata
        },
        alt,
        caption,
        hotspot
      },
      attachments[]{
        asset->{
          _id,
          url,
          originalFilename,
          size
        },
        title,
        description
      },
      metadata
    }`

    const experiments = await client.fetch(playgroundQuery)
    console.log(`✅ Experiments: ${experiments.length} found`)

    if (experiments.length > 0) {
      console.log('\n🧪 First Experiment:')
      const first = experiments[0]
      console.log(`   • Title: ${first.title}`)
      console.log(`   • Slug: ${first.slug}`)
      console.log(`   • Visual: ${first.visual}`)
      console.log(`   • Intensity: ${first.intensity}`)
      console.log(`   • Category: ${first.metadata?.category}`)
      console.log(`   • Hero Image: ${first.heroImage ? '✅ Present' : '❌ Missing'}`)
    }

    // Test featured project logic from Index.tsx
    console.log('\n3️⃣ Testing featured project logic...')
    const featuredProject = workProjects.find(p => p.metadata.featured) || workProjects[0]
    if (featuredProject) {
      console.log(`✅ Featured Project: ${featuredProject.title}`)
      console.log(`   • Is Featured: ${featuredProject.metadata?.featured}`)
    } else {
      console.log('❌ No featured project found!')
    }

    const otherProjects = featuredProject
      ? workProjects.filter(p => p.slug !== featuredProject.slug).slice(0, 6)
      : []
    console.log(`✅ Other Projects: ${otherProjects.length} found`)

    // Test environment variables
    console.log('\n4️⃣ Testing environment...')
    console.log(`   • Project ID: c0rjrvm3`)
    console.log(`   • Dataset: production`)
    console.log(`   • API Version: 2024-01-01`)
    console.log(`   • Use CDN: true`)

    console.log('\n🎯 Summary:')
    console.log(`   • Work Projects loaded: ${workProjects.length}`)
    console.log(`   • Experiments loaded: ${experiments.length}`)
    console.log(`   • Featured project: ${featuredProject ? 'Found' : 'Missing'}`)
    console.log(`   • Data structure: ${workProjects.length > 0 ? 'Valid' : 'Invalid'}`)

    if (workProjects.length === 0 && experiments.length === 0) {
      console.log('\n❌ ISSUE: No data found - check Sanity Studio content')
    } else if (!featuredProject) {
      console.log('\n❌ ISSUE: No featured project found - check metadata.featured field')
    } else {
      console.log('\n✅ Data looks good - issue might be in React app rendering')
    }

  } catch (error) {
    console.error('\n❌ Error during debug:', error)
  }
}

debugFrontendData()
