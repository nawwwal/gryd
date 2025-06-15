
import { Link } from 'react-router-dom';
import { WorkProject } from '../types/content';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import MobileOptimizedImage from './MobileOptimizedImage';

interface ProjectCardProps {
  project: WorkProject;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { isMobile, isTouch } = useMobileOptimization();

  return (
    <Link to={`/work/${project.slug}`} className="grid-article-link touch-target">
      <article className={`grid-article ${isTouch ? 'touch-optimized' : ''}`}>
        <div className="grid-article-image">
          <MobileOptimizedImage
            src={project.metadata.assets.hero || '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png'}
            alt={project.title}
            className="w-full h-full object-cover"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
          <div className="article-overlay">
            <span className="read-time text-xs sm:text-sm">
              {new Date(project.metadata.publishDate).getFullYear()}
            </span>
          </div>
        </div>
        
        <div className="grid-article-content p-4 sm:p-6">
          <div className="grid-category text-xs sm:text-sm">{project.metadata.category}</div>
          <h5 className="grid-headline text-lg sm:text-xl">{project.title}</h5>
          <p className="grid-excerpt text-sm sm:text-base">{project.subtitle}</p>
          
          <div className="grid-meta">
            <span className="grid-impact text-xs sm:text-sm">
              {isMobile ? 'View →' : 'Read Case Study →'}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
