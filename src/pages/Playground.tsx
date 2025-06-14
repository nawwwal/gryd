
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
  },
];

const Playground = () => {
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = masonryRef.current?.querySelectorAll('.classified-ad');
    if (!cards) return;

    cards.forEach((card, index) => {
      const delay = Math.random() * 1500 + index * 150;
      setTimeout(() => {
        card.classList.add('animate-in');
      }, delay);
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

      {/* Classified Section */}
      <div className="magazine-spread">
        <div className="classified-section">
          <div className="classified-header-bar">
            <div className="classified-title-group">
              <h2 className="section-title">CLASSIFIED EXPERIMENTS</h2>
              <div className="section-subtitle">ongoing research & development</div>
            </div>
            <div className="classified-meta">
              <span className="issue-number">Issue #47</span>
              <span className="classified-count">{experiments.length} listings</span>
            </div>
          </div>
          
          <div ref={masonryRef} className="classifieds-grid">
            {experiments.map((experiment, index) => (
              <div 
                key={experiment.title} 
                className="classified-ad" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="ad-header">
                  <div className="ad-category">
                    <span className="category-text">{experiment.category}</span>
                    <span className="category-separator">•</span>
                    <span className="ad-type">{experiment.type}</span>
                  </div>
                  <div className="ad-number">#{String(index + 1).padStart(3, '0')}</div>
                </div>

                <h3 className="ad-title">
                  {experiment.title.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className="title-letter" 
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h3>

                <p className="ad-description">{experiment.description}</p>

                <div className="ad-details">
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{experiment.status}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Tools:</span>
                    <span className="detail-value">{experiment.tools.join(', ')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Level:</span>
                    <span className="detail-value">{experiment.difficulty}</span>
                  </div>
                </div>

                <div className="ad-footer">
                  <span className="ad-date">{experiment.date}</span>
                  <span className="ad-contact">Contact: lab@gryd</span>
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
