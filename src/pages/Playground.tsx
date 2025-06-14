
import { useEffect, useRef } from 'react';
import ScrollFade from '../components/ScrollFade';

const experiments = [
  {
    title: 'css toy 01',
    description: 'buttons that morph into loading states without javascript',
    status: 'live experiment',
    type: 'code',
    category: 'Frontend Engineering',
    difficulty: 'Advanced',
    tools: ['CSS', 'HTML'],
    date: 'Dec 2024',
    visual: 'geometric',
    intensity: 'high'
  },
  {
    title: 'photo series',
    description: 'brutalist architecture meets minimal composition',
    status: 'ongoing',
    type: 'visual',
    category: 'Photography',
    difficulty: 'Intermediate',
    tools: ['Camera', 'Lightroom'],
    date: 'Nov 2024',
    visual: 'photographic',
    intensity: 'medium'
  },
  {
    title: 'micro-interaction study',
    description: 'hover effects that don\'t make you want to close the tab',
    status: 'prototype',
    type: 'interaction',
    category: 'UX Research',
    difficulty: 'Expert',
    tools: ['Figma', 'Framer'],
    date: 'Dec 2024',
    visual: 'interactive',
    intensity: 'high'
  },
  {
    title: 'dashboard autopsy',
    description: 'photographic evidence of why most dashboards fail',
    status: 'case study',
    type: 'research',
    category: 'Design Analysis',
    difficulty: 'Intermediate',
    tools: ['Analytics', 'Screenshots'],
    date: 'Oct 2024',
    visual: 'analytical',
    intensity: 'low'
  },
  {
    title: 'impossible color combinations',
    description: 'palettes that shouldn\'t work but somehow do',
    status: 'color study',
    type: 'design',
    category: 'Color Theory',
    difficulty: 'Beginner',
    tools: ['Adobe Color', 'Sketch'],
    date: 'Nov 2024',
    visual: 'colorful',
    intensity: 'high'
  },
  {
    title: 'form field archaeology',
    description: 'digging up the worst input patterns on the internet',
    status: 'research',
    type: 'analysis',
    category: 'UX Audit',
    difficulty: 'Advanced',
    tools: ['Browser DevTools', 'Screenshots'],
    date: 'Sep 2024',
    visual: 'technical',
    intensity: 'medium'
  },
  {
    title: 'animation manifesto',
    description: 'why most web animations are terrible and how to fix them',
    status: 'draft',
    type: 'writing',
    category: 'Motion Design',
    difficulty: 'Expert',
    tools: ['After Effects', 'CSS'],
    date: 'Dec 2024',
    visual: 'motion',
    intensity: 'high'
  },
  {
    title: 'type specimen',
    description: 'testing fonts that designers claim are "readable"',
    status: 'experiment',
    type: 'typography',
    category: 'Typography',
    difficulty: 'Intermediate',
    tools: ['FontForge', 'Glyphs'],
    date: 'Oct 2024',
    visual: 'typographic',
    intensity: 'medium'
  },
];

const Playground = () => {
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="magazine-container">
      {/* Lab Experimental Header */}
      <div className="lab-experimental-header">
        <div className="lab-notebook">
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
                  <span key={index} className="hover-letter lab-letter" style={{ animationDelay: `${index * 80}ms` }}>
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
                key={experiment.title} 
                className={`experiment-card experiment-${experiment.visual} intensity-${experiment.intensity}`}
                data-type={experiment.type}
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
                      <span className="experiment-type">{experiment.type}</span>
                    </div>
                    <div className="experiment-status">
                      <div className="status-dot"></div>
                      <span className="status-text">{experiment.status}</span>
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
                        <span className="detail-value">{experiment.category}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Level</span>
                        <span className="detail-value">{experiment.difficulty}</span>
                      </div>
                    </div>
                    <div className="tools-list">
                      {experiment.tools.map((tool, i) => (
                        <span key={i} className="tool-tag">{tool}</span>
                      ))}
                    </div>
                  </div>

                  <div className="experiment-footer">
                    <span className="experiment-date">{experiment.date}</span>
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
