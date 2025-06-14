
import ScrollFade from '../components/ScrollFade';
import MagazineSection from '../components/MagazineSection';
import ProjectCard from '../components/ProjectCard';

const topProjects = [
  {
    slug: 'tamed-tax-chaos',
    title: 'tamed tax chaos',
    subtitle: 'rebuilt checkout flow from scratch',
    description: 'users were abandoning carts because tax calculation took forever. fixed it in 72 hours.',
    image: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png',
    category: 'product design',
    year: '2024'
  },
  {
    slug: 'channeled-dashboard-doubt',
    title: 'channeled dashboard doubt', 
    subtitle: 'turned data paralysis into clarity',
    description: 'sales team had dashboards they never used. made them obsess over 3 numbers instead.',
    image: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png',
    category: 'ux design',
    year: '2024'
  },
  {
    slug: 'fixed-signup-panic',
    title: 'fixed signup panic',
    subtitle: 'deleted 80% of the form fields', 
    description: '7-step signup became 1 step. conversion jumped from 2% to 8%.',
    image: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png',
    category: 'conversion',
    year: '2024'
  }
];

const Index = () => {
  return (
    <div className="magazine-layout">
      {/* Magazine Header */}
      <div className="magazine-header">
        <div className="editorial-container">
          <div className="magazine-masthead">
            <div className="issue-info">
              <span className="issue-number">issue no. 01</span>
              <span className="issue-date">winter 2024</span>
            </div>
            <h1 className="magazine-title">the gryd portfolio</h1>
            <div className="magazine-subtitle">
              <span>product designer who fixes messy things</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Magazine Style */}
      <MagazineSection className="hero-section">
        <div className="magazine-grid">
          <div className="hero-content">
            <ScrollFade>
              <div className="hero-text">
                <h2 className="hero-headline">
                  hello — i'm adi.
                  <br />
                  <span className="accent-text">i fix messy products.</span>
                </h2>
                
                <div className="hero-manifesto">
                  <p className="manifesto-text">
                    six months into my first full-time role at quicko,
                    i've learned that good design isn't about making things pretty.
                    it's about making complex things feel inevitable.
                  </p>
                  
                  <p className="manifesto-subtext">
                    currently building financial tools that don't make you want to cry.
                    if you're working on something that keeps you up at night,
                    let's talk.
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
          
          <div className="hero-visual">
            <ScrollFade delay={200}>
              <div className="magazine-cutout">
                <div className="cutout-content">
                  <span className="cutout-label">featured work</span>
                  <div className="cutout-stats">
                    <div className="stat-item">
                      <span className="stat-number">3</span>
                      <span className="stat-label">projects</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">6</span>
                      <span className="stat-label">months</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </MagazineSection>

      {/* Featured Projects */}
      <MagazineSection className="projects-section">
        <div className="section-header">
          <h3 className="section-title">featured work</h3>
          <p className="section-subtitle">things i've built that moved numbers</p>
        </div>
        
        <div className="projects-grid">
          {topProjects.map((project, index) => (
            <ScrollFade key={project.slug} delay={index * 150}>
              <ProjectCard project={project} index={index} />
            </ScrollFade>
          ))}
        </div>
      </MagazineSection>

      {/* CTA Section */}
      <MagazineSection className="cta-section">
        <ScrollFade>
          <div className="cta-content">
            <h4 className="cta-headline">ready to fix something?</h4>
            <p className="cta-text">
              book 30 minutes. we'll figure out if i can help.
              no sales pitch, just straight talk.
            </p>
            <div className="cta-button-wrapper">
              <a 
                href="https://calendly.com/your-handle" 
                className="magazine-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="cta-text">book a call</span>
                <span className="cta-arrow">→</span>
              </a>
            </div>
          </div>
        </ScrollFade>
      </MagazineSection>

      {/* Footer */}
      <div className="magazine-footer">
        <div className="editorial-container">
          <div className="footer-content">
            <p className="footer-text">gryd.dev — product designer, early career, obsessive about details</p>
            <div className="footer-decoration">
              <div className="decoration-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
