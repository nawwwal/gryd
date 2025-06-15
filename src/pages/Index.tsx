
import MagazineHero from '../components/MagazineHero';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import LettersToEditor from '../components/LettersToEditor';
import MagazineFooter from '../components/MagazineFooter';
import { projects } from '../data/projects';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

const Index = () => {
  const { isMobile } = useMobileOptimization();
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => p.slug !== featuredProject.slug).slice(0, isMobile ? 4 : 6);

  return (
    <div className="magazine-container">
      <MagazineHero />
      
      <div className="magazine-spread">
        <FeaturedArticle project={featuredProject} />
        <ArticleGrid projects={otherProjects} />
      </div>
      
      <LettersToEditor />
      <MagazineFooter />
    </div>
  );
};

export default Index;
