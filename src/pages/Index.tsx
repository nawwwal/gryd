import MagazineHero from '../components/MagazineHero';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import LettersToEditor from '../components/LettersToEditor';
import MagazineFooter from '../components/MagazineFooter';
import { useEffect, useState } from 'react';
import { loadWorkProjects } from '../utils/contentLoader';
import type { WorkProject } from '../types/content';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import HomeSkeleton from '../components/skeletons/HomeSkeleton';

const Index = () => {
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [loading, setLoading] = useState(true);
  const featuredProject = projects.find(p => p.metadata.featured) || projects[0];
  const otherProjects = featuredProject
    ? projects.filter(p => p.slug !== featuredProject.slug).slice(0, 6)
    : [];
  const { isMobile, isTouch } = useMobileOptimization();
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await loadWorkProjects();
        setProjects(items);
      } catch (err) {
        console.error('Failed to load projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sections = ['hero', 'featured', 'grid', 'letters'];

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeUp: () => {
      if (isTouch && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        document.getElementById(sections[currentSection + 1])?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    },
    onSwipeDown: () => {
      if (isTouch && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        document.getElementById(sections[currentSection - 1])?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });

  if (loading) {
    return <HomeSkeleton />;
  }

  // Show the main layout even if no projects, but handle featured project gracefully
  return (
    <div className="magazine-container" ref={swipeRef}>
      <div id="hero">
        <MagazineHero />
      </div>

      <div className="magazine-spread" id="featured">
        {featuredProject ? (
          <>
            <FeaturedArticle project={featuredProject} />
            <div id="grid">
              <ArticleGrid projects={otherProjects} />
            </div>
          </>
        ) : (
          <div className="featured-article">
            <div className="article-header">
              <div className="article-category">Coming Soon</div>
              <h3 className="article-headline">Projects Loading</h3>
              <p className="article-deck">Featured work will appear here once content is available.</p>
            </div>
            <div className="article-visual">
              <div className="photo-frame">
                <div className="placeholder-content">
                  <p>🎨 Portfolio content coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="letters">
        <LettersToEditor />
      </div>
      <MagazineFooter />

      {/* Mobile Section Indicator */}
      {isMobile && isTouch && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSection ? 'bg-orange-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
