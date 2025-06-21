import React from 'react';
import { getSanityImageUrl } from '../../utils/imageUtils';
import type { SanityImage } from '../../types/content';

// Enhanced Code Demo Component
interface CodeDemoProps {
  title?: string;
  language?: string;
  code: string;
  description?: string;
}

export const CodeDemo = ({ title, language = 'javascript', code, description }: CodeDemoProps) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="code-demo border border-gryd-soft/20 rounded-lg overflow-hidden my-8">
      <div className="bg-gryd-soft/5 px-4 py-3 border-b border-gryd-soft/20 flex justify-between items-center">
        <div>
          <span className="caption text-gryd-soft uppercase tracking-wide">{language}</span>
          {title && <h4 className="body font-medium mt-1">{title}</h4>}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs px-3 py-1 bg-gryd-accent/10 text-gryd-accent rounded hover:bg-gryd-accent/20 transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-4 bg-gryd-bg font-mono text-sm overflow-x-auto">
        <pre className="text-gryd-text whitespace-pre-wrap">{code}</pre>
      </div>
      {description && (
        <div className="px-4 py-3 bg-gryd-soft/5 border-t border-gryd-soft/20">
          <p className="caption text-gryd-soft">{description}</p>
        </div>
      )}
    </div>
  );
};

// Enhanced Image Gallery Component
interface ImageGalleryProps {
  title?: string;
  layout?: 'grid' | 'masonry' | 'carousel' | 'before-after';
  images: Array<{
    asset: any;
    alt?: string;
    caption?: string;
  }>;
  caption?: string;
}

export const ImageGallery = ({ title, layout = 'grid', images, caption }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const getGridLayout = () => {
    switch (layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-4';
      case 'carousel':
        return 'flex overflow-x-auto gap-4 pb-4';
      case 'before-after':
        return 'grid md:grid-cols-2 gap-8';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className="image-gallery my-8">
      {title && <h3 className="headline-small mb-6">{title}</h3>}

      <div className={getGridLayout()}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`
              group cursor-pointer
              ${layout === 'carousel' ? 'flex-shrink-0 w-80' : ''}
              ${layout === 'masonry' ? 'break-inside-avoid mb-4' : ''}
            `}
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative overflow-hidden rounded-lg bg-gryd-soft/10">
              <img
                src={getSanityImageUrl(image, {
                  width: layout === 'carousel' ? 320 : 600,
                  height: layout === 'before-after' ? 400 : undefined,
                  adaptive: true
                }) || ''}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            {image.caption && (
              <p className="caption text-gryd-soft mt-2">{image.caption}</p>
            )}
          </div>
        ))}
      </div>

      {caption && (
        <p className="caption text-gryd-soft mt-6 text-center italic">{caption}</p>
      )}

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={getSanityImageUrl(images[selectedImage], {
                width: 1200,
                adaptive: true
              }) || ''}
              alt={images[selectedImage].alt || 'Gallery image'}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Video Embed Component
interface VideoEmbedProps {
  title?: string;
  url: string;
  caption?: string;
  autoplay?: boolean;
}

export const VideoEmbed = ({ title, url, caption, autoplay = false }: VideoEmbedProps) => {
  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;
    }

    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}${autoplay ? '?autoplay=1' : ''}`;
    }

    // Direct video URL
    return url;
  };

  return (
    <div className="video-embed my-8">
      {title && <h3 className="headline-small mb-4">{title}</h3>}

      <div className="aspect-video rounded-lg overflow-hidden bg-gryd-soft/10 shadow-lg">
        {url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') ? (
          <iframe
            src={getEmbedUrl(url)}
            title={title || 'Video'}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <video
            src={url}
            title={title}
            className="w-full h-full object-cover"
            controls
            autoPlay={autoplay}
          />
        )}
      </div>

      {caption && (
        <p className="caption text-gryd-soft mt-4 text-center italic">{caption}</p>
      )}
    </div>
  );
};

// Project Timeline Component
interface ProjectTimelineProps {
  title?: string;
  events: Array<{
    date: string;
    title: string;
    description?: string;
    status: 'completed' | 'in-progress' | 'planned' | 'cancelled';
  }>;
}

export const ProjectTimeline = ({ title = 'Project Timeline', events }: ProjectTimelineProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-orange-500';
      case 'planned': return 'bg-blue-500';
      case 'cancelled': return 'bg-gray-400';
      default: return 'bg-gryd-accent';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="project-timeline my-8">
      <h3 className="headline-small mb-8">{title}</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gryd-soft/30" />

        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className={`
                relative z-10 w-8 h-8 rounded-full border-4 border-white shadow-lg
                ${getStatusColor(event.status)}
              `} />

              {/* Event content */}
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <time className="text-sm font-medium text-gryd-accent">{event.date}</time>
                  <span className={`
                    text-xs px-2 py-1 rounded-full text-white
                    ${getStatusColor(event.status)}
                  `}>
                    {getStatusText(event.status)}
                  </span>
                </div>
                <h4 className="subhead mb-2">{event.title}</h4>
                {event.description && (
                  <p className="body text-gryd-soft">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tech Stack Component
interface TechStackProps {
  title?: string;
  categories: Array<{
    category: string;
    technologies: Array<{
      name: string;
      description?: string;
      icon?: SanityImage;
      color?: string;
    }>;
  }>;
}

export const TechStack = ({ title = 'Technologies Used', categories }: TechStackProps) => {
  return (
    <div className="tech-stack my-8">
      <h3 className="headline-small mb-8">{title}</h3>

      <div className="space-y-8">
        {categories.map((category, index) => (
          <div key={index}>
            <h4 className="subhead text-gryd-accent mb-4">{category.category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className="tech-card p-4 border border-gryd-soft/20 rounded-lg hover:border-gryd-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {tech.icon && (
                      <img
                        src={getSanityImageUrl(tech.icon, { width: 32, height: 32 }) || ''}
                        alt={`${tech.name} icon`}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    {tech.color && !tech.icon && (
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: tech.color }}
                      />
                    )}
                    <h5 className="font-semibold">{tech.name}</h5>
                  </div>
                  {tech.description && (
                    <p className="caption text-gryd-soft">{tech.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Callout Component
interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error' | 'note';
  title?: string;
  content: string;
}

export const Callout = ({ type = 'info', title, content }: CalloutProps) => {
  const getCalloutStyles = () => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'note':
        return 'border-purple-200 bg-purple-50 text-purple-800';
      default:
        return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'error': return '❌';
      case 'note': return '📝';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`callout p-4 border-l-4 rounded-r-lg my-6 ${getCalloutStyles()}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{getIcon()}</span>
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const richContentComponents = {
  CodeDemo,
  ImageGallery,
  VideoEmbed,
  ProjectTimeline,
  TechStack,
  Callout,
};
