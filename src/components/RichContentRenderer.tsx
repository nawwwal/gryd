import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import {
  CodeDemo,
  ImageGallery,
  VideoEmbed,
  ProjectTimeline,
  TechStack,
  Callout,
} from './mdx/RichContentComponents';
import { getSanityImageUrl } from '../utils/imageUtils';
import type { SanityImage } from '../types/content';

// Define the content block types that come from Sanity
interface ContentBlock {
  _type: string;
  _key: string;
  [key: string]: any;
}

interface RichContentRendererProps {
  content: ContentBlock[];
  className?: string;
}

// Custom components for PortableText rendering
const portableTextComponents: PortableTextComponents = {
  // Text blocks
  block: {
    normal: ({ children }) => <p className="body mb-6">{children}</p>,
    h2: ({ children }) => <h2 className="headline-small mt-12 mb-6">{children}</h2>,
    h3: ({ children }) => <h3 className="subhead mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="body font-semibold mt-6 mb-3">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gryd-accent pl-6 my-8 italic text-gryd-soft">
        {children}
      </blockquote>
    ),
  },

  // Lists
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 ml-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="body">{children}</li>,
    number: ({ children }) => <li className="body">{children}</li>,
  },

  // Marks (inline formatting)
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gryd-soft/10 px-2 py-1 rounded text-sm font-mono text-gryd-accent">
        {children}
      </code>
    ),
    'strike-through': ({ children }) => <del className="line-through">{children}</del>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-gryd-accent hover:underline"
      >
        {children}
      </a>
    ),
  },

  // Custom types (our embedded components)
  types: {
    codeDemo: ({ value }) => (
      <CodeDemo
        title={value.title}
        language={value.language}
        code={value.code}
        description={value.description}
      />
    ),

    imageGallery: ({ value }) => (
      <ImageGallery
        title={value.title}
        layout={value.layout}
        images={value.images}
        caption={value.caption}
      />
    ),

    videoEmbed: ({ value }) => (
      <VideoEmbed
        title={value.title}
        url={value.url}
        caption={value.caption}
        autoplay={value.autoplay}
      />
    ),

    projectTimeline: ({ value }) => (
      <ProjectTimeline
        title={value.title}
        events={value.events}
      />
    ),

    techStack: ({ value }) => (
      <TechStack
        title={value.title}
        categories={value.categories}
      />
    ),

    callout: ({ value }) => (
      <Callout
        type={value.type}
        title={value.title}
        content={value.content}
      />
    ),

    // Handle regular images in content
    image: ({ value }: { value: SanityImage }) => (
      <div className="content-image-frame">
        <div className="image-photo-frame">
          <img
            src={getSanityImageUrl(value, { width: 800, adaptive: true }) || ''}
            alt={value.alt || 'Content image'}
            className="content-image"
          />
          {value.caption && (
            <div className="image-caption">
              <span>{value.caption}</span>
            </div>
          )}
        </div>
      </div>
    ),
  },
};

const RichContentRenderer: React.FC<RichContentRendererProps> = ({
  content,
  className = ""
}) => {
  // Handle empty or invalid content
  if (!content || !Array.isArray(content) || content.length === 0) {
    return (
      <div className={`rich-content ${className}`}>
        <p className="body text-gryd-soft italic">No content available.</p>
      </div>
    );
  }

  return (
    <div className={`rich-content prose prose-gryd max-w-none ${className}`}>
      <PortableText
        value={content}
        components={portableTextComponents}
      />
    </div>
  );
};

export default RichContentRenderer;
