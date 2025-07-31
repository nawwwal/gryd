
import ScrollFade from '../components/ScrollFade';
import EditorInterview from '../components/EditorInterview';
import EditorsPicks from '../components/EditorsPicks';
import RapidFire from '../components/RapidFire';
import EpilogueSection from '../components/EpilogueSection';

import { useHashScroll } from '../hooks/useHashScroll';

const About = () => {
  useHashScroll();
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
                  {'ADITYA NAWAL'.split('').map((letter, index) => (
                    <span
                      key={index}
                      className="hover-letter title-letter"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </h1>

                <div className="editor-credit">
                  <span className="edited-by">EDITOR OF</span>
                  <span className="editor-name">GRYD</span>
                </div>

                <div className="publication-subtitle">
                  A publication of systems, stories & sidequests
                </div>

                {/* PDF Download Link */}
                <div className="masthead-actions mt-8">
                  <a
                    href="/Aditya Nawal Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="print-issue-btn"
                  >
                    <span>📄</span>
                    <span>Download Full R&eacute;sum&eacute;</span>
                  </a>
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

                        <div className="editorial-timeline">

              {/* Current Experience */}
              <ScrollFade delay={350}>
                <article className="timeline-entry">
                  <div className="entry-marker">
                    <div className="marker-dot current"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="entry-content">
                    <header className="entry-header">
                      <time className="entry-date">Jan 2024 – Present</time>
                      <div className="entry-category">Experience</div>
                    </header>
                    <h3 className="entry-title">Product Designer</h3>
                    <div className="entry-organization">Quicko, Ahmedabad</div>
                    <div className="entry-description">
                      Worked across Quicko's Income Tax platform, mobile app (glyde), and Pro product to design key workflows for File, Save and Investments module. Built the Pay module and Home from the ground up. Led design for Dashboard, Earnings, Bookings, and core entities in Quicko Pro. Designed glyde with a mobile-native approach & design system, standardizing tokens, type scales, and interaction patterns, while aligning behavior with Material Design in close collaboration with engineering.
                    </div>
                  </div>
                </article>
              </ScrollFade>

              {/* Parallel Experience */}
              <ScrollFade delay={400}>
                <article className="timeline-entry">
                  <div className="entry-marker">
                    <div className="marker-dot experience"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="entry-content">
                    <header className="entry-header">
                      <time className="entry-date">Jan 2024 – Jul 2024</time>
                      <div className="entry-category">Parallel Experience</div>
                    </header>
                    <h3 className="entry-title">Product Design Intern</h3>
                    <div className="entry-organization">Sandbox, Ahmedabad</div>
                    <div className="entry-description">
                      In parallel with Quicko, shaped the Console home for Sandbox's developer platform. Defined interface patterns for quota limits, subscriptions and billing flows.
                    </div>
                  </div>
                </article>
              </ScrollFade>

              {/* Previous Experience */}
              <ScrollFade delay={450}>
                <article className="timeline-entry">
                  <div className="entry-marker">
                    <div className="marker-dot experience"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="entry-content">
                    <header className="entry-header">
                      <time className="entry-date">May 2023 – Jul 2023</time>
                      <div className="entry-category">Experience</div>
                    </header>
                    <h3 className="entry-title">Product Design Intern</h3>
                    <div className="entry-organization">Flits, Ahmedabad</div>
                    <div className="entry-description">
                      Designed and shipped core features and marketing pages for Flits, some of which are now live on getflits.com. Built a structured onboarding flow that guided new users through wallet setup, rewards, and key actions—helping them get started with clarity.
                    </div>
                  </div>
                </article>
              </ScrollFade>

              {/* Education */}
              <ScrollFade delay={500}>
                <article className="timeline-entry">
                  <div className="entry-marker">
                    <div className="marker-dot education"></div>
                    <div className="marker-line last"></div>
                  </div>
                  <div className="entry-content">
                    <header className="entry-header">
                      <time className="entry-date">Aug 2020 – Jun 2024</time>
                      <div className="entry-category">Education</div>
                    </header>
                    <h3 className="entry-title">Dhirubhai Ambani Institute of Information and Communication Technology</h3>
                    <div className="entry-organization">B.Tech, Information & Communication Technology with minor in Computational Science</div>
                    <div className="entry-description">
                      Convenor at Muse (Design Club), led design initiatives across campus and mentored juniors. Actively contributed to tech and cultural spaces through DCEI, TechSupport, i.Fest, IEEE SB, and Music Club.
                    </div>
                  </div>
                </article>
              </ScrollFade>
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

      </div>
    );
};

export default About;
