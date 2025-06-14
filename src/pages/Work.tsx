
import ScrollFade from '../components/ScrollFade';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Work = () => {
  return (
    <div className="editorial-container space-y-article pt-16">
      <ScrollFade>
        <div className="space-y-8">
          <h1 className="subhead">selected work</h1>
          <p className="body text-xl max-w-2xl text-gryd-soft">
            things i've built that moved numbers.
            usually involving panic, tight deadlines,
            and making impossible things work.
          </p>
        </div>
      </ScrollFade>

      <div className="projects-grid mt-16">
        {projects.map((project, index) => (
          <ScrollFade key={project.slug} delay={index * 100}>
            <ProjectCard project={project} index={-1} />
          </ScrollFade>
        ))}
      </div>

      <ScrollFade>
        <div className="caption text-gryd-soft pt-16">
          <p>more work available under nda. happy to discuss specifics over coffee.</p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Work;
