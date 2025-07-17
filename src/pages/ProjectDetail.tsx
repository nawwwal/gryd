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
    <div className="min-h-screen bg-gryd-bg">
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Project Header */}
        <ScrollFade>
          <header className="mb-12 text-center space-y-6">
            <div className="space-y-2">
              <div className="text-sm uppercase tracking-widest text-gryd-accent font-bold">
                {project.metadata.category}
              </div>
              <h1 className="text-5xl font-bold text-gryd-text font-headline">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-xl text-gryd-soft font-body leading-relaxed">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Project Meta */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gryd-soft">
              <div className="flex items-center gap-2">
                <span className="text-gryd-soft">status:</span>
                <span className="ml-2 text-gryd-accent">{project.metadata.status}</span>
              </div>
              {project.metadata.publishDate && (
                <div className="flex items-center gap-2">
                  <span className="text-gryd-soft">published:</span>
                  <span className="ml-2 text-gryd-text">{new Date(project.metadata.publishDate).getFullYear()}</span>
                </div>
              )}
            </div>

            {/* Tools & Tags */}
            {(project.metadata.tools?.length || project.metadata.tags?.length) && (
              <div className="space-y-4">
                {project.metadata.tools && project.metadata.tools.length > 0 && (
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="text-xs uppercase tracking-wider text-gryd-soft">Tools:</span>
                    {project.metadata.tools.map((tool, index) => (
                      <span key={index} className="px-2 py-1 bg-gryd-soft/10 text-gryd-text text-xs rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
                {project.metadata.tags && project.metadata.tags.length > 0 && (
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="text-xs uppercase tracking-wider text-gryd-soft">Tags:</span>
                    {project.metadata.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gryd-accent/10 text-gryd-accent text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Interactive Links */}
            {project.metadata.interactive && (
              <div className="flex items-center justify-center gap-4">
                {project.metadata.interactive.hasLiveVersion && project.metadata.interactive.liveUrl && (
                  <a
                    href={project.metadata.interactive.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gryd-accent text-white rounded hover:bg-opacity-90 transition-colors"
                  >
                    View Live Project
                    <span>↗</span>
                  </a>
                )}
              </div>
            )}
          </header>
        </ScrollFade>

        {/* Hero Image */}
        {project.heroImage && (
          <ScrollFade delay={200}>
            <div className="mb-12">
              <img
                src={getSanityImageUrl(project.heroImage, { width: 800, height: 500 }) || ''}
                alt={project.heroImage.alt || project.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </ScrollFade>
        )}

        {/* Project Description */}
        {project.description && (
          <ScrollFade delay={300}>
            <div className="mb-12">
              <p className="text-lg leading-relaxed text-gryd-text font-body text-center max-w-3xl mx-auto">
                {project.description}
              </p>
            </div>
          </ScrollFade>
        )}

        {/* Rich Content */}
        <ScrollFade delay={400}>
          <div className="prose prose-gryd max-w-none">
            <RichContentRenderer
              content={project.content || []}
              className="project-content"
            />

            {/* Fallback to legacy content if no rich content */}
            {(!project.content || project.content.length === 0) && project.contentLegacy && (
              <div className="whitespace-pre-wrap text-body leading-relaxed">
                {project.contentLegacy}
              </div>
            )}
          </div>
        </ScrollFade>

        {/* Navigation */}
        <ScrollFade delay={500}>
          <div className="mt-16 pt-8 border-t border-gryd-soft/20 text-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-gryd-accent hover:text-gryd-text transition-colors"
            >
              ← Back to Work
            </Link>
          </div>
        </ScrollFade>
      </article>
    </div>
  );
};

export default ProjectDetail;
