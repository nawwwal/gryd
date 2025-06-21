import { Link } from 'react-router-dom';
import ScrollFade from './ScrollFade';
import { WorkProject } from '../types/content';
import { getSanityImageUrl } from '../utils/imageUtils';

interface FeaturedArticleProps {
  project: WorkProject;
}

const FeaturedArticle = ({ project }: FeaturedArticleProps) => {
  return (
    <article className="featured-article">
      <ScrollFade>
        <div className="article-header">
          <div className="article-category">{project.metadata.category}</div>
          <h3 className="article-headline">{project.title}</h3>
          <p className="article-deck">{project.subtitle}</p>

          <div className="article-meta">
            <span>{project.timeline}</span>
            <span>•</span>
            <span className="impact">{project.impact}</span>
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
          <p>{project.description}</p>

          <Link to={`/work/${project.slug}`} className="read-full-story">
            Read Full Story →
          </Link>
        </div>
      </ScrollFade>
    </article>
  );
};

export default FeaturedArticle;
