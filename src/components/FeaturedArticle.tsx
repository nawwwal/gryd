
import { Link } from 'react-router-dom';
import ScrollFade from './ScrollFade';
import { Project } from '../data/projects';

interface FeaturedArticleProps {
  project: Project;
}

const FeaturedArticle = ({ project }: FeaturedArticleProps) => {
  return (
    <article className="featured-article">
      <ScrollFade>
        <div className="article-header">
          <div className="article-category">{project.category}</div>
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
            <img src={project.image} alt={project.title} />
            <div className="photo-caption">
              <span>{project.description}</span>
            </div>
          </div>
        </div>
      </ScrollFade>
      
      <ScrollFade delay={400}>
        <div className="article-excerpt">
          <p>{project.content[0]?.content}</p>
          
          <Link to={`/work/${project.slug}`} className="read-full-story">
            Read Full Story →
          </Link>
        </div>
      </ScrollFade>
    </article>
  );
};

export default FeaturedArticle;
