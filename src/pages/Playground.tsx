
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
      {/* Lab Bulletin Board Header */}
      <div className="lab-bulletin-header">
        <div className="bulletin-board">
          <ScrollFade>
            <div className="lab-title-section">
              <div className="lab-badge">
                <span className="badge-text">LAB</span>
              </div>
              
              <h1 className="lab-main-title">
                Playground
              </h1>
              
              <div className="lab-description">
                <p>Dead ends, curiosities, and things that break.</p>
                <p>This page updates whenever I break something new.</p>
              </div>
              
              <div className="lab-status">
                <div className="status-indicator"></div>
                <span>Currently experimenting</span>
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

      {/* Update Notice */}
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
