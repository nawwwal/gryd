
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
      {/* Magazine Header */}
      <div className="magazine-hero">
        <div className="hero-paper">
          <div className="paper-binding"></div>
          
          <div className="hero-content">
            <ScrollFade>
              <div className="masthead">
                <div className="issue-details">
                  <span className="issue-number">Lab</span>
                  <span className="issue-date">Experiments</span>
                  <span className="price">Live</span>
                </div>
                
                <h1 className="magazine-logo">
                  PLAYGROUND
                  <span className="subtitle">Experiments & Dead Ends</span>
                </h1>
                
                <div className="feature-banner">
                  <span>Lab: Things That Make Me Curious</span>
                </div>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={300}>
              <div className="hero-story">
                <div className="story-category">LABORATORY</div>
                <h2 className="story-headline">
                  Experiments<br/>
                  <span className="story-subhead">Most of this is useless. Some of it changes everything.</span>
                </h2>
                
                <div className="story-lead">
                  <p className="lead-text">
                    Dead ends, curiosities, and things that break.
                    This page updates whenever I break something new.
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
          
          <div className="paper-corner"></div>
          <div className="paper-shadow"></div>
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
