import { useEffect, useRef, useState } from 'react';
import ScrollFade from '../components/ScrollFade';
import { loadPlaygroundExperiments } from '../utils/contentLoader';
import { PlaygroundExperiment } from '../types/content';
import { useGyroscopic } from '../hooks/useGyroscopic';

const Playground = () => {
  const masonryRef = useRef<HTMLDivElement>(null);
  const [experiments, setExperiments] = useState<PlaygroundExperiment[]>([]);
  const [loading, setLoading] = useState(true);
  const notebookRef = useGyroscopic();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const playgroundExperiments = await loadPlaygroundExperiments();
        setExperiments(playgroundExperiments);
      } catch (error) {
        console.error('Failed to load playground experiments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    if (!loading && experiments.length > 0) {
      const cards = masonryRef.current?.querySelectorAll('.experiment-card');
      if (!cards) return;

      // Staggered entrance animation
      cards.forEach((card, index) => {
        const delay = Math.random() * 800 + index * 120;
        setTimeout(() => {
          card.classList.add('animate-in');
        }, delay);
      });

      // Add random rotation and positioning
      cards.forEach((card) => {
        const rotation = (Math.random() - 0.5) * 4; // -2 to 2 degrees
        const translateX = (Math.random() - 0.5) * 8; // -4 to 4px
        const translateY = (Math.random() - 0.5) * 8;
        
        (card as HTMLElement).style.transform = `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`;
      });
    }
  }, [loading, experiments]);

  if (loading) {
    return (
      <div className="magazine-container">
        <div className="editorial-container py-16">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="body text-gryd-soft">Loading playground experiments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="magazine-container">
      {/* Lab Experimental Header */}
      <div className="lab-experimental-header">
        <div ref={notebookRef} className="lab-notebook gyroscopic-card">
          <div className="notebook-rings">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
          </div>
          
          <div className="lab-header-content">
            <div className="lab-stamp">
              <span>EXPERIMENTAL</span>
            </div>
            
            <div className="lab-title-section">
              <h1 className="lab-title">
                {'PLAYGROUND'.split('').map((letter, index) => (
                  <span 
                    key={index} 
                    className="playground-letter" 
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      animationDuration: `${2000 + Math.random() * 1000}ms`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
              <div className="lab-subtitle">Research Lab • Experiments & Dead Ends</div>
            </div>
            
            <div className="lab-warning">
              <div className="warning-triangle">⚠</div>
              <span>Most of this is useless. Some of it changes everything.</span>
            </div>
          </div>
          
          <div className="notebook-stains">
            <div className="coffee-stain"></div>
            <div className="ink-splatter"></div>
          </div>
        </div>
      </div>

      {/* Experiments Section */}
      <div className="magazine-spread">
        <div className="experiments-section">
          <div className="experiments-header-bar">
            <div className="experiments-title-group">
              <h2 className="section-title">CURRENT EXPERIMENTS</h2>
              <div className="section-subtitle">live research & active investigations</div>
            </div>
            <div className="experiments-meta">
              <span className="lab-number">LAB #47</span>
              <span className="experiment-count">{experiments.length} active studies</span>
            </div>
          </div>
          
          <div ref={masonryRef} className="experiments-grid">
            {experiments.map((experiment, index) => (
              <div 
                key={experiment.slug} 
                className={`experiment-card experiment-${experiment.visual} intensity-${experiment.intensity}`}
                data-type={experiment.metadata.type}
              >
                {/* Visual Background Element */}
                <div className="experiment-visual">
                  <div className="visual-pattern"></div>
                  <div className="visual-overlay"></div>
                </div>

                {/* Content Layer */}
                <div className="experiment-content">
                  <div className="experiment-header">
                    <div className="experiment-meta">
                      <span className="experiment-number">#{String(index + 1).padStart(2, '0')}</span>
                      <span className="experiment-type">{experiment.metadata.type}</span>
                    </div>
                    <div className="experiment-status">
                      <div className="status-dot"></div>
                      <span className="status-text">{experiment.metadata.status}</span>
                    </div>
                  </div>

                  <h3 className="experiment-title">
                    {experiment.title.split('').map((char, i) => (
                      <span 
                        key={i} 
                        className="title-char" 
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </h3>

                  <p className="experiment-description">{experiment.description}</p>

                  <div className="experiment-details">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Category</span>
                        <span className="detail-value">{experiment.metadata.category}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Level</span>
                        <span className="detail-value">{experiment.metadata.difficulty || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="tools-list">
                      {experiment.metadata.tools.map((tool, i) => (
                        <span key={i} className="tool-tag">{tool}</span>
                      ))}
                    </div>
                  </div>

                  <div className="experiment-footer">
                    <span className="experiment-date">
                      {new Date(experiment.metadata.publishDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                    <div className="interaction-hint">
                      <span>hover to investigate</span>
                      <div className="hint-arrow">→</div>
                    </div>
                  </div>
                </div>

                {/* Hover Effects Layer */}
                <div className="experiment-effects">
                  <div className="noise-overlay"></div>
                  <div className="scan-line"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Update Notice */}
      <div className="table-of-contents">
        <ScrollFade>
          <div className="toc-header">
            <h3>Lab Notes</h3>
            <div className="toc-line"></div>
          </div>
          
          <div className="toc-entries">
            <div className="toc-entry">
              <span className="toc-page">•</span>
              <span className="toc-title">This page updates whenever I break something new</span>
            </div>
            <div className="toc-entry">
              <span className="toc-page">•</span>
              <span className="toc-title">Bookmark it if you're into that sort of thing</span>
            </div>
          </div>
        </ScrollFade>
      </div>

      <div className="magazine-footer">
        <div className="footer-content">
          <div className="footer-logo">THE GRYD</div>
          <div className="footer-info">
            <span>Playground • Live Experiments</span>
            <span>Updated: As Things Break</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
