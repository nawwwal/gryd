import { useWorkProjects } from '../hooks/useContentQuery';
import { getSanityImageUrl } from '../utils/imageUtils';
import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';
import MobileOptimizedImage from '../components/MobileOptimizedImage';
import MobileTouchFeedback from '../components/MobileTouchFeedback';
import { useGyroscopic } from '../hooks/useGyroscopic';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import PageLoader from '../components/PageLoader';
import MetaTags from '../components/MetaTags';

const Work = () => {
  const {
    data: projects = [],
    isLoading: loading,
    error,
    isError
  } = useWorkProjects();

  const portfolioRef = useGyroscopic();
  const {
    isMobile,
    isTouch,
    reducedMotion
  } = useMobileOptimization();

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    // Handle swipe gestures if needed for work page
    onSwipeLeft: () => {
      // Could implement navigation between projects
    },
    onSwipeRight: () => {
      // Could implement navigation between projects
    }
  });

  if (loading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <div className="magazine-container">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Projects</h2>
          <p className="body text-gryd-soft mb-4">
            {error?.message || 'Failed to load projects. Please try refreshing the page.'}
          </p>
          <button
            onClick={() => window.location.reload()}
                            className="shimmer-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaTags
        title="Work - Case Studies & Client Projects"
        description="Explore a collection of case studies and client projects by Aditya Nawal. See how he solves complex problems with elegant and effective design solutions."
        keywords="Work, case studies, client projects, portfolio, product design, UI/UX"
      />
      <div className="magazine-container" ref={swipeRef}>
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

        </div>
    </>
  );
};
export default Work;
