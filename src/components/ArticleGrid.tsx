import { Link } from 'react-router-dom';
import ScrollFade from './ScrollFade';
import { WorkProject } from '../types/content';
import { getSanityImageUrl } from '../utils/imageUtils';

interface ArticleGridProps {
  projects: WorkProject[];
}

const ArticleGrid = ({ projects }: ArticleGridProps) => {
  return (
    <div className="article-grid">
      <div className="grid-title">
        <h4>More Stories</h4>
        <div className="title-underline"></div>
      </div>

      <div className="grid-articles">
        {projects.map((project, index) => (
          <ScrollFade key={project.slug} delay={index * 150}>
            <Link to={`/work/${project.slug}`} className="grid-article-link">
              <article className="grid-article">
                <div className="grid-article-image">
                  <img
                    src={getSanityImageUrl(project.heroImage, { width: 300, height: 200 }) || '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png'}
                    alt={project.heroImage?.alt || project.title}
                  />
                  <div className="article-overlay">
                    <span className="read-time">3 min read</span>
                  </div>
                </div>

                <div className="grid-article-content">
                  <div className="grid-category">{project.metadata.category}</div>
                  <h5 className="grid-headline">{project.title}</h5>
                  <p className="grid-excerpt">{project.subtitle}</p>

                  <div className="grid-meta">
                    <span className="grid-impact">{project.impact}</span>
                  </div>
                </div>
              </article>
            </Link>
          </ScrollFade>
        ))}
      </div>
    </div>
  );
};

export default ArticleGrid;
