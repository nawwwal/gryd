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
  const [currentPage, setCurrentPage] = useState(0);
  const portfolioRef = useGyroscopic();
  const { isMobile } = useMobileOptimization();

  const projectsPerPage = isMobile ? 6 : 9;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const displayedProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: () => {
      if (currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      }
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
        <div className="editorial-container py-8 sm:py-16">
          <div className="text-center">
            <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="body text-gryd-soft">Loading portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="magazine-container" ref={swipeRef}>
      {/* Mobile-Optimized Portfolio Header */}
      <div className="work-portfolio-header">
        <div ref={portfolioRef} className="portfolio-masthead gyroscopic-card">
          <div className="portfolio-breadcrumb">
            <span className="text-xs sm:text-sm">THE GRYD</span>
            <span>→</span>
            <span className="text-xs sm:text-sm">WORK</span>
          </div>
          
          <div className="portfolio-title-section">
            <h1 className="portfolio-main-title">
              {'WORK'.split('').map((letter, index) => (
                <span key={index} className="hover-letter ink-bleed" style={{ animationDelay: `${index * 100}ms` }}>
                  {letter}
                </span>
              ))}
            </h1>
            <p className="portfolio-subtitle text-sm sm:text-base">Case Studies & Client Projects</p>
          </div>
          
          <div className="portfolio-stats">
            <div className="stat-item">
              <span className="stat-number text-lg sm:text-xl">{projects.length}</span>
              <span className="stat-label text-xs sm:text-sm">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number text-lg sm:text-xl">{projects.filter(p => p.metadata.featured).length}</span>
              <span className="stat-label text-xs sm:text-sm">Featured</span>
            </div>
            <div className="stat-item">
              <span className="stat-number text-lg sm:text-xl">{new Set(projects.map(p => p.metadata.category)).size}</span>
              <span className="stat-label text-xs sm:text-sm">Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Projects Grid */}
      <div className="magazine-spread">
        <ScrollFade>
          <div className="article-grid">
            <div className="grid-title">
              <h4 className="text-2xl sm:text-3xl">Selected Work</h4>
              <div className="title-underline"></div>
              
              {/* Mobile Pagination Indicator */}
              {isMobile && totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="p-2 text-gryd-soft disabled:opacity-30 touch-target"
                  >
                    ←
                  </button>
                  <span className="caption">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="p-2 text-gryd-soft disabled:opacity-30 touch-target"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid-articles">
              {displayedProjects.map((project, index) => (
                <ScrollFade key={project.slug} delay={index * 200}>
                  <ProjectCard project={project} index={index} />
                </ScrollFade>
              ))}
            </div>

            {/* Mobile Swipe Hint */}
            {isMobile && totalPages > 1 && (
              <div className="text-center mt-6">
                <p className="caption text-gryd-soft">
                  Swipe left/right to navigate • Tap cards to view details
                </p>
              </div>
            )}
          </div>
        </ScrollFade>
      </div>

      <div className="magazine-footer">
        <div className="footer-content">
          <div className="footer-logo text-lg sm:text-2xl">THE GRYD</div>
          <div className="footer-info">
            <span className="text-xs sm:text-sm">Work Portfolio • Selected Projects</span>
            <span className="text-xs sm:text-sm">Updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
