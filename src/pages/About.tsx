
import ScrollFade from '../components/ScrollFade';
import EditorInterview from '../components/EditorInterview';
import EditorsPicks from '../components/EditorsPicks';
import RapidFire from '../components/RapidFire';
import EpilogueSection from '../components/EpilogueSection';
import MagazineFooter from '../components/MagazineFooter';

const About = () => {
  return (
    <div className="magazine-container about-editor-page">
      {/* Magazine Masthead */}
      <div className="editor-masthead">
        <div className="masthead-paper">
          <div className="paper-binding"></div>
          <div className="masthead-content">
            <ScrollFade>
              <div className="publication-header">
                <div className="publication-details">
                  <span>VOL. I</span>
                  <span>•</span>
                  <span>ISSUE 001</span>
                  <span>•</span>
                  <span>EST. 2021</span>
                </div>
                
                <h1 className="magazine-title">
                  {'GRYD'.split('').map((letter, index) => (
                    <span 
                      key={index} 
                      className="hover-letter title-letter" 
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
                
                <div className="editor-credit">
                  <span className="edited-by">EDITED BY</span>
                  <span className="editor-name">ADITYA NAWAL</span>
                </div>
                
                <div className="publication-subtitle">
                  A publication of systems, stories & sidequests
                </div>
                
                {/* PDF Download Button */}
                <div className="masthead-actions mt-8">
                  <button className="print-issue-btn">
                    <span>📄</span>
                    <span>PRINT THIS ISSUE</span>
                  </button>
                </div>
              </div>
            </ScrollFade>
          </div>
          <div className="paper-corner-fold"></div>
        </div>
      </div>

      {/* Editor Interview Section */}
      <div className="magazine-spread">
        <ScrollFade delay={200}>
          <div className="section-header">
            <div className="section-category">FEATURE INTERVIEW</div>
            <h2 className="section-title">About the Editor</h2>
            <div className="section-divider"></div>
          </div>
        </ScrollFade>
        <EditorInterview />
      </div>

      {/* Resume Table of Contents */}
      <div className="magazine-spread">
        <ScrollFade delay={300}>
          <div className="resume-section">
            <div className="section-header">
              <div className="section-category">TABLE OF CONTENTS</div>
              <h2 className="section-title">Professional Timeline</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="resume-content">
              <div className="resume-binding-line"></div>
              
              <div className="resume-entry">
                <div className="entry-timeline">2024 – PRESENT</div>
                <div className="entry-company">QUICKO</div>
                <div className="entry-role">Product Designer</div>
                <div className="entry-description">
                  Intern → Full Time. Simplifying finance UX in India.
                </div>
              </div>
              
              <div className="resume-entry">
                <div className="entry-timeline">2020 – 2024</div>
                <div className="entry-company">DAIICT GANDHINAGAR</div>
                <div className="entry-role">BTech, Computer Science</div>
                <div className="entry-description">
                  Where design found me in a CS classroom.
                </div>
              </div>
            </div>
          </div>
        </ScrollFade>
      </div>

      {/* Editor's Picks */}
      <div className="magazine-spread">
        <ScrollFade delay={400}>
          <div className="section-header">
            <div className="section-category">EDITOR'S PICKS</div>
            <h2 className="section-title">Currently on My Desk</h2>
            <div className="section-divider"></div>
          </div>
        </ScrollFade>
        <EditorsPicks />
      </div>

      {/* Rapid Fire */}
      <div className="magazine-spread">
        <ScrollFade delay={500}>
          <div className="section-header">
            <div className="section-category">RAPID FIRE</div>
            <h2 className="section-title">Quick Takes</h2>
            <div className="section-divider"></div>
          </div>
        </ScrollFade>
        <RapidFire />
      </div>

      {/* Epilogue Section */}
      <EpilogueSection />

      {/* Enhanced Magazine Footer - Now Common Component */}
      <MagazineFooter />
    </div>
  );
};

export default About;
