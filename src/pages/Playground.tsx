
import { useEffect, useRef } from 'react';
import ScrollFade from '../components/ScrollFade';

const experiments = [
  {
    title: 'css toy 01',
    description: 'buttons that morph into loading states without javascript',
    status: 'live experiment',
    type: 'code',
  },
  {
    title: 'photo series',
    description: 'brutalist architecture meets minimal composition',
    status: 'ongoing',
    type: 'visual',
  },
  {
    title: 'micro-interaction study',
    description: 'hover effects that don\'t make you want to close the tab',
    status: 'prototype',
    type: 'interaction',
  },
  {
    title: 'dashboard autopsy',
    description: 'photographic evidence of why most dashboards fail',
    status: 'case study',
    type: 'research',
  },
  {
    title: 'impossible color combinations',
    description: 'palettes that shouldn\'t work but somehow do',
    status: 'color study',
    type: 'design',
  },
  {
    title: 'form field archaeology',
    description: 'digging up the worst input patterns on the internet',
    status: 'research',
    type: 'analysis',
  },
  {
    title: 'animation manifesto',
    description: 'why most web animations are terrible and how to fix them',
    status: 'draft',
    type: 'writing',
  },
  {
    title: 'type specimen',
    description: 'testing fonts that designers claim are "readable"',
    status: 'experiment',
    type: 'typography',
  },
];

const Playground = () => {
  const masonryRef = useRef<HTMLDivElement>(null);
  const labTitleRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Experimental glitch effect on lab title
    const title = labTitleRef.current;
    if (!title) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        title.classList.add('glitch-effect');
        setTimeout(() => {
          title.classList.remove('glitch-effect');
        }, 200);
      }
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="magazine-container">
      {/* Experimental Lab Header */}
      <div className="experimental-lab-header">
        <div className="lab-workspace">
          <ScrollFade>
            <div className="workspace-grid">
              <div className="lab-status-board">
                <div className="status-indicator pulsing"></div>
                <span className="status-text">CURRENTLY EXPERIMENTING</span>
              </div>
              
              <div ref={labTitleRef} className="lab-title-experimental">
                <div className="title-stack">
                  <span className="title-shadow">PLAYGROUND</span>
                  <span className="title-main">PLAYGROUND</span>
                  <span className="title-glitch">PL4YGR0UND</span>
                </div>
                <div className="title-subtitle">
                  Where good ideas come to break
                </div>
              </div>
              
              <div className="experiment-counter">
                <div className="counter-display">
                  <span className="counter-number">{experiments.length}</span>
                  <span className="counter-label">Active Experiments</span>
                </div>
                <div className="counter-ticker">
                  <div className="ticker-line"></div>
                </div>
              </div>
            </div>
            
            <div className="lab-description-experimental">
              <p className="description-line">Dead ends, curiosities, and things that break.</p>
              <p className="description-line">This page updates whenever I break something new.</p>
              <div className="description-accent">
                <span>⚠️ Results not guaranteed</span>
              </div>
            </div>
          </ScrollFade>
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
              <div key={experiment.title} className="classified-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="classified-header">
                  <span className="classified-type">{experiment.type}</span>
                  <span className="classified-status">{experiment.status}</span>
                </div>
                <h5 className="classified-title">{experiment.title}</h5>
                <p className="classified-description">{experiment.description}</p>
                <div className="classified-footer">
                  <span className="classified-date">Dec 2024</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lab Notes */}
      <div className="lab-notes">
        <ScrollFade>
          <div className="notes-content">
            <h3>Lab Notes</h3>
            <div className="notes-list">
              <div className="note-item">
                <span>•</span>
                <span>This page updates whenever I break something new</span>
              </div>
              <div className="note-item">
                <span>•</span>
                <span>Bookmark it if you're into that sort of thing</span>
              </div>
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
