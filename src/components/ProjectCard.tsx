
import { Link } from 'react-router-dom';

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <Link to={`/work/${project.slug}`} className="grid-article-link">
      <article className="grid-article">
        <div className="grid-article-image">
          <img src={project.image} alt={project.title} />
          <div className="article-overlay">
            <span className="read-time">{project.year}</span>
          </div>
        </div>
        
        <div className="grid-article-content">
          <div className="grid-category">{project.category}</div>
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
