import MagazineHero from '../components/MagazineHero';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import LettersToEditor from '../components/LettersToEditor';
import { useWorkProjects } from '../hooks/useContentQuery';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useMobileNavigationState } from '../hooks/useMobileNavigationState';
import MetaTags from '../components/MetaTags';

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

  // Removed skeleton loader - show content immediately

  // Show the main layout even if no projects, but handle featured project gracefully
  return (
    <>
      <MetaTags
        title="The GRYD - A Digital Magazine by Aditya Nawal"
        description="The GRYD is a digital magazine showcasing the creative work of Aditya Nawal, a product designer and developer. Explore projects, articles, and experiments."
      />
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
      </div>
    </>
  );
};

export default Index;
