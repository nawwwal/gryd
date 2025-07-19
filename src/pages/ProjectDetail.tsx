import { useParams, Link } from 'react-router-dom';
import { getSanityImageUrl } from '../utils/imageUtils';
import RichContentRenderer from '../components/RichContentRenderer';
import { useContentBySlug } from '../hooks/useContentQuery';
import ScrollFade from '../components/ScrollFade';
import { useGyroscopic } from '../hooks/useGyroscopic'; // Import the hook

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const gyroscopicRef = useGyroscopic<HTMLDivElement>();

  const {
    data: project,
    isLoading,
    error
  } = useContentBySlug('work', slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loading-spinner mx-auto" />
          <p className="text-gryd-soft">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gryd-text">Project Not Found</h1>
          <p className="text-gryd-soft">The project you're looking for doesn't exist.</p>
          <Link to="/work" className="inline-block px-6 py-3 bg-gryd-accent text-white rounded hover:bg-opacity-90 transition-colors">
            Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <article className="project-article">
        {/* Project Header */}
        <ScrollFade>
          <header className="project-header">
            <div className="project-category">{project.metadata.category}</div>

            <h1 className="project-title">{project.title}</h1>

            {project.subtitle && (
              <p className="project-subtitle">{project.subtitle}</p>
            )}

            {/* Magazine-style byline and meta information */}
            <div className="project-byline">
              {project.metadata.publishDate && (
                <div className="publication-info">
                  <span className="pub-label">Published</span>
                  <time className="pub-date">
                    {new Date(project.metadata.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              )}

              <div className="project-status-meta">
                <span className="status-label">Status</span>
                <span className="status-badge">{project.metadata.status}</span>
              </div>
            </div>

            {/* Technical specifications section */}
            {project.metadata.tools && project.metadata.tools.length > 0 && (
              <div className="project-specs">
                <div className="specs-label">Technical Specifications</div>
                <div className="specs-list">
                  {project.metadata.tools.map((tool, index) => (
                    <span key={index} className="spec-item">{tool}</span>
                  ))}
                </div>
              </div>
            )}


          </header>
        </ScrollFade>

        {/* Hero Image */}
        {project.heroImage && (
          <ScrollFade delay={200}>
            <div className="project-hero-section">
              <div className="hero-photo-frame">
                <img
                  src={getSanityImageUrl(project.heroImage, { width: 800, height: 500, adaptive: true }) || ''}
                  alt={project.heroImage.alt || project.title}
                  className="hero-image"
                />
                {project.description && (
                  <div className="hero-caption">
                    <span>{project.description}</span>
                  </div>
                )}
              </div>
            </div>
          </ScrollFade>
        )}

        {/* Project Description */}
        {project.description && !project.heroImage && (
          <ScrollFade delay={300}>
            <div className="project-description">
              <p className="description-text">{project.description}</p>
            </div>
          </ScrollFade>
        )}

        {/* Rich Content */}
        <ScrollFade delay={400}>
          <div className="project-content">
            <RichContentRenderer
              content={project.content || []}
              className="project-rich-content"
            />

            {/* Fallback to legacy content if no rich content */}
            {(!project.content || project.content.length === 0) && project.contentLegacy && (
              <div className="legacy-content">
                {project.contentLegacy.split('\n').map((paragraph, index) => (
                  <p key={index} className="legacy-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </ScrollFade>

        {/* Editorial Live Project Card */}
        {project.metadata.interactive?.hasLiveVersion && project.metadata.interactive.liveUrl && (
          <ScrollFade delay={500}>
            <div className="editorial-live-card" ref={gyroscopicRef}>
              <div className="editorial-card-paper">
                <div className="editorial-card-content">
                  <div className="editorial-badge">
                    <span>Live Project</span>
                  </div>

                  <h2 className="editorial-headline">
                    Experience This Work
                  </h2>

                  <p className="editorial-deck">
                    See {project.title} in action. Explore the full implementation,
                    interact with the design, and discover the craftsmanship behind the concept.
                  </p>

                  <div className="editorial-cta-section">
                    <a
                      href={project.metadata.interactive.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-live-button group"
                    >
                      <span className="button-text">Launch Project</span>
                      <span className="button-arrow">↗</span>
                    </a>

                    <div className="editorial-note">
                      <span>Opens in new window</span>
                    </div>
                  </div>
                </div>

                {/* Editorial decoration elements */}
                <div className="editorial-decoration">
                  <div className="ink-spot top"></div>
                  <div className="ink-spot bottom"></div>
                  <div className="editorial-border"></div>
                </div>
              </div>
            </div>
          </ScrollFade>
        )}

        {/* Tags at the bottom */}
        {project.metadata.tags && project.metadata.tags.length > 0 && (
          <ScrollFade delay={600}>
            <div className="project-tags-section">
              <div className="tags-list">
                {project.metadata.tags.map((tag, index) => (
                  <span key={index} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </ScrollFade>
        )}

        {/* Navigation */}
        <ScrollFade delay={700}>
          <div className="project-navigation">
            <Link to="/work" className="back-to-work">
              ← Back to Work
            </Link>
          </div>
        </ScrollFade>
      </article>
    </div>
  );
};

export default ProjectDetail;
