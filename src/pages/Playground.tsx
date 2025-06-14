
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
  const titleRef = useRef<HTMLDivElement>(null);

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
    // Add hover effects to title letters
    const title = titleRef.current;
    if (!title) return;

    const letters = title.querySelectorAll('.hover-letter');
    letters.forEach((letter) => {
      letter.addEventListener('mouseenter', () => {
        letter.classList.add('letter-hover');
      });
      letter.addEventListener('mouseleave', () => {
        letter.classList.remove('letter-hover');
      });
    });
  }, []);

  const renderInteractiveTitle = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`hover-letter inline-block ${char === ' ' ? 'w-4' : ''}`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="magazine-container">
      {/* Newspaper Header */}
      <div className="newspaper-header">
        <div className="paper-sheet">
          <ScrollFade>
            <div className="newspaper-masthead">
              <div className="publication-info">
                <div className="date-stamp">December 14, 2024</div>
                <div className="edition">Digital Laboratory Edition</div>
                <div className="price">Est. 2024 • Always Experimental</div>
              </div>
              
              <div className="main-headline-section">
                <div className="headline-kicker">EXPERIMENTAL LABORATORY</div>
                <h1 ref={titleRef} className="main-headline">
                  {renderInteractiveTitle('PLAYGROUND')}
                </h1>
                <div className="headline-deck">
                  Where Good Ideas Come to Break Things
                </div>
              </div>
              
              <div className="newspaper-columns">
                <div className="column">
                  <p className="column-text">
                    Dead ends, curiosities, and things that shouldn't work but somehow do. 
                    This laboratory updates whenever something interesting breaks.
                  </p>
                </div>
                <div className="column">
                  <div className="experiment-stats">
                    <div className="stat">
                      <span className="stat-number">{experiments.length}</span>
                      <span className="stat-label">Active Experiments</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">∞</span>
                      <span className="stat-label">Potential Failures</span>
                    </div>
                  </div>
                </div>
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
            <h3>Laboratory Notes</h3>
            <div className="notes-list">
              <div className="note-item">
                <span>•</span>
                <span>This page updates whenever something interesting breaks</span>
              </div>
              <div className="note-item">
                <span>•</span>
                <span>Results not guaranteed, side effects may include curiosity</span>
              </div>
              <div className="note-item">
                <span>•</span>
                <span>Bookmark if you enjoy watching things fall apart beautifully</span>
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
            <span>Updated: When Things Break Beautifully</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
