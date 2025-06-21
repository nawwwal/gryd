# Sanity Integration Scripts

## 🚀 Final Sanity Test Script

The `final-sanity-test.mjs` script is your comprehensive tool for testing and managing the Sanity CMS integration.

### Usage

```bash
# Test the current integration
npm run test:sanity

# Seed sample data
npm run seed:sanity

# Fix existing projects by adding hero images
npm run fix:images

# Or run directly:
node scripts/final-sanity-test.mjs [options]
```

### Options

- `--seed`: Create sample projects and experiments with proper hero images
- `--fix-images`: Add hero images to existing projects that don't have them
- No options: Run comprehensive integration test

### What the Test Checks

1. **🔗 Connection**: Verifies Sanity client connectivity
2. **📊 Data Queries**: Tests exact same queries used by the frontend
3. **⭐ Featured Logic**: Checks featured project identification
4. **🖼️ Hero Images**: Validates image structure and mapping
5. **📄 Single Fetch**: Tests individual project retrieval
6. **🎨 Image Assets**: Lists available images in Content Lake
7. **⚙️ Environment**: Confirms configuration
8. **📱 Frontend Ready**: Validates complete data structure

### Features

- **Visual Featured Indicators**: Projects marked with ⭐ in Sanity Studio
- **Hero Image Fixing**: Automatically connects existing images to projects
- **Comprehensive Testing**: Covers all frontend integration points
- **Clear Diagnostics**: Shows exactly what's working and what needs attention

### Troubleshooting

If hero images aren't displaying:
1. Run `npm run fix:images` to connect existing images
2. Upload new images in Sanity Studio
3. Check that projects have the hero image field populated

### Studio Access

Visit [https://gryd.sanity.studio/](https://gryd.sanity.studio/) to:
- Upload hero images
- Mark projects as featured (⭐ Featured Project field)
- Edit content and metadata
