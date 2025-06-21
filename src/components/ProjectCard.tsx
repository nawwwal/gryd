import { Link } from 'react-router-dom';
import { WorkProject } from '../types/content';
import { getSanityImageUrl } from '../utils/imageUtils';
import MobileOptimizedImage from './MobileOptimizedImage';
import MobileTouchFeedback from './MobileTouchFeedback';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface ProjectCardProps {
  project: WorkProject;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { isTouch } = useMobileOptimization();

  const cardContent = (
    <article className="grid-article">
      <div className="grid-article-image">
        <MobileOptimizedImage
          src={getSanityImageUrl(project.heroImage, { width: 300, height: 200 }) || '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png'}
          alt={project.heroImage?.alt || project.title}
          priority={index < 2}
        />
        <div className="article-overlay">
          <span className="read-time">{new Date(project.metadata.publishDate).getFullYear()}</span>
        </div>
      </div>

      <div className="grid-article-content">
        <div className="grid-category">{project.metadata.category}</div>
        <h5 className="grid-headline">{project.title}</h5>
        <p className="grid-excerpt">{project.subtitle}</p>

        <div className="grid-meta">
          <span className="grid-impact">Read Case Study →</span>
        </div>
      </div>
    </article>
  );

  if (isTouch) {
    return (
      <Link to={`/work/${project.slug}`} className="grid-article-link">
        <MobileTouchFeedback hapticFeedback>
          {cardContent}
        </MobileTouchFeedback>
      </Link>
    );
  }

  return (
    <Link to={`/work/${project.slug}`} className="grid-article-link">
      {cardContent}
    </Link>
  );
};

export default ProjectCard;
