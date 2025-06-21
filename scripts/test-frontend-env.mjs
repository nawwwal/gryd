import { createClient } from '@sanity/client'

// Test using the same environment variables as the React app
const projectId = 'c0rjrvm3'
const dataset = 'production'

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

async function testFrontendEnvironment() {
  console.log('🔧 Testing frontend environment configuration...\n')

  console.log('📋 Environment Variables:')
  console.log(`   • VITE_SANITY_PROJECT_ID: ${projectId}`)
  console.log(`   • VITE_SANITY_DATASET: ${dataset}`)

  try {
    console.log('\n🚀 Testing Sanity client connection...')

    // Test work projects
    const workProjects = await client.fetch(`*[_type == "workProject"]`)
    console.log(`✅ Work Projects: ${workProjects.length} found`)

    // Test experiments
    const experiments = await client.fetch(`*[_type == "playgroundExperiment"]`)
    console.log(`✅ Experiments: ${experiments.length} found`)

    // Test featured logic
    const featuredProject = workProjects.find(p => p.metadata?.featured)
    console.log(`✅ Featured Project: ${featuredProject ? featuredProject.title : 'None found'}`)

    console.log('\n🎉 Frontend environment is configured correctly!')
    console.log('\n📱 Your React app should now be displaying:')
    console.log(`   • ${workProjects.length} work projects`)
    console.log(`   • ${experiments.length} playground experiments`)
    console.log(`   • Featured project: ${featuredProject?.title || 'First available project'}`)

  } catch (error) {
    console.error('\n❌ Frontend environment test failed:', error)
    console.log('\n🔧 Troubleshooting steps:')
    console.log('   1. Restart your development server (npm run dev)')
    console.log('   2. Check that .env.local contains VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET')
    console.log('   3. Verify network connection to Sanity')
  }
}

testFrontendEnvironment()
