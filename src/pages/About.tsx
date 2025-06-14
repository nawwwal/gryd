
import ScrollFade from '../components/ScrollFade';

const About = () => {
  return (
    <div className="magazine-container">
      {/* About Interview Layout */}
      <div className="interview-layout">
        <div className="interview-header">
          <ScrollFade>
            <div className="interview-meta">
              <span className="interview-label">Designer Profile</span>
              <span className="interview-date">December 2024</span>
            </div>
            
            <h1 className="interview-title">
              In Conversation:<br />
              <span className="interview-name">Adi Gryd</span>
            </h1>
            
            <p className="interview-intro">
              Product designer at Quicko, typography obsessive, 
              and someone who thinks good design should feel inevitable.
            </p>
          </ScrollFade>
        </div>
        
        <div className="interview-content">
          <ScrollFade delay={200}>
            <div className="interview-qa">
              <div className="question">
                <span className="q-label">Q:</span>
                <p>How did you get into design?</p>
              </div>
              <div className="answer">
                <span className="a-label">A:</span>
                <p>I started designing in my first year of college — while doing a BTech in computer science. 
                It started with club posters and ended with me skipping algorithms class to study typography.</p>
              </div>
            </div>
          </ScrollFade>
          
          <ScrollFade delay={400}>
            <div className="interview-qa">
              <div className="question">
                <span className="q-label">Q:</span>
                <p>What's your design philosophy?</p>
              </div>
              <div className="answer">
                <span className="a-label">A:</span>
                <p>Over a few summer internships, design competitions, freelance gigs, and club work — I did a bit of everything: graphic design, photography, branding, decks. 
                In Jan 2024, I joined Quicko as a product design intern. In 6 months, I went full-time.</p>
              </div>
            </div>
          </ScrollFade>
          
          <ScrollFade delay={600}>
            <div className="interview-qa">
              <div className="question">
                <span className="q-label">Q:</span>
                <p>What drives you?</p>
              </div>
              <div className="answer">
                <span className="a-label">A:</span>
                <p>I may be early in my career, but I care deeply about what I do. I obsess over spacing, narrative, and micro-decisions. 
                I want my work to feel inevitable. Currently based in the timezone where good coffee happens.</p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="profile-stats">
        <ScrollFade>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">2024</span>
              <span className="stat-label">Started at Quicko</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6 mo</span>
              <span className="stat-label">Intern to Full-time</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Coffee consumed</span>
            </div>
          </div>
        </ScrollFade>
      </div>

      <div className="magazine-footer">
        <div className="footer-content">
          <div className="footer-logo">THE GRYD</div>
          <div className="footer-info">
            <span>About • Designer Profile</span>
            <span>Last Updated: December 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
