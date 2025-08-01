import { useParams, Link } from 'react-router-dom';
import { getSanityImageUrl } from '../utils/imageUtils';
import RichContentRenderer from '../components/RichContentRenderer';
import { useContentBySlug } from '../hooks/useContentQuery';
import ScrollFade from '../components/ScrollFade';
import PageLoader from '../components/PageLoader';
import MetaTags from '../components/MetaTags';

const PlaygroundDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: entry,
    isLoading,
    error
  } = useContentBySlug('playground', slug || '');

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !entry) {
    return (
      <>
        <MetaTags
          title="Entry Not Found"
          description="The playground entry you're looking for doesn't exist. Please return to the playground to find other experiments."
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gryd-text">Entry Not Found</h1>
            <p className="text-gryd-soft">The playground entry you're looking for doesn't exist.</p>
            <Link to="/playground" className="inline-block px-6 py-3 bg-gryd-accent text-white rounded hover:bg-opacity-90 transition-colors">
              Back to Playground
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MetaTags
        title={entry.title}
        description={entry.subtitle || entry.description || ''}
        imageUrl={entry.coverImage ? getSanityImageUrl(entry.coverImage) : undefined}
        keywords={entry.metadata.tags?.join(', ')}
      />
      <div className="project-detail-container">
        <article className="project-article">
          {/* Entry Header */}
          <ScrollFade>
            <header className="project-header">
              <div className="project-category">{entry.entryType}</div>

              <h1 className="project-title">{entry.title}</h1>

              {entry.subtitle && (
                <p className="project-subtitle">{entry.subtitle}</p>
              )}

              <div className="project-byline">
                {entry.metadata.publishDate && (
                  <div className="publication-info">
                    <span className="pub-label">Published</span>
                    <time className="pub-date">
                      {new Date(entry.metadata.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                )}
              </div>
            </header>
          </ScrollFade>

          {/* Cover Image */}
          {entry.coverImage && (
            <ScrollFade delay={200}>
              <div className="project-hero-section">
                <div className="hero-photo-frame">
                  <img
                    src={getSanityImageUrl(entry.coverImage, { width: 800, height: 500, adaptive: true }) || ''}
                    alt={entry.coverImage.alt || entry.title}
                    className="hero-image"
                  />
                  {entry.description && (
                    <div className="hero-caption">
                      <span>{entry.description}</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollFade>
          )}

          {/* Rich Content */}
          <ScrollFade delay={400}>
            <div className="project-content">
              <RichContentRenderer
                content={entry.content || []}
                className="project-rich-content"
              />
            </div>
          </ScrollFade>

          {/* Tags at the bottom */}
          {entry.metadata.tags && entry.metadata.tags.length > 0 && (
            <ScrollFade delay={600}>
              <div className="project-tags-section">
                <div className="tags-list">
                  {entry.metadata.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </ScrollFade>
          )}

          {/* Navigation */}
          <ScrollFade delay={700}>
            <div className="project-navigation">
              <Link to="/playground" className="back-to-work">
                ← Back to Playground
              </Link>
            </div>
          </ScrollFade>
        </article>
      </div>
    </>
  );
};

export default PlaygroundDetail;
