
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
  const isLarge = index === 0;
  
  return (
    <Link to={`/work/${project.slug}`} className="project-card-link">
      <article className={`magazine-project-card ${isLarge ? 'large' : ''}`}>
        <div className="project-image-container">
          <div className="project-image">
            <img src={project.image} alt={project.title} />
            <div className="image-overlay">
              <span className="project-category">{project.category}</span>
              <span className="project-year">{project.year}</span>
            </div>
          </div>
        </div>
        
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-description">{project.description}</p>
          
          <div className="project-meta">
            <span className="read-more">read more →</span>
          </div>
        </div>
        
        <div className="card-decoration">
          <div className="decoration-corner"></div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
