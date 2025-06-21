import { useEffect, useState } from 'react';
import { WorkProject } from '../types/content';
import { loadWorkProjects } from '../utils/contentLoader';
import { getSanityImageUrl } from '../utils/imageUtils';
import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';
import MagazineFooter from '../components/MagazineFooter';
import MobileOptimizedImage from '../components/MobileOptimizedImage';
import MobileTouchFeedback from '../components/MobileTouchFeedback';
import { useGyroscopic } from '../hooks/useGyroscopic';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import ProjectsSkeleton from '../components/skeletons/ProjectsSkeleton';
const Work = () => {
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [loading, setLoading] = useState(true);
  const portfolioRef = useGyroscopic();
  const {
    isMobile,
    isTouch,
    reducedMotion
  } = useMobileOptimization();

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
    return <ProjectsSkeleton count={3} />;
  }
  return <div className="magazine-container" ref={swipeRef}>
      {/* Portfolio Header */}
      <div className="work-portfolio-header">
        <div ref={portfolioRef} className={`portfolio-masthead ${isMobile ? '' : 'gyroscopic-card'}`}>
          <div className="portfolio-title-section">
            <h1 className="portfolio-main-title">
              {'WORK'.split('').map((letter, index) => <span key={index} className="hover-letter ink-bleed" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  {letter}
                </span>)}
            </h1>
            <p className="portfolio-subtitle">Case Studies & Client Projects</p>
          </div>

          <div className="portfolio-stats">
            <div className="stat-item">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{projects.filter(p => p.metadata?.featured).length}</span>
              <span className="stat-label">Featured</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{new Set(projects.map(p => p.metadata?.category).filter(Boolean)).size}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Linear Projects Layout */}
      <div className="magazine-spread">
        <ScrollFade>
          <div className="work-projects-linear">
            <div className="grid-title">
              <h4>Selected Work</h4>
              <div className="title-underline"></div>
            </div>

            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ScrollFade key={project.slug} delay={reducedMotion ? 0 : index * 200}>
                  <Link to={`/work/${project.slug}`} className="block">
                    {isTouch ? (
                      <MobileTouchFeedback hapticFeedback>
                        <article className="linear-project-card">
                          <div className="linear-project-content">
                            <div className="linear-project-image">
                              <MobileOptimizedImage
                                src={getSanityImageUrl(project.heroImage, { width: 400, height: 300 }) || '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png'}
                                alt={project.heroImage?.alt || project.title}
                                priority={index < 2}
                              />
                            </div>

                            <div className="linear-project-info">
                              <div className="linear-project-category">{project.metadata?.category}</div>
                              <h3 className="linear-project-title">{project.title}</h3>
                              <p className="linear-project-subtitle">{project.subtitle}</p>

                              <div className="linear-project-meta">
                                <span className="linear-project-year">{new Date(project.metadata?.publishDate || Date.now()).getFullYear()}</span>
                                <span className="linear-project-cta">Read Case Study →</span>
                              </div>
                            </div>
                          </div>
                        </article>
                      </MobileTouchFeedback>
                    ) : (
                      <article className="linear-project-card">
                        <div className="linear-project-content">
                          <div className="linear-project-image">
                            <MobileOptimizedImage
                              src={getSanityImageUrl(project.heroImage, { width: 400, height: 300 }) || '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png'}
                              alt={project.heroImage?.alt || project.title}
                              priority={index < 2}
                            />
                          </div>

                          <div className="linear-project-info">
                            <div className="linear-project-category">{project.metadata?.category}</div>
                            <h3 className="linear-project-title">{project.title}</h3>
                            <p className="linear-project-subtitle">{project.subtitle}</p>

                            <div className="linear-project-meta">
                              <span className="linear-project-year">{new Date(project.metadata?.publishDate || Date.now()).getFullYear()}</span>
                              <span className="linear-project-cta">Read Case Study →</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    )}
                  </Link>
                </ScrollFade>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="body text-gryd-soft mb-4">No projects found in the portfolio.</p>
                <p className="caption text-gryd-soft">Content may still be loading or not yet published.</p>
              </div>
            )}
          </div>
        </ScrollFade>
      </div>

      {/* Enhanced Magazine Footer - Now Common Component */}
      <MagazineFooter />
    </div>;
};
export default Work;
