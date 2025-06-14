
import ScrollFade from '../components/ScrollFade';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Work = () => {
  return (
    <div className="magazine-container">
      {/* Work Portfolio Header - Clean, Professional */}
      <div className="work-portfolio-header">
        <div className="portfolio-masthead">
          <ScrollFade>
            <div className="portfolio-title-section">
              <div className="portfolio-meta">
                <span className="meta-item">Portfolio</span>
                <span className="meta-divider">•</span>
                <span className="meta-item">Selected Works 2024</span>
                <span className="meta-divider">•</span>
                <span className="meta-item">{projects.length} Projects</span>
              </div>
              
              <h1 className="portfolio-main-title">
                Work Archive
              </h1>
              
              <p className="portfolio-subtitle">
                Things I've built that moved numbers.
                Each project is a story of making impossible things work.
              </p>
            </div>
          </ScrollFade>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="magazine-spread">
        <div className="article-grid">
          <div className="grid-title">
            <h4>Case Studies</h4>
            <div className="title-underline"></div>
          </div>
          
          <div className="grid-articles">
            {projects.map((project, index) => (
              <ScrollFade key={project.slug} delay={index * 150}>
                <ProjectCard project={project} index={index} />
              </ScrollFade>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Footer */}
      <div className="editorial-cta">
        <ScrollFade>
          <div className="cta-paper">
            <div className="cta-content">
              <h4 className="cta-headline">More Work Available</h4>
              <p className="cta-text">
                Additional case studies available under NDA.
                Happy to discuss specifics over coffee.
              </p>
            </div>
          </div>
        </ScrollFade>
      </div>

      <div className="magazine-footer">
        <div className="footer-content">
          <div className="footer-logo">THE GRYD</div>
          <div className="footer-info">
            <span>Work Archive • 2024</span>
            <span>Selected Projects & Case Studies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
