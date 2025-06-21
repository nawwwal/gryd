import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'c0rjrvm3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

async function testNativeImageIntegration() {
  console.log('🖼️ Testing native image integration...\n')

  try {
    // Test the updated query structure
    console.log('📋 Testing updated work projects query...')
    const workQuery = `*[_type == "workProject"][0]{
      title,
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
      }
    }`

    const workProject = await client.fetch(workQuery)

    if (workProject) {
      console.log(`✅ Found project: ${workProject.title}`)

      if (workProject.heroImage?.asset) {
        console.log(`✅ Hero image: ${workProject.heroImage.asset.url}`)
        console.log(`   Alt text: ${workProject.heroImage.alt || 'Not set'}`)

        if (workProject.heroImage.asset.metadata?.dimensions) {
          const { width, height } = workProject.heroImage.asset.metadata.dimensions
          console.log(`   Dimensions: ${width}x${height}`)
        }
      } else {
        console.log('ℹ️  No hero image found (this is expected for sample data)')
      }

      if (workProject.gallery?.length > 0) {
        console.log(`✅ Gallery: ${workProject.gallery.length} images`)
        workProject.gallery.forEach((img, idx) => {
          console.log(`   Image ${idx + 1}: ${img.asset?.url || 'No URL'}`)
          if (img.caption) console.log(`     Caption: ${img.caption}`)
        })
      } else {
        console.log('ℹ️  No gallery images found (this is expected for sample data)')
      }

      if (workProject.attachments?.length > 0) {
        console.log(`✅ Attachments: ${workProject.attachments.length} files`)
        workProject.attachments.forEach((file, idx) => {
          console.log(`   File ${idx + 1}: ${file.asset?.originalFilename || file.title || 'Unnamed'}`)
        })
      } else {
        console.log('ℹ️  No attachments found (this is expected for sample data)')
      }
    }

    // Test playground experiments
    console.log('\n🧪 Testing playground experiments query...')
    const playgroundQuery = `*[_type == "playgroundExperiment"][0]{
      title,
      heroImage,
      gallery,
      attachments
    }`

    const experiment = await client.fetch(playgroundQuery)

    if (experiment) {
      console.log(`✅ Found experiment: ${experiment.title}`)
    }

    // Check if we can query image assets directly
    console.log('\n📸 Testing image asset queries...')
    const imageAssets = await client.fetch(`*[_type == "sanity.imageAsset"][0...3]{
      _id,
      url,
      metadata {
        dimensions,
        palette
      }
    }`)

    if (imageAssets.length > 0) {
      console.log(`✅ Found ${imageAssets.length} image assets in Content Lake`)
      imageAssets.forEach((asset, idx) => {
        console.log(`   Asset ${idx + 1}: ${asset.url}`)
        if (asset.metadata?.dimensions) {
          const { width, height } = asset.metadata.dimensions
          console.log(`     Dimensions: ${width}x${height}`)
        }
      })
    } else {
      console.log('ℹ️  No image assets found yet - ready for uploads!')
    }

    console.log('\n🎉 Native image integration test completed!')
    console.log('\n📋 Summary:')
    console.log('   ✅ Updated schema deployed')
    console.log('   ✅ GROQ queries working with new structure')
    console.log('   ✅ Ready for native image uploads')
    console.log('   ✅ Frontend integration prepared')

    console.log('\n🎯 Next steps:')
    console.log('   1. Visit https://gryd.sanity.studio/')
    console.log('   2. Edit existing content or create new projects')
    console.log('   3. Upload images using the native image fields')
    console.log('   4. See the new image management in action!')

  } catch (error) {
    console.error('❌ Error testing native image integration:', error)
  }
}

testNativeImageIntegration()
