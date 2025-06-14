
import ScrollFade from '../components/ScrollFade';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Work = () => {
  return (
    <div className="magazine-container">
      {/* Magazine Header */}
      <div className="magazine-hero">
        <div className="hero-paper">
          <div className="paper-binding"></div>
          
          <div className="hero-content">
            <ScrollFade>
              <div className="masthead">
                <div className="issue-details">
                  <span className="issue-number">Portfolio</span>
                  <span className="issue-date">Selected Works</span>
                  <span className="price">2024</span>
                </div>
                
                <h1 className="magazine-logo">
                  WORK ARCHIVE
                  <span className="subtitle">Case Studies & Projects</span>
                </h1>
                
                <div className="feature-banner">
                  <span>Portfolio: Things I've Built That Moved Numbers</span>
                </div>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={300}>
              <div className="hero-story">
                <div className="story-category">EDITORIAL</div>
                <h2 className="story-headline">
                  Selected Work<br/>
                  <span className="story-subhead">Usually involving panic, tight deadlines</span>
                </h2>
                
                <div className="story-lead">
                  <p className="lead-text">
                    Things I've built that moved numbers.
                    Each project is a story of making impossible things work.
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
          
          <div className="paper-corner"></div>
          <div className="paper-shadow"></div>
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
