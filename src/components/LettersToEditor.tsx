
import ScrollFade from './ScrollFade';

const LettersToEditor = () => {
  return (
    <section className="letters-to-editor">
      <div className="letters-paper">
        <div className="letters-binding"></div>
        
        <ScrollFade>
          <div className="letters-content">
            <div className="letters-header">
              <div className="letters-category">Editorial Correspondence</div>
              <h3 className="letters-title">Letters to the Editor</h3>
              <p className="letters-subtitle">
                Your thoughts, feedback, and collaboration inquiries
              </p>
              <div className="letters-divider"></div>
            </div>

            <div className="letters-body">
              <div className="letter-section">
                <p className="letter-intro">
                  The Gryd welcomes correspondence from readers, fellow designers, 
                  and potential collaborators. Whether you have feedback on our 
                  editorial content or wish to discuss a project, we value your input.
                </p>

                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-label">Editorial</span>
                    <span className="contact-value">editor@thegryd.com</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Projects</span>
                    <span className="contact-value">work@thegryd.com</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Response</span>
                    <span className="contact-value">Within 48 hours</span>
                  </div>
                </div>

                <div className="editorial-address">
                  <div className="address-header">Editorial Office</div>
                  <div className="address-line">The Gryd Design Quarterly</div>
                  <div className="address-line">Digital Publishing House</div>
                  <div className="address-line">Available Worldwide</div>
                </div>
              </div>

              <div className="letter-section">
                <h4 className="font-serif text-xl font-bold text-gray-900 mb-4">
                  Submission Guidelines
                </h4>
                
                <div className="submission-guidelines">
                  <div className="guideline-item">
                    <div className="guideline-bullet"></div>
                    <div className="guideline-text">
                      Project inquiries should include scope, timeline, and budget range
                    </div>
                  </div>
                  <div className="guideline-item">
                    <div className="guideline-bullet"></div>
                    <div className="guideline-text">
                      Editorial feedback welcomed on published case studies
                    </div>
                  </div>
                  <div className="guideline-item">
                    <div className="guideline-bullet"></div>
                    <div className="guideline-text">
                      Guest contributions considered for future issues
                    </div>
                  </div>
                  <div className="guideline-item">
                    <div className="guideline-bullet"></div>
                    <div className="guideline-text">
                      All correspondence reviewed by the editorial team
                    </div>
                  </div>
                </div>

                <div className="signature-section">
                  <div className="editor-signature">
                    Looking forward to your correspondence
                  </div>
                  <div className="editor-title">The Editorial Team</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
};

export default LettersToEditor;
