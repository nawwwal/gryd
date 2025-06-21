import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollFade from '../components/ScrollFade';
import MagazineFooter from '../components/MagazineFooter';
import RichContentRenderer from '../components/RichContentRenderer';
import { getContentBySlug } from '../utils/contentLoader';
import { getSanityImageUrl, getFileUrl } from '../utils/imageUtils';
import type { WorkProject } from '../types/content';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<WorkProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    getContentBySlug(slug, 'work')
      .then((res) => {
        setProject(res as WorkProject | null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load project:', error);
        setError('Failed to load project');
        setProject(null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="magazine-container">
        <div className="article-container pt-16">
          <div className="space-y-8 animate-pulse">
            <div className="h-6 bg-gryd-soft/20 rounded w-32"></div>
            <div className="h-12 bg-gryd-soft/20 rounded w-3/4"></div>
            <div className="h-6 bg-gryd-soft/20 rounded w-1/2"></div>
            <div className="h-64 bg-gryd-soft/20 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gryd-soft/20 rounded"></div>
              <div className="h-4 bg-gryd-soft/20 rounded w-5/6"></div>
              <div className="h-4 bg-gryd-soft/20 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="magazine-container">
        <div className="article-container pt-16">
          <div className="text-center space-y-4">
            <p className="body text-red-500">{error || 'Project not found'}</p>
            <Link to="/work" className="editorial-link">← back to work</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="magazine-container">
      <div className="article-container space-y-article pt-16">
        <ScrollFade>
          <div className="space-y-8">
            <Link to="/work" className="editorial-link caption">← back to work</Link>
            <h1 className="headline">
              {project.title}
            </h1>
            <p className="subhead text-gryd-accent">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap gap-6 caption">
              <div>
                <span className="text-gryd-soft">timeline:</span>
                <span className="ml-2 text-gryd-text">{project.timeline}</span>
              </div>
              <div>
                <span className="text-gryd-soft">impact:</span>
                <span className="ml-2 text-gryd-accent">{project.impact}</span>
              </div>
              {project.metadata?.status && (
                <div>
                  <span className="text-gryd-soft">status:</span>
                  <span className="ml-2 text-gryd-text capitalize">{project.metadata.status}</span>
                </div>
              )}
            </div>

            {/* Project Tags */}
            {project.metadata?.tags && project.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.metadata.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gryd-soft/10 text-gryd-accent rounded-full caption"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Interactive Links */}
            {project.metadata?.interactive && (
              <div className="flex flex-wrap gap-4 caption">
                {project.metadata.interactive.hasDemo && project.metadata.interactive.demoUrl && (
                  <a
                    href={project.metadata.interactive.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gryd-accent text-white rounded-lg hover:bg-gryd-accent/90 transition-colors"
                  >
                    <span>🚀</span> Live Demo
                  </a>
                )}
                {project.metadata.interactive.codeUrl && (
                  <a
                    href={project.metadata.interactive.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gryd-soft/20 rounded-lg hover:border-gryd-accent/50 transition-colors"
                  >
                    <span>💻</span> Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        </ScrollFade>

        {/* Hero Image */}
        {project.heroImage && (
          <ScrollFade delay={200}>
            <div className="project-hero-image">
              <img
                src={getSanityImageUrl(project.heroImage, { width: 1200, height: 600, adaptive: true }) || ''}
                alt={project.heroImage.alt || project.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {project.heroImage.alt && (
                <p className="caption text-gryd-soft mt-4 text-center italic">
                  {project.heroImage.alt}
                </p>
              )}
            </div>
          </ScrollFade>
        )}

        {/* Rich Content */}
        <ScrollFade delay={300}>
          <div className="project-content">
            {project.content && project.content.length > 0 ? (
              // Use new rich content renderer
              <RichContentRenderer content={project.content} />
            ) : project.contentLegacy ? (
              // Fallback to legacy content rendering
              <div className="space-y-paragraph">
                {project.contentLegacy.split('\n\n').map((paragraph: string, index: number) => (
                  <div key={index} className="body">
                    <p className="whitespace-pre-wrap">{paragraph.trim()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="body text-gryd-soft italic">
                No content available for this project.
              </div>
            )}
          </div>
        </ScrollFade>

        {/* Legacy Image Gallery (only show if no rich content) */}
        {(!project.content || project.content.length === 0) && project.gallery && project.gallery.length > 0 && (
          <ScrollFade delay={400}>
            <div className="project-gallery">
              <h3 className="headline-small mb-6">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img
                      src={getSanityImageUrl(image, { width: 400, height: 300, adaptive: true }) || ''}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    />
                    {image.caption && (
                      <p className="caption text-gryd-soft mt-2">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollFade>
        )}

        {/* Attachments */}
        {project.attachments && project.attachments.length > 0 && (
          <ScrollFade delay={500}>
            <div className="project-attachments">
              <h3 className="headline-small mb-6">Project Resources</h3>
              <div className="space-y-4">
                {project.attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    <a
                      href={getFileUrl(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 border border-gryd-soft/20 rounded-lg hover:border-gryd-accent/50 transition-colors"
                    >
                      <div className="attachment-icon">
                        📎
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{file.title || file.asset?.originalFilename || 'Untitled'}</h4>
                        {file.description && (
                          <p className="text-sm text-gryd-soft">{file.description}</p>
                        )}
                      </div>
                      <div className="text-sm text-gryd-soft">
                        Download →
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </ScrollFade>
        )}

        <ScrollFade delay={600}>
          <div className="pt-16 border-t border-gryd-soft/20 space-y-4">
            <p className="body text-gryd-soft">
              want to discuss this project in detail? let's talk.
            </p>
            <a
              href="https://calendly.com/your-handle"
              className="editorial-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              book a call →
            </a>
          </div>
        </ScrollFade>
      </div>

      {/* Enhanced Magazine Footer - Now Common Component */}
      <MagazineFooter />
    </div>
  );
};

export default ProjectDetail;
