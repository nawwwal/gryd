
import ScrollFade from '../components/ScrollFade';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Work = () => {
  return (
    <div className="magazine-container">
      {/* Work Portfolio Header */}
      <div className="work-portfolio-header">
        <div className="portfolio-masthead">
          <div className="portfolio-breadcrumb">
            <span>THE GRYD</span>
            <span>•</span>
            <span>PORTFOLIO</span>
            <span>•</span>
            <span>2024</span>
          </div>
          
          <div className="portfolio-title-section">
            <h1 className="portfolio-main-title">
              {'SELECTED WORK'.split('').map((letter, index) => (
                <span key={index} className="hover-letter" style={{ animationDelay: `${index * 50}ms` }}>
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </h1>
            <div className="portfolio-subtitle">Case Studies & Projects That Moved Numbers</div>
          </div>
          
          <div className="portfolio-stats">
            <div className="stat-item">
              <span className="stat-number">12+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6mo</span>
              <span className="stat-label">Full-time</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Coffee</span>
            </div>
          </div>
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
