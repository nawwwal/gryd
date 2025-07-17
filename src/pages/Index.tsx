import { useState } from 'react';
import MagazineHero from '../components/MagazineHero';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import LettersToEditor from '../components/LettersToEditor';
import { useWorkProjects } from '../hooks/useContentQuery';
import type { WorkProject } from '../types/content';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSwipeGesture } from '../hooks/useSwipeGesture';

const Index = () => {
  const {
    data: projects = [],
    isLoading: loading,
    error,
    isError
  } = useWorkProjects();

  const featuredProject = projects.find(p => p.metadata?.featured) || projects[0];
  const otherProjects = featuredProject
    ? projects.filter(p => p.slug !== featuredProject.slug).slice(0, 6)
    : [];
  const { isMobile, isTouch } = useMobileOptimization();
  const [currentSection, setCurrentSection] = useState(0);

  // Move sections array declaration before useSwipeGesture
  const sections = ['hero', 'featured', 'letters'];

  // Fix useSwipeGesture usage to match expected interface and use functional updates
  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeUp: () => {
      setCurrentSection(prev => {
        const nextSection = Math.min(prev + 1, sections.length - 1);
        if (nextSection !== prev) {
          document.getElementById(sections[nextSection])?.scrollIntoView({ behavior: 'smooth' });
        }
        return nextSection;
      });
    },
    onSwipeDown: () => {
      setCurrentSection(prev => {
        const prevSection = Math.max(prev - 1, 0);
        if (prevSection !== prev) {
          document.getElementById(sections[prevSection])?.scrollIntoView({ behavior: 'smooth' });
        }
        return prevSection;
      });
    }
  });

  // Removed skeleton loader - show content immediately

  // Show the main layout even if no projects, but handle featured project gracefully
  return (
    <div className="magazine-container overflow-x-hidden w-full max-w-full" ref={swipeRef}>
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
