
import { useParams, Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';
import MagazineFooter from '../components/MagazineFooter';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

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

        <div className="space-y-paragraph">
          {project.content.map((section: any, index: number) => (
            <ScrollFade key={index} delay={index * 100}>
              <div className="body">
                <p>{section.content}</p>
              </div>
            </ScrollFade>
          ))}
        </div>

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
