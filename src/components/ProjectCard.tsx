
import { Link } from 'react-router-dom';
import { WorkProject } from '../types/content';

interface ProjectCardProps {
  project: WorkProject;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <Link to={`/work/${project.slug}`} className="grid-article-link">
      <article className="grid-article">
        <div className="grid-article-image">
          <img 
            src={project.metadata.assets.hero || '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png'} 
            alt={project.title} 
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
    </Link>
  );
};

export default ProjectCard;
