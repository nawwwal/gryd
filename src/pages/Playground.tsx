import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';
import InteractiveBackground from '../components/InteractiveBackground';
import { MorphingText } from '../components/MorphingText';
import { usePlaygroundEntries } from '../hooks/useContentQuery';
import { getSanityImageUrl } from '../utils/imageUtils';
import { PlaygroundEntry } from '../types/content';
import ExperimentsSkeleton from '../components/skeletons/ExperimentsSkeleton';

const Playground = () => {
  const masonryRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { data: entries = [], isLoading: loading } = usePlaygroundEntries();
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  });

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const rect = backgroundRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    const backgroundElement = backgroundRef.current;
    if (backgroundElement) {
      backgroundElement.addEventListener('mousemove', handleMouseMove);
      return () => backgroundElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    if (!loading && entries.length > 0) {
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
      cards.forEach(card => {
        const rotation = (Math.random() - 0.5) * 4; // -2 to 2 degrees
        const translateX = (Math.random() - 0.5) * 8; // -4 to 4px
        const translateY = (Math.random() - 0.5) * 8;
        (card as HTMLElement).style.transform = `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`;
      });
    }
  }, [loading, entries]);

  return (
    <div className="magazine-container">
      {/* Enhanced Experimental Hero - Full Viewport Height */}
      <div className="playground-hero-container">
        <div ref={backgroundRef} className="playground-hero-background">
          <InteractiveBackground mousePos={mousePos} />
        </div>

        <div className="playground-hero-content">
          <div className="lab-notebook enhanced-gyroscopic">
            <div className="lab-header-content">
              <div className="lab-title-section">
                <div className="morphing-title-container">
                  <MorphingText
                    texts={['PLAYGROUND', 'LABORATORY', 'EXPERIMENTS', 'RESEARCH']}
                    className="morphing-title"
                  />
                </div>

                <div className="lab-subtitle-minimal">
                  <div className="lab-subtitle-text">Research Lab • Experiments & Dead Ends</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experiments Section */}
      <div className="magazine-spread">
        <div className="experiments-section">
          <div className="experiments-header-bar-new">
            <div className="experiments-title-group">
              <h2 className="section-title">CURRENT EXPERIMENTS</h2>
              <div className="section-subtitle">live research & active investigations</div>
            </div>
            <div className="experiments-meta">
              <span className="lab-number">LAB #47</span>
              <span className="experiment-count">{entries.length} active studies</span>
            </div>
          </div>

          <div ref={masonryRef} className="experiments-grid">
            {loading ? (
              <ExperimentsSkeleton count={6} />
            ) : entries.length > 0 ? (
                entries.map((entry, index) => (
                <Link to={`/playground/${entry.slug}`} key={entry.slug} className={`experiment-card experiment-${entry.entryType}`} data-category={entry.entryType}>
                  {/* Visual Background Element or Hero Image */}
                  {entry.coverImage ? (
                    <div className="experiment-image">
                      <img
                        src={getSanityImageUrl(entry.coverImage, { width: 400, height: 300 }) || '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png'}
                        alt={entry.coverImage?.alt || entry.title}
                        className="experiment-hero-image"
                      />
                      <div className="image-overlay"></div>
                    </div>
                  ) : (
                    <div className="experiment-visual">
                      <div className="visual-pattern"></div>
                      <div className="visual-overlay"></div>
                    </div>
                  )}

                  {/* Content Layer */}
                  <div className="experiment-content">
                    <div className="experiment-header">
                      <div className="experiment-meta">
                        <span className="experiment-number">#{String(index + 1).padStart(2, '0')}</span>
                        <span className="experiment-type">{entry.entryType}</span>
                      </div>
                      <div className="experiment-status">
                        <div className="status-dot"></div>
                        <span className="status-text">{entry.metadata?.status}</span>
                      </div>
                    </div>

                    <h3 className="experiment-title">
                      {entry.title.split('').map((char, i) => (
                        <span key={i} className="title-char" style={{
                          animationDelay: `${i * 50}ms`
                        }}>
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </h3>

                    <p className="experiment-description">{entry.description}</p>

                    <div className="experiment-details">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Category</span>
                          <span className="detail-value">{entry.entryType}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Tags</span>
                          <span className="detail-value">{entry.metadata?.tags?.join(', ')}</span>
                        </div>
                      </div>
                      <div className="tools-list">
                        {entry.metadata?.tools?.map((tool, i) => (
                          <span key={i} className="tool-tag">{tool}</span>
                        ))}
                      </div>
                    </div>

                    <div className="experiment-footer">
                      <span className="experiment-date">
                        {new Date(entry.metadata?.publishDate || Date.now()).toLocaleDateString('en-US', {
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
                </Link>
              ))
            ) : (
              <div className="text-center py-16 col-span-full">
                <p className="body text-gryd-soft mb-4">No experiments found in the laboratory.</p>
                <p className="caption text-gryd-soft">Research content may still be loading or not yet published.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Playground;
