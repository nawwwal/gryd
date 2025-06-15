import { useEffect, useState } from 'react';
import { WorkProject } from '../types/content';
import { loadWorkProjects } from '../utils/contentLoader';
import ProjectCard from '../components/ProjectCard';
import ScrollFade from '../components/ScrollFade';
import { useGyroscopic } from '../hooks/useGyroscopic';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSwipeGesture } from '../hooks/useSwipeGesture';

const Work = () => {
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [loading, setLoading] = useState(true);
  const portfolioRef = useGyroscopic();
  const { isMobile, isTouch, reducedMotion } = useMobileOptimization();

  // Enhanced swipe navigation for mobile
  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: () => {
      // Could implement project filtering or navigation
    },
    onSwipeRight: () => {
      // Could implement back navigation
    }
  });

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
            <div className={`animate-spin w-8 h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4 ${reducedMotion ? 'animate-none' : ''}`}></div>
            <p className="body text-gryd-soft">Loading portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="magazine-container" ref={swipeRef}>
      {/* Portfolio Header */}
      <div className="work-portfolio-header">
        <div ref={portfolioRef} className={`portfolio-masthead ${isMobile ? '' : 'gyroscopic-card'}`}>
          <div className="portfolio-breadcrumb">
            <span>THE GRYD</span>
            <span>→</span>
            <span>WORK</span>
          </div>
          
          <div className="portfolio-title-section">
            <h1 className="portfolio-main-title">
              {'WORK'.split('').map((letter, index) => (
                <span key={index} className="hover-letter ink-bleed" style={{ animationDelay: `${index * 100}ms` }}>
                  {letter}
                </span>
              ))}
            </h1>
            <p className="portfolio-subtitle">Case Studies & Client Projects</p>
          </div>
          
          <div className="portfolio-stats">
            <div className="stat-item">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{projects.filter(p => p.metadata.featured).length}</span>
              <span className="stat-label">Featured</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{new Set(projects.map(p => p.metadata.category)).size}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="magazine-spread">
        <ScrollFade>
          <div className="article-grid">
            <div className="grid-title">
              <h4>Selected Work</h4>
              <div className="title-underline"></div>
            </div>
            
            <div className="grid-articles">
              {projects.map((project, index) => (
                <ScrollFade key={project.slug} delay={reducedMotion ? 0 : index * 200}>
                  <ProjectCard project={project} index={index} />
                </ScrollFade>
              ))}
            </div>
          </div>
        </ScrollFade>
      </div>

      <div className="magazine-footer">
        <div className="footer-content">
          <div className="footer-logo">THE GRYD</div>
          <div className="footer-info">
            <span>Work Portfolio • Selected Projects</span>
            <span>Updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
