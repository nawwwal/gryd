import { useParams, Link } from 'react-router-dom';
import { getSanityImageUrl } from '../utils/imageUtils';
import RichContentRenderer from '../components/RichContentRenderer';
import { useContentBySlug } from '../hooks/useContentQuery';
import ScrollFade from '../components/ScrollFade';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();

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
            <div className="project-meta-top">
              <div className="project-category">{project.metadata.category}</div>

              {/* Status and Tools at the top */}
              <div className="project-status-tools">
                <div className="status-indicator">
                  <span className="status-label">Status:</span>
                  <span className="status-value">{project.metadata.status}</span>
                </div>

                {project.metadata.tools && project.metadata.tools.length > 0 && (
                  <div className="tools-section">
                    <span className="tools-label">Tools:</span>
                    <div className="tools-list">
                      {project.metadata.tools.map((tool, index) => (
                        <span key={index} className="tool-tag">{tool}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h1 className="project-title">{project.title}</h1>

            {project.subtitle && (
              <p className="project-subtitle">{project.subtitle}</p>
            )}

            {project.metadata.publishDate && (
              <div className="project-date">
                {new Date(project.metadata.publishDate).getFullYear()}
              </div>
            )}

            {/* Interactive Links */}
            {project.metadata.interactive?.hasLiveVersion && project.metadata.interactive.liveUrl && (
              <div className="project-live-link">
                <a
                  href={project.metadata.interactive.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-project-button"
                >
                  View Live Project ↗
                </a>
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

        {/* Tags at the bottom */}
        {project.metadata.tags && project.metadata.tags.length > 0 && (
          <ScrollFade delay={500}>
            <div className="project-tags-section">
              <h3 className="tags-title">Related Topics</h3>
              <div className="tags-list">
                {project.metadata.tags.map((tag, index) => (
                  <span key={index} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </ScrollFade>
        )}

        {/* Navigation */}
        <ScrollFade delay={600}>
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
