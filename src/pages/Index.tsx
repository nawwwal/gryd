
import MagazineHero from '../components/MagazineHero';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import LettersToEditor from '../components/LettersToEditor';
import MagazineFooter from '../components/MagazineFooter';
import { projects } from '../data/projects';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import { useState } from 'react';

const Index = () => {
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => p.slug !== featuredProject.slug).slice(0, 6);
  const { isMobile, isTouch } = useMobileOptimization();
  const [currentSection, setCurrentSection] = useState(0);
  
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

  return (
    <div className="magazine-container" ref={swipeRef}>
      <div id="hero">
        <MagazineHero />
      </div>
      
      <div className="magazine-spread" id="featured">
        <FeaturedArticle project={featuredProject} />
        <div id="grid">
          <ArticleGrid projects={otherProjects} />
        </div>
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
