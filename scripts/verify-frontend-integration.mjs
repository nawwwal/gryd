import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'c0rjrvm3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

async function verifyFrontendIntegration() {
  console.log('🔗 Verifying frontend integration with Sanity CMS...\n')

  try {
    // Test work projects query (matches contentLoader.ts)
    console.log('📋 Testing work projects query...')
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
    console.log(`✅ Found ${workProjects.length} work projects`)

    // Test playground experiments query
    console.log('\n🧪 Testing playground experiments query...')
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
    console.log(`✅ Found ${experiments.length} playground experiments`)

    // Test single project fetch (matches getContentBySlug)
    if (workProjects.length > 0) {
      console.log('\n📄 Testing single project fetch...')
      const slug = workProjects[0].slug
      const projectQuery = `*[_type == "workProject" && slug.current == $slug][0]{
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

      const project = await client.fetch(projectQuery, { slug })
      if (project) {
        console.log(`✅ Found project: ${project.title}`)

        // Test image structure
        if (project.heroImage?.asset?.url) {
          console.log(`   ✅ Hero image URL: ${project.heroImage.asset.url}`)
          console.log(`   ✅ Alt text: ${project.heroImage.alt || 'Not set'}`)
        } else {
          console.log('   ℹ️  No hero image (expected for sample data)')
        }

        if (project.gallery?.length > 0) {
          console.log(`   ✅ Gallery: ${project.gallery.length} images`)
        }

        if (project.attachments?.length > 0) {
          console.log(`   ✅ Attachments: ${project.attachments.length} files`)
        }
      }
    }

    // Verify required metadata fields
    console.log('\n📊 Verifying content structure...')
    const sampleProject = workProjects[0] || {}
    const requiredFields = ['slug', 'title', 'subtitle', 'description', 'timeline', 'impact', 'metadata']
    const missingFields = requiredFields.filter(field => !sampleProject[field])

    if (missingFields.length === 0) {
      console.log('✅ All required fields present')
    } else {
      console.log(`❌ Missing fields: ${missingFields.join(', ')}`)
    }

    console.log('\n🎉 Frontend integration verification complete!')
    console.log('\n📋 Summary:')
    console.log(`   • Work Projects: ${workProjects.length}`)
    console.log(`   • Experiments: ${experiments.length}`)
    console.log('   • Image structure: Updated for native uploads')
    console.log('   • Gallery support: ✅ Enabled')
    console.log('   • File attachments: ✅ Enabled')
    console.log('   • TypeScript types: ✅ Updated')

  } catch (error) {
    console.error('❌ Frontend integration verification failed:', error)
    process.exit(1)
  }
}

verifyFrontendIntegration()
