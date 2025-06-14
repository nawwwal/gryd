
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
  },
  {
    title: 'photo series',
    description: 'brutalist architecture meets minimal composition',
    status: 'ongoing',
    type: 'visual',
    category: 'Photography',
    difficulty: 'Intermediate',
    tools: ['Camera', 'Lightroom'],
  },
  {
    title: 'micro-interaction study',
    description: 'hover effects that don\'t make you want to close the tab',
    status: 'prototype',
    type: 'interaction',
    category: 'UX Research',
    difficulty: 'Expert',
    tools: ['Figma', 'Framer'],
  },
  {
    title: 'dashboard autopsy',
    description: 'photographic evidence of why most dashboards fail',
    status: 'case study',
    type: 'research',
    category: 'Design Analysis',
    difficulty: 'Intermediate',
    tools: ['Analytics', 'Screenshots'],
  },
  {
    title: 'impossible color combinations',
    description: 'palettes that shouldn\'t work but somehow do',
    status: 'color study',
    type: 'design',
    category: 'Color Theory',
    difficulty: 'Beginner',
    tools: ['Adobe Color', 'Sketch'],
  },
  {
    title: 'form field archaeology',
    description: 'digging up the worst input patterns on the internet',
    status: 'research',
    type: 'analysis',
    category: 'UX Audit',
    difficulty: 'Advanced',
    tools: ['Browser DevTools', 'Screenshots'],
  },
  {
    title: 'animation manifesto',
    description: 'why most web animations are terrible and how to fix them',
    status: 'draft',
    type: 'writing',
    category: 'Motion Design',
    difficulty: 'Expert',
    tools: ['After Effects', 'CSS'],
  },
  {
    title: 'type specimen',
    description: 'testing fonts that designers claim are "readable"',
    status: 'experiment',
    type: 'typography',
    category: 'Typography',
    difficulty: 'Intermediate',
    tools: ['FontForge', 'Glyphs'],
  },
];

const getTypeColor = (type: string) => {
  const colors = {
    code: '#e11d48',
    visual: '#7c3aed',
    interaction: '#0ea5e9',
    research: '#059669',
    design: '#dc2626',
    analysis: '#ea580c',
    writing: '#4338ca',
    typography: '#be185d',
  };
  return colors[type as keyof typeof colors] || '#6b7280';
};

const getTypeIcon = (type: string) => {
  const icons = {
    code: '</>', 
    visual: '📸',
    interaction: '✨',
    research: '🔍',
    design: '🎨',
    analysis: '📊',
    writing: '✍️',
    typography: 'Aa',
  };
  return icons[type as keyof typeof icons] || '•';
};

const Playground = () => {
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = masonryRef.current?.querySelectorAll('.classified-card');
    if (!cards) return;

    cards.forEach((card, index) => {
      const delay = Math.random() * 2000 + index * 200;
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

      {/* Classified Masonry Grid */}
      <div className="magazine-spread">
        <div className="article-grid">
          <div className="grid-title">
            <h4>Current Experiments</h4>
            <div className="title-underline"></div>
          </div>
          
          <div ref={masonryRef} className="classified-masonry">
            {experiments.map((experiment, index) => (
              <div 
                key={experiment.title} 
                className="classified-card" 
                style={{ animationDelay: `${index * 100}ms` }}
                data-type={experiment.type}
              >
                <div className="classified-header">
                  <div className="type-badge" style={{ backgroundColor: getTypeColor(experiment.type) }}>
                    <span className="type-icon">{getTypeIcon(experiment.type)}</span>
                    <span className="type-text">{experiment.type}</span>
                  </div>
                  <span className="classified-status">{experiment.status}</span>
                </div>

                <div className="experiment-category">
                  <span>{experiment.category}</span>
                  <div className="difficulty-dots">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div 
                        key={i} 
                        className={`dot ${i < (experiment.difficulty === 'Beginner' ? 1 : experiment.difficulty === 'Intermediate' ? 2 : 3) ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                <h5 className="classified-title">
                  {experiment.title.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className="title-char" 
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h5>

                <p className="classified-description">{experiment.description}</p>

                <div className="experiment-tools">
                  {experiment.tools.map((tool, i) => (
                    <span key={i} className="tool-tag">{tool}</span>
                  ))}
                </div>

                <div className="classified-footer">
                  <span className="classified-date">Dec 2024</span>
                  <div className="classified-number">#{String(index + 1).padStart(2, '0')}</div>
                </div>

                <div className="classified-corner-fold"></div>
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
