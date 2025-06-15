
import { useState, useEffect } from 'react';
import ScrollFade from '../components/ScrollFade';
import { loadWorkProjects } from '../utils/contentLoader';
import { WorkProject } from '../types/content';
import ProjectCard from '../components/ProjectCard';

const Work = () => {
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const workProjects = await loadWorkProjects();
        setProjects(workProjects);
      } catch (error) {
        console.error('Failed to load work projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="magazine-container">
        <div className="editorial-container py-16">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="body text-gryd-soft">Loading work projects...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <span className="stat-number">{projects.length}+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{projects.filter(p => p.metadata.status === 'live').length}</span>
              <span className="stat-label">Live</span>
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
