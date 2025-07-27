import { useState, useEffect } from 'react';
import MagazineHero from '../components/MagazineHero';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import LettersToEditor from '../components/LettersToEditor';
import { useWorkProjects } from '../hooks/useContentQuery';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useMobileNavigationState } from '../hooks/useMobileNavigationState';

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
  const { triggerHaptic } = useMobileNavigationState();
  const [currentSection, setCurrentSection] = useState(0);

  const sections = ['hero', 'featured', 'letters'];

  // Observe sections to update indicator and provide haptic feedback
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id, index) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setCurrentSection(index);
              if (isMobile && isTouch) {
                triggerHaptic({ intensity: 'light' });
              }
            }
          });
        },
        { threshold: 0.6 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, [isMobile, isTouch, triggerHaptic]);

  // Removed skeleton loader - show content immediately

  // Show the main layout even if no projects, but handle featured project gracefully
  return (
    <div className="magazine-container overflow-x-hidden w-full max-w-full">
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
