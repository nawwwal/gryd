/**
 * Content Block Examples for THE GRYD
 * Reference implementations for MDX content blocks
 */

import React from 'react'

// ==========================================================================
// CODE DEMO BLOCK EXAMPLE
// ==========================================================================

interface CodeDemoProps {
  title?: string
  language: string
  code: string
  description?: string
}

export const CodeDemo = ({ title, language, code, description }: CodeDemoProps) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-demo magazine-element my-8">
      {title && (
        <h3 className="font-platypi text-xl font-bold uppercase tracking-tight mb-4">
          {title}
        </h3>
      )}

      <div className="relative">
        <div className="flex justify-between items-center bg-gryd-soft/10 px-4 py-2 rounded-t-lg">
          <span className="font-jetbrains text-xs uppercase tracking-wide text-gryd-soft">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="font-jetbrains text-xs px-2 py-1 bg-gryd-accent text-white rounded
                     hover:bg-gryd-accent/90 transition-colors"
          >
            {copied ? 'copied!' : 'copy'}
          </button>
        </div>

        <pre className="bg-gryd-text text-gryd-bg p-4 rounded-b-lg overflow-x-auto">
          <code className="font-jetbrains text-sm leading-relaxed">
            {code}
          </code>
        </pre>
      </div>

      {description && (
        <p className="font-fraunces text-gryd-soft mt-4 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

// ==========================================================================
// IMAGE GALLERY BLOCK EXAMPLE
// ==========================================================================

interface ImageGalleryProps {
  title?: string
  layout: 'grid' | 'masonry' | 'carousel' | 'before-after'
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  caption?: string
}

export const ImageGallery = ({ title, layout, images, caption }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null)

  const layoutClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    masonry: 'columns-1 md:columns-2 lg:columns-3 gap-4',
    carousel: 'flex overflow-x-auto gap-4 pb-4',
    'before-after': 'grid grid-cols-1 md:grid-cols-2 gap-4'
  }

  return (
    <div className="image-gallery magazine-element my-8">
      {title && (
        <h3 className="font-platypi text-xl font-bold uppercase tracking-tight mb-6">
          {title}
        </h3>
      )}

      <div className={layoutClasses[layout]}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-lg transition-all duration-200
                       group-hover:shadow-lg group-hover:scale-[1.02]"
              loading="lazy"
            />
            {image.caption && (
              <p className="font-fraunces text-sm text-gryd-soft mt-2 leading-relaxed">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {caption && (
        <p className="font-fraunces text-gryd-soft mt-6 leading-relaxed text-center">
          {caption}
        </p>
      )}

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}

// ==========================================================================
// CALLOUT BLOCK EXAMPLE
// ==========================================================================

interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'error' | 'note'
  title?: string
  content: string
}

export const Callout = ({ type, title, content }: CalloutProps) => {
  const typeStyles = {
    info: 'border-blue-200 bg-blue-50 text-blue-900',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
    success: 'border-green-200 bg-green-50 text-green-900',
    error: 'border-red-200 bg-red-50 text-red-900',
    note: 'border-gryd-soft/20 bg-gryd-soft/5 text-gryd-text'
  }

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
    note: '📝'
  }

  return (
    <div className={`callout magazine-element my-6 p-4 border-l-4 rounded-r-lg ${typeStyles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg" role="img" aria-label={type}>
          {icons[type]}
        </span>
        <div className="flex-1">
          {title && (
            <h4 className="font-platypi font-bold uppercase tracking-tight mb-2">
              {title}
            </h4>
          )}
          <p className="font-fraunces leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  )
}

// ==========================================================================
// PROJECT TIMELINE BLOCK EXAMPLE
// ==========================================================================

interface ProjectTimelineProps {
  title?: string
  events: Array<{
    title: string
    date: string
    status: 'completed' | 'in-progress' | 'planned' | 'cancelled'
    description?: string
  }>
}

export const ProjectTimeline = ({ title, events }: ProjectTimelineProps) => {
  const statusStyles = {
    completed: 'bg-green-500',
    'in-progress': 'bg-yellow-500',
    planned: 'bg-blue-500',
    cancelled: 'bg-red-500'
  }

  return (
    <div className="project-timeline magazine-element my-8">
      {title && (
        <h3 className="font-platypi text-xl font-bold uppercase tracking-tight mb-6">
          {title}
        </h3>
      )}

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gryd-soft/20"></div>

        {events.map((event, index) => (
          <div key={index} className="relative flex items-start gap-4 pb-8 last:pb-0">
            {/* Status indicator */}
            <div
              className={`w-3 h-3 rounded-full border-2 border-white z-10 ${statusStyles[event.status]}`}
              title={event.status}
            ></div>

            {/* Event content */}
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-platypi font-bold">{event.title}</h4>
                <span className="font-jetbrains text-xs text-gryd-soft uppercase tracking-wide">
                  {event.date}
                </span>
              </div>
              {event.description && (
                <p className="font-fraunces text-gryd-soft leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==========================================================================
// TECH STACK BLOCK EXAMPLE
// ==========================================================================

interface TechStackProps {
  title?: string
  categories: Array<{
    category: string
    technologies: Array<{
      name: string
      icon?: string
      description?: string
      url?: string
    }>
  }>
}

export const TechStack = ({ title, categories }: TechStackProps) => {
  return (
    <div className="tech-stack magazine-element my-8">
      {title && (
        <h3 className="font-platypi text-xl font-bold uppercase tracking-tight mb-6">
          {title}
        </h3>
      )}

      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={index}>
            <h4 className="font-fraunces text-lg font-medium mb-3 text-gryd-soft">
              {category.category}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {category.technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className="flex items-center gap-2 p-3 bg-gryd-soft/5 rounded-lg
                           hover:bg-gryd-soft/10 transition-colors"
                >
                  {tech.icon && (
                    <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                  )}
                  <span className="font-fraunces text-sm">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
