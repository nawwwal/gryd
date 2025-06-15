
import React from 'react';

interface CodeDemoProps {
  title?: string;
  language?: string;
  children: React.ReactNode;
}

export const CodeDemo = ({ title, language = 'javascript', children }: CodeDemoProps) => {
  return (
    <div className="code-demo border border-gryd-soft/20 rounded-lg overflow-hidden my-8">
      {title && (
        <div className="bg-gryd-soft/5 px-4 py-2 border-b border-gryd-soft/20">
          <span className="caption text-gryd-soft">{language}</span>
          <h4 className="body font-medium">{title}</h4>
        </div>
      )}
      <div className="p-4 bg-gryd-bg font-mono text-sm overflow-x-auto">
        <pre className="text-gryd-text">{children}</pre>
      </div>
    </div>
  );
};

interface PhotoGalleryProps {
  images: string[];
  caption?: string;
}

export const PhotoGallery = ({ images, caption }: PhotoGalleryProps) => {
  return (
    <div className="photo-gallery my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      {caption && (
        <p className="caption text-gryd-soft mt-4 text-center">{caption}</p>
      )}
    </div>
  );
};

interface VideoEmbedProps {
  src: string;
  title?: string;
  caption?: string;
}

export const VideoEmbed = ({ src, title, caption }: VideoEmbedProps) => {
  return (
    <div className="video-embed my-8">
      <div className="aspect-video rounded-lg overflow-hidden bg-gryd-soft/10">
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
      {caption && (
        <p className="caption text-gryd-soft mt-4 text-center">{caption}</p>
      )}
    </div>
  );
};

interface ColorPaletteProps {
  colors: { name: string; hex: string; description?: string }[];
}

export const ColorPalette = ({ colors }: ColorPaletteProps) => {
  return (
    <div className="color-palette my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="color-swatch">
            <div 
              className="w-full h-20 rounded-lg mb-2"
              style={{ backgroundColor: color.hex }}
            />
            <div className="caption">
              <div className="font-medium">{color.name}</div>
              <div className="text-gryd-soft">{color.hex}</div>
              {color.description && (
                <p className="text-xs mt-1">{color.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BeforeAfterProps {
  before: {
    image: string;
    caption: string;
  };
  after: {
    image: string;
    caption: string;
  };
}

export const BeforeAfter = ({ before, after }: BeforeAfterProps) => {
  return (
    <div className="before-after my-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="subhead text-red-500">Before</h4>
          <img src={before.image} alt="Before" className="w-full rounded-lg" />
          <p className="caption text-gryd-soft">{before.caption}</p>
        </div>
        <div className="space-y-4">
          <h4 className="subhead text-green-500">After</h4>
          <img src={after.image} alt="After" className="w-full rounded-lg" />
          <p className="caption text-gryd-soft">{after.caption}</p>
        </div>
      </div>
    </div>
  );
};

// Export all components for MDX
export const mdxComponents = {
  CodeDemo,
  PhotoGallery,
  VideoEmbed,
  ColorPalette,
  BeforeAfter,
};
