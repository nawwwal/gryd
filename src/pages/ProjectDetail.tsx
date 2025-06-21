import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollFade from '../components/ScrollFade';
import MagazineFooter from '../components/MagazineFooter';
import { getContentBySlug } from '../utils/contentLoader';
import { getSanityImageUrl, getFileUrl } from '../utils/imageUtils';
import type { WorkProject } from '../types/content';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<WorkProject | null>(null);

  useEffect(() => {
    if (!slug) return;
    getContentBySlug(slug, 'work').then((res) => setProject(res as WorkProject | null));
  }, [slug]);

  if (!project) {
    return (
      <div className="article-container pt-16">
        <p className="body">project not found</p>
        <Link to="/work" className="editorial-link">← back to work</Link>
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

            <div className="flex space-x-12 caption">
              <div>
                <span className="text-gryd-soft">timeline:</span>
                <span className="ml-2 text-gryd-text">{project.timeline}</span>
              </div>
              <div>
                <span className="text-gryd-soft">impact:</span>
                <span className="ml-2 text-gryd-accent">{project.impact}</span>
              </div>
            </div>
          </div>
        </ScrollFade>

        {/* Hero Image */}
        {project.heroImage && (
          <ScrollFade delay={200}>
            <div className="project-hero-image">
              <img
                src={getSanityImageUrl(project.heroImage, { width: 1200, height: 600 }) || ''}
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

        <div className="space-y-paragraph">
          {project.content.split('. ').map((paragraph: string, index: number) => (
            <ScrollFade key={index} delay={index * 100}>
              <div className="body">
                <p>{paragraph.trim()}.</p>
              </div>
            </ScrollFade>
          ))}
        </div>

        {/* Image Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <ScrollFade delay={400}>
            <div className="project-gallery">
              <h3 className="headline-small mb-6">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img
                      src={getSanityImageUrl(image, { width: 400, height: 300 }) || ''}
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
          <ScrollFade delay={600}>
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

        <ScrollFade>
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
