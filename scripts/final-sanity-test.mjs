import { createClient } from '@sanity/client'

// Test client with hardcoded values for reliability
const client = createClient({
  projectId: 'c0rjrvm3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Test client with write capabilities for seeding data
const writeClient = createClient({
  projectId: 'c0rjrvm3',
  dataset: 'production',
  token: 'skChPZPvdvDJZXfRQfHEKg6v8igqnMnxCUjtZtT3e1yWlxNTXijpzfileJykHhZVgReR456WPnQQ9FAiqeFGKtgWANYUNyHhaamMXNxJC550tQa38VEX4qyKnZ6orcMwmrDIbKW2dHfF5A8tuliRwYo0Bun0yZFx0tZHKvBR9TROSkptFQ3O',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function comprehensiveSanityTest() {
  console.log('🚀 Comprehensive Sanity Integration Test')
  console.log('=========================================\n')

  try {
    // 1. Test Connection
    console.log('1️⃣ Testing Sanity Connection...')
    const connectionTest = await client.fetch('*[_type == "workProject"][0...1]')
    console.log('✅ Connection successful!')

    // 2. Test Frontend Queries (exact same as contentLoader.ts)
    console.log('\n2️⃣ Testing Frontend Data Queries...')

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

    const [workProjects, experiments] = await Promise.all([
      client.fetch(workQuery),
      client.fetch(playgroundQuery)
    ])

    console.log(`✅ Work Projects: ${workProjects.length} found`)
    console.log(`✅ Experiments: ${experiments.length} found`)

    // 3. Test Featured Project Logic (exact same as Index.tsx)
    console.log('\n3️⃣ Testing Featured Project Logic...')
    const featuredProject = workProjects.find(p => p.metadata?.featured) || workProjects[0]

    if (featuredProject) {
      console.log(`✅ Featured Project: "${featuredProject.title}"`)
      console.log(`   • Is explicitly featured: ${featuredProject.metadata?.featured ? 'YES' : 'NO (using first project)'}`)
      console.log(`   • Category: ${featuredProject.metadata?.category}`)
      console.log(`   • Status: ${featuredProject.metadata?.status}`)
    } else {
      console.log('❌ No featured project found!')
    }

    const otherProjects = featuredProject
      ? workProjects.filter(p => p.slug !== featuredProject.slug).slice(0, 6)
      : []
    console.log(`✅ Other Projects for grid: ${otherProjects.length}`)

    // 4. Test Hero Image Structure and Mapping
    console.log('\n4️⃣ Testing Hero Image Structure and Mapping...')
    if (featuredProject?.heroImage) {
      const heroImage = featuredProject.heroImage
      if (heroImage.asset?.url) {
        console.log(`✅ Hero image URL: ${heroImage.asset.url}`)
        console.log(`   • Alt text: ${heroImage.alt || 'Not set'}`)
        console.log(`   • Has hotspot: ${heroImage.hotspot ? 'Yes' : 'No'}`)

        if (heroImage.asset.metadata?.dimensions) {
          const { width, height } = heroImage.asset.metadata.dimensions
          console.log(`   • Dimensions: ${width}x${height}`)
        }
      } else {
        console.log('❌ Hero image structure incorrect - missing asset.url')
        console.log('   Structure received:', JSON.stringify(heroImage, null, 2))
      }
    } else {
      console.log('⚠️  No hero image on featured project')
      console.log('   This is why frontend is using placeholder images')
      console.log('   Solution: Upload and connect hero images in Sanity Studio')
    }

    // Test image mapping for all projects
    console.log('\n📊 Hero Image Status for All Projects:')
    workProjects.forEach((project, index) => {
      const hasHero = project.heroImage?.asset?.url ? '✅' : '❌'
      const hasGallery = project.gallery?.length ? `📸 ${project.gallery.length}` : '📭'
      console.log(`   ${index + 1}. "${project.title}": Hero ${hasHero} | Gallery ${hasGallery}`)
    })

    // 5. Test Single Project Fetch (ProjectDetail.tsx logic)
    if (workProjects.length > 0) {
      console.log('\n5️⃣ Testing Single Project Fetch...')
      const testSlug = workProjects[0].slug
      const singleProjectQuery = `*[_type == "workProject" && slug.current == $slug][0]{
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

      const singleProject = await client.fetch(singleProjectQuery, { slug: testSlug })
      if (singleProject) {
        console.log(`✅ Single project fetch: "${singleProject.title}"`)
        console.log(`   • Hero image: ${singleProject.heroImage?.asset?.url ? 'Present' : 'Missing'}`)
        console.log(`   • Gallery items: ${singleProject.gallery?.length || 0}`)
        console.log(`   • Attachments: ${singleProject.attachments?.length || 0}`)
      }
    }

    // 6. Test Image Assets
    console.log('\n6️⃣ Testing Image Assets...')
    const imageAssets = await client.fetch(`*[_type == "sanity.imageAsset"][0...3]{
      _id,
      url,
      metadata {
        dimensions,
        palette
      }
    }`)

    console.log(`✅ Found ${imageAssets.length} image assets in Content Lake`)
    if (imageAssets.length > 0) {
      imageAssets.forEach((asset, idx) => {
        console.log(`   Asset ${idx + 1}: ${asset.url}`)
        if (asset.metadata?.dimensions) {
          const { width, height } = asset.metadata.dimensions
          console.log(`     Dimensions: ${width}x${height}`)
        }
      })
    }

    // 7. Environment Test
    console.log('\n7️⃣ Testing Environment Configuration...')
    console.log(`   • Project ID: c0rjrvm3`)
    console.log(`   • Dataset: production`)
    console.log(`   • API Version: 2024-01-01`)
    console.log(`   • Use CDN: true`)

    // 8. Frontend Integration Summary
    console.log('\n8️⃣ Frontend Integration Summary...')
    console.log('=================================')

    // Check if we have the right data structure for the frontend
    const hasValidWorkProjects = workProjects.length > 0 && workProjects.every(p =>
      p.slug && p.title && p.subtitle && p.description && p.timeline && p.impact && p.metadata
    )

    const hasValidExperiments = experiments.length > 0 && experiments.every(e =>
      e.slug && e.title && e.subtitle && e.description && e.intensity && e.visual && e.metadata
    )

    console.log(`✅ Work Projects Structure: ${hasValidWorkProjects ? 'Valid' : 'Invalid'}`)
    console.log(`✅ Experiments Structure: ${hasValidExperiments ? 'Valid' : 'Invalid'}`)
    console.log(`✅ Featured Project Logic: ${featuredProject ? 'Working' : 'Needs attention'}`)
    console.log(`✅ Hero Images: ${workProjects.some(p => p.heroImage?.asset?.url) ? 'Native images available' : 'Using placeholders'}`)

    // 9. Recommendations
    console.log('\n9️⃣ Recommendations...')
    console.log('====================')

    if (workProjects.length === 0) {
      console.log('❌ No work projects found - run seeding script or add content in Studio')
    }

    if (!workProjects.some(p => p.metadata?.featured)) {
      console.log('⚠️  No projects marked as featured - set one project as featured in Studio')
    }

    if (!workProjects.some(p => p.heroImage?.asset?.url)) {
      console.log('ℹ️  No native hero images found - upload images in Studio for better visual experience')
    }

    if (workProjects.length > 0 && featuredProject) {
      console.log('✅ All systems ready for frontend display!')
    }

    console.log('\n🎉 Comprehensive test completed!')
    console.log('\n📱 Frontend should now display:')
    console.log(`   • ${workProjects.length} work projects`)
    console.log(`   • ${experiments.length} playground experiments`)
    console.log(`   • Featured project: "${featuredProject?.title || 'None'}"`)
    console.log(`   • Hero images: ${workProjects.some(p => p.heroImage?.asset?.url) ? 'Native' : 'Placeholders'}`)

  } catch (error) {
    console.error('\n❌ Test failed:', error)
    console.log('\n🔧 Troubleshooting:')
    console.log('   1. Check Sanity project configuration')
    console.log('   2. Verify network connection')
    console.log('   3. Ensure content exists in Sanity Studio')
    console.log('   4. Check API permissions')
  }
}

// Function to seed sample data with hero images
async function seedSampleData() {
  console.log('\n🌱 Seeding Sample Data...')

  // First, let's get available image assets to attach to projects
  const imageAssets = await client.fetch(`*[_type == "sanity.imageAsset"][0...2]{
    _id,
    url
  }`)

  console.log(`Found ${imageAssets.length} existing image assets to use`)

  const sampleProjects = [
    {
      _type: 'workProject',
      title: 'Tamed Tax Chaos',
      subtitle: 'Rebuilt checkout flow from scratch',
      description: 'Users were abandoning carts because tax calculation took forever. Fixed it in 72 hours.',
      slug: { _type: 'slug', current: 'tamed-tax-chaos' },
      timeline: '3 days',
      impact: '$50k/month saved',
      content: 'The problem was obvious once you saw it. Users would add items to cart, start checkout, then disappear. Classic abandonment, but at scale that hurt. Dug into the data. Tax calculation was taking 15+ seconds. People thought the site was broken. They were right. Scrapped the entire tax service integration. Built a local lookup table with 99.7% accuracy for common cases. Edge cases got flagged for manual review. Checkout time dropped from 45 seconds to 8 seconds. Conversion jumped from 12% to 31%. Math works when users trust the process.',
      heroImage: imageAssets[0] ? {
        asset: {
          _type: 'reference',
          _ref: imageAssets[0]._id
        },
        alt: 'Tax calculation optimization dashboard'
      } : undefined,
      metadata: {
        type: 'prototype',
        category: 'Product Design',
        status: 'live',
        featured: true,
        publishDate: '2024-01-01',
        lastUpdated: '2024-01-01',
        tools: ['React', 'Node.js'],
        tags: ['ecommerce', 'optimization'],
        difficulty: 'Advanced'
      }
    },
    {
      _type: 'workProject',
      title: 'Channeled Dashboard Doubt',
      subtitle: 'Turned data paralysis into clarity',
      description: 'Sales team had dashboards they never used. Made them obsess over 3 numbers instead.',
      slug: { _type: 'slug', current: 'channeled-dashboard-doubt' },
      timeline: '2 weeks',
      impact: '340% increase in daily active users',
      content: 'Sales team had a dashboard. They never used it. Asked why. "Too much clicking to find what matters." Watched them work for a day. They wanted 3 numbers: pipeline health, monthly recurring revenue, deals closing this week. Everything else was noise. Deleted 80% of the dashboard. Put those 3 numbers front and center. Made them update in real-time. Added context when you hover. Usage went from "occasionally" to "obsessively." Team started making better decisions because they could see what mattered.',
      heroImage: imageAssets[1] ? {
        asset: {
          _type: 'reference',
          _ref: imageAssets[1]._id
        },
        alt: 'Simplified dashboard interface'
      } : undefined,
      metadata: {
        type: 'research',
        category: 'UX Design',
        status: 'live',
        featured: false,
        publishDate: '2024-01-01',
        lastUpdated: '2024-01-01',
        tools: ['Figma', 'D3.js'],
        tags: ['dashboard', 'ux'],
        difficulty: 'Intermediate'
      }
    }
  ]

  const sampleExperiments = [
    {
      _type: 'playgroundExperiment',
      title: 'Gravity Simulation',
      subtitle: 'Testing physics renders',
      description: 'A small demo that shows falling particles with HTML canvas.',
      slug: { _type: 'slug', current: 'gravity-sim' },
      intensity: 'medium',
      visual: 'interactive',
      content: 'Some long form explanation of the experiment results.',
      metadata: {
        type: 'prototype',
        category: 'Code',
        status: 'live',
        featured: false,
        publishDate: '2024-01-01',
        lastUpdated: '2024-01-01',
        tools: ['Canvas'],
        tags: ['physics', 'animation'],
        difficulty: 'Intermediate'
      }
    }
  ]

  try {
    for (const project of sampleProjects) {
      await writeClient.createIfNotExists(project)
      console.log(`✅ Seeded: ${project.title}`)
    }

    for (const experiment of sampleExperiments) {
      await writeClient.createIfNotExists(experiment)
      console.log(`✅ Seeded: ${experiment.title}`)
    }

    console.log('✅ Sample data seeded successfully!')
  } catch (error) {
    console.error('❌ Failed to seed data:', error)
  }
}

// Function to fix existing projects by adding hero images
async function fixExistingProjects() {
  console.log('\n🔧 Fixing Existing Projects...')

  try {
    // Get existing projects without hero images
    const projectsWithoutHero = await client.fetch(`*[_type == "workProject" && !defined(heroImage)]{
      _id,
      title,
      "slug": slug.current
    }`)

    // Get available image assets
    const imageAssets = await client.fetch(`*[_type == "sanity.imageAsset"]{
      _id,
      url
    }`)

    if (projectsWithoutHero.length === 0) {
      console.log('✅ All projects already have hero images!')
      return
    }

    if (imageAssets.length === 0) {
      console.log('❌ No image assets available to assign')
      console.log('   Upload images in Sanity Studio first')
      return
    }

    console.log(`Found ${projectsWithoutHero.length} projects without hero images`)
    console.log(`Found ${imageAssets.length} available image assets`)

    // Assign images to projects
    for (let i = 0; i < projectsWithoutHero.length; i++) {
      const project = projectsWithoutHero[i]
      const imageAsset = imageAssets[i % imageAssets.length] // Cycle through available images

      await writeClient
        .patch(project._id)
        .set({
          heroImage: {
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            },
            alt: `Hero image for ${project.title}`
          }
        })
        .commit()

      console.log(`✅ Added hero image to "${project.title}"`)
    }

    console.log('✅ All projects now have hero images!')

  } catch (error) {
    console.error('❌ Failed to fix existing projects:', error)
  }
}

// Main execution
async function runTests() {
  const args = process.argv.slice(2)

  if (args.includes('--seed')) {
    await seedSampleData()
    console.log('\n' + '='.repeat(50))
  }

  if (args.includes('--fix-images')) {
    await fixExistingProjects()
    console.log('\n' + '='.repeat(50))
  }

  await comprehensiveSanityTest()

  // Show usage help
  if (args.length === 0) {
    console.log('\n📖 Usage Options:')
    console.log('   node final-sanity-test.mjs --seed       # Seed sample data')
    console.log('   node final-sanity-test.mjs --fix-images # Add hero images to existing projects')
    console.log('   node final-sanity-test.mjs              # Run test only')
  }
}

runTests()
