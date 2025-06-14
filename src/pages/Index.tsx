
import MagazineHero from '../components/MagazineHero';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import ScrollFade from '../components/ScrollFade';
import { projects } from '../data/projects';

const featuredProject = projects[0];
const gridProjects = projects.slice(1, 4);

const Index = () => {
  return (
    <div className="magazine-container">
      {/* Magazine Cover */}
      <MagazineHero />
      
      {/* Table of Contents */}
      <div className="table-of-contents">
        <ScrollFade>
          <div className="toc-header">
            <h3>In This Issue</h3>
            <div className="toc-line"></div>
          </div>
          
          <div className="toc-entries">
            <div className="toc-entry">
              <span className="toc-page">03</span>
              <span className="toc-title">The Art of Fixing Broken Products</span>
            </div>
            <div className="toc-entry">
              <span className="toc-page">08</span>
              <span className="toc-title">Selected Work & Case Studies</span>
            </div>
            <div className="toc-entry">
              <span className="toc-page">16</span>
              <span className="toc-title">Design Philosophy & Process</span>
            </div>
          </div>
        </ScrollFade>
      </div>
      
      {/* Main Feature Article */}
      <div className="magazine-spread">
        <FeaturedArticle project={featuredProject} />
      </div>
      
      {/* Article Grid */}
      <div className="magazine-section">
        <ArticleGrid projects={gridProjects} />
      </div>
      
      {/* Call to Action - Editorial Style */}
      <div className="editorial-cta">
        <ScrollFade>
          <div className="cta-paper">
            <div className="cta-content">
              <h4 className="cta-headline">Let's Work Together</h4>
              <p className="cta-text">
                Book 30 minutes. We'll figure out if I can help.
                No sales pitch, just straight talk about your product challenges.
              </p>
              
              <div className="cta-contact">
                <a 
                  href="https://calendly.com/your-handle" 
                  className="editorial-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </a>
                
                <div className="contact-note">
                  <span>Or reach out directly:</span>
                  <a href="mailto:hello@gryd.dev">hello@gryd.dev</a>
                </div>
              </div>
            </div>
            
            <div className="cta-decoration">
              <div className="ink-blot"></div>
            </div>
          </div>
        </ScrollFade>
      </div>
      
      {/* Magazine Footer */}
      <div className="magazine-footer">
        <div className="footer-content">
          <div className="footer-logo">THE GRYD</div>
          <div className="footer-info">
            <span>Issue No. 01 • Winter 2024</span>
            <span>Published by Adi Gryd</span>
            <span>Product Designer & Problem Solver</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
