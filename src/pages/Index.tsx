
import { useEffect, useState } from 'react';
import MobileHero from '../components/MobileHero';
import MagazineHero from '../components/MagazineHero';
import ArticleGrid from '../components/ArticleGrid';
import EditorsPicks from '../components/EditorsPicks';
import LettersToEditor from '../components/LettersToEditor';
import MagazineFooter from '../components/MagazineFooter';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { loadWorkProjects } from '../utils/contentLoader';
import { WorkProject } from '../types/content';

const Index = () => {
  const { isMobile } = useMobileOptimization();
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const workProjects = await loadWorkProjects();
        setProjects(workProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="magazine-container">
        <div className="editorial-container py-16">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="body text-gryd-soft">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="magazine-container">
      {isMobile ? <MobileHero /> : <MagazineHero />}
      
      <div className="magazine-spread">
        <ArticleGrid projects={projects} />
        <EditorsPicks />
        <LettersToEditor />
      </div>

      <MagazineFooter />
    </div>
  );
};

export default Index;
