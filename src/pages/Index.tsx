
import MobileHero from '../components/MobileHero';
import MagazineHero from '../components/MagazineHero';
import ArticleGrid from '../components/ArticleGrid';
import EditorsPicks from '../components/EditorsPicks';
import LettersToEditor from '../components/LettersToEditor';
import MagazineFooter from '../components/MagazineFooter';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

const Index = () => {
  const { isMobile } = useMobileOptimization();

  return (
    <div className="magazine-container">
      {isMobile ? <MobileHero /> : <MagazineHero />}
      
      <div className="magazine-spread">
        <ArticleGrid />
        <EditorsPicks />
        <LettersToEditor />
      </div>

      <MagazineFooter />
    </div>
  );
};

export default Index;
