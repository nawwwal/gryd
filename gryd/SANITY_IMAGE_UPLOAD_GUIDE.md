# 🖼️ Sanity Native Image Upload Guide

## ✅ **Updated Schema: Native Asset Management**

Your Sanity Studio now supports native image uploads following the [official asset management documentation](https://www.sanity.io/docs/content-lake/assets). No more manual URL entries - just drag, drop, and upload!

## 🎯 **What's Changed**

### ✅ **Before (URL-based)**
```typescript
// Old approach - manual URL entry
assets: {
  hero: 'https://example.com/image.jpg',
  gallery: ['url1', 'url2', 'url3']
}
```

### 🚀 **After (Native Upload)**
```typescript
// New approach - direct uploads with metadata
heroImage: {
  _type: 'image',
  asset: { /* Sanity asset reference */ },
  alt: 'Alternative text',
  hotspot: { /* Smart cropping data */ }
}

gallery: [
  {
    _type: 'image',
    asset: { /* Sanity asset reference */ },
    alt: 'Alt text',
    caption: 'Image caption'
  }
]
```

## 📋 **New Image Fields**

### 🎨 **Work Projects & Playground Experiments**

1. **Hero Image** (`heroImage`)
   - Direct image upload with hotspot
   - Alternative text for accessibility
   - Automatic [metadata extraction](https://www.sanity.io/docs/apis-and-sdks/image-metadata)

2. **Image Gallery** (`gallery`)
   - Array of images with individual settings
   - Captions and alt text for each image
   - Hotspot cropping for responsive design

3. **File Attachments** (`attachments`)
   - Upload PDFs, documents, code files
   - Custom titles and descriptions
   - Automatic file metadata

## 🌟 **Sanity Features You Get**

### 📸 **Automatic Image Processing**
- **Metadata Extraction**: Dimensions, color palettes, EXIF data
- **Smart Cropping**: Hotspot functionality for responsive design
- **Format Optimization**: WebP conversion, compression
- **CDN Delivery**: Global content delivery via [Sanity's CDN](https://www.sanity.io/docs/apis-and-sdks/asset-cdn)

### 🎨 **Built-in Transformations**
```typescript
// Automatic URL generation with transformations
const imageUrl = urlFor(image)
  .width(800)
  .height(600)
  .crop('center')
  .format('webp')
  .url()
```

### 🔍 **Rich Metadata**
According to the [image metadata documentation](https://www.sanity.io/docs/apis-and-sdks/image-metadata):
- **Always included**: Dimensions, transparency, aspect ratio
- **Generated on upload**: Color palettes, blur hashes, LQIP placeholders
- **Optional**: EXIF data, location information

## 🎯 **How to Use in Studio**

### 1. **Upload Hero Images**
1. Navigate to your project in https://gryd.sanity.studio/
2. Click on "Hero Image" field
3. Drag & drop or click to upload
4. Set hotspot for smart cropping
5. Add alternative text

### 2. **Build Image Galleries**
1. Click "Add item" in Image Gallery
2. Upload multiple images
3. Add captions and alt text
4. Reorder by dragging

### 3. **Attach Files**
1. Use "Project Attachments" or "Experiment Files"
2. Upload PDFs, documents, code files
3. Add descriptive titles and descriptions

## 🔄 **Frontend Integration**

### 📦 **Install Image URL Builder**
```bash
npm install @sanity/image-url
```

### 🛠️ **Update Your Content Loader**

```typescript
// In your contentLoader.ts - Updated queries
const workProjectsQuery = `*[_type == "workProject"]|order(metadata.publishDate desc){
  "slug": slug.current,
  title,
  subtitle,
  description,
  timeline,
  impact,
  content,
  heroImage{
    asset->,
    alt,
    hotspot
  },
  gallery[]{
    asset->,
    alt,
    caption,
    hotspot
  },
  attachments[]{
    asset->,
    title,
    description
  },
  metadata
}`
```

### 🖼️ **Image Component Helper**

```typescript
// utils/imageUtils.ts
import imageUrlBuilder from '@sanity/image-url'
import client from '../lib/sanityClient'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage in components
const heroUrl = urlFor(project.heroImage)
  .width(1200)
  .height(600)
  .crop('center')
  .format('webp')
  .url()
```

## 📊 **Benefits of Native Upload**

### ✅ **Performance**
- **CDN Delivery**: Global distribution
- **Automatic Optimization**: WebP conversion, compression
- **Smart Caching**: Content-based URLs

### ✅ **User Experience**
- **Drag & Drop**: Intuitive upload interface
- **Preview**: Immediate image previews
- **Hotspot**: Visual cropping tool

### ✅ **Developer Experience**
- **Type Safety**: Proper TypeScript types
- **Transformations**: URL-based image manipulation
- **Metadata**: Rich image information

### ✅ **Accessibility**
- **Alt Text**: Built-in accessibility support
- **Captions**: Descriptive image content
- **WCAG Compliance**: Accessibility best practices

## 🎨 **Image Transformation Examples**

```typescript
// Responsive hero image
const heroImage = urlFor(project.heroImage)
  .width(1200)
  .height(600)
  .crop('center')
  .format('webp')
  .url()

// Gallery thumbnails
const thumbnail = urlFor(galleryImage)
  .width(300)
  .height(300)
  .crop('center')
  .format('webp')
  .url()

// Mobile optimized
const mobileImage = urlFor(project.heroImage)
  .width(768)
  .height(400)
  .crop('center')
  .format('webp')
  .quality(80)
  .url()
```

## 🚀 **Ready to Use**

Your Studio is now equipped with professional-grade asset management:

1. **✅ Visit**: https://gryd.sanity.studio/
2. **✅ Upload**: Native image and file support
3. **✅ Optimize**: Automatic transformations and CDN
4. **✅ Access**: Rich metadata and smart cropping

## 📚 **Resources**

- [Sanity Asset Management](https://www.sanity.io/docs/content-lake/assets)
- [Image Upload Guide](https://www.sanity.io/docs/content-lake/manage-assets)
- [Image Metadata](https://www.sanity.io/docs/apis-and-sdks/image-metadata)
- [Asset CDN](https://www.sanity.io/docs/apis-and-sdks/asset-cdn)
- [Image URL Builder](https://www.sanity.io/docs/image-url)

---

**🎉 You now have professional asset management with Sanity's native upload system!**
