import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getSanityImageUrl } from '../utils/imageUtils';

const P5jsSketch = ({ value }) => {
    const { url, height } = value;
    return (
      <iframe
        src={url}
        width="100%"
        height={height || 400}
        className="my-4 border-0"
        loading='lazy'
      />
    );
  };

  const FigmaEmbed = ({ value }) => {
    const { url, height } = value;
    return (
      <iframe
        src={`https://www.figma.com/embed?embed_host=share&url=${url}`}
        width="100%"
        height={height || 400}
        className="my-4 border-0"
        loading='lazy'
        allowFullScreen
      />
    );
  };

  const FileAttachment = ({ value }) => {
    const { file, description, coverImage } = value;
    const fileUrl = file?.asset?.url;

    if (!fileUrl) {
      return null;
    }

    if (coverImage && coverImage.asset) {
      const imageUrl = getSanityImageUrl(coverImage, { width: 800 });
      return (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="book-cover-link">
          <img src={imageUrl} alt={description || 'Book Cover'} className="book-cover-image" />
          <p className="book-cover-title">{description || 'View File'}</p>
        </a>
      );
    }

    return (
      <div className="my-4 p-4 border rounded-lg flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {description || 'Download file'}
        </a>
      </div>
    );
  };

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={getSanityImageUrl(value, { width: 800 })}
        alt={value.alt || ' '}
        className="my-4 rounded-lg"
        loading="lazy"
      />
    ),
    code: ({ value }) => (
        <pre className="my-4 p-4 bg-gray-800 text-white rounded-lg overflow-x-auto">
          <code>{value.code}</code>
        </pre>
      ),
    p5jsSketch: P5jsSketch,
    figmaEmbed: FigmaEmbed,
    fileAttachment: FileAttachment,
  },
};

const RichContentRenderer = ({ content, className = '' }) => {
  return (
    <div className={`rich-content ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  );
};

export default RichContentRenderer;
