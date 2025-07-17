import { Link } from 'react-router-dom';
import ScrollFade from './ScrollFade';
import { WorkProject } from '../types/content';
import { getSanityImageUrl } from '../utils/imageUtils';

interface FeaturedArticleProps {
  project: WorkProject;
}

// Helper function to extract plain text from rich content for excerpt
const getContentExcerpt = (project: WorkProject, maxLength: number = 200): string => {
  // Try to get content from rich content blocks first
  if (project.content && project.content.length > 0) {
    // Find first text block
    const firstTextBlock = project.content.find(block => block._type === 'block');
    if (firstTextBlock && 'children' in firstTextBlock && Array.isArray(firstTextBlock.children)) {
      const text = firstTextBlock.children
        .filter(child => child._type === 'span' && child.text)
        .map(child => child.text)
        .join(' ');
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
  }

  // Fall back to legacy content
  if (project.contentLegacy) {
    const text = project.contentLegacy.replace(/\n+/g, ' ').trim();
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  // Final fallback to description
  return project.description || '';
};

const FeaturedArticle = ({ project }: FeaturedArticleProps) => {
  const excerpt = getContentExcerpt(project);

  return (
    <article className="featured-article">
      <ScrollFade>
        <div className="article-header">
          <div className="article-category">{project.metadata.category}</div>
          <h3 className="article-headline">{project.title}</h3>
          <p className="article-deck">{project.subtitle}</p>

          <div className="article-meta">
            <span>{project.metadata.status}</span>
            {project.metadata.publishDate && (
              <>
                <span>•</span>
                <span>{new Date(project.metadata.publishDate).getFullYear()}</span>
              </>
            )}
          </div>
        </div>
      </ScrollFade>

      <ScrollFade delay={200}>
        <div className="article-visual">
          <div className="photo-frame">
            <img
              src={getSanityImageUrl(project.heroImage, { width: 600, height: 400 }) || '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png'}
              alt={project.heroImage?.alt || project.title}
            />
            <div className="photo-caption">
              <span>{project.description}</span>
            </div>
          </div>
        </div>
      </ScrollFade>

      <ScrollFade delay={400}>
        <div className="article-excerpt">
          <p>{excerpt}</p>

          <Link to={`/work/${project.slug}`} className="read-full-story">
            Read Full Story →
          </Link>
        </div>
      </ScrollFade>
    </article>
  );
};

export default FeaturedArticle;
