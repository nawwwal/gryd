import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const editorNotes = [
  "Is it ‘minimal’ or did you just run out of ideas?",
  "The best designs are the ones you don't notice. Or do you?",
  "Breaking: Designer discovers that good typography is just fancy spacing.",
  "That's not a bug, it's an undocumented feature.",
  "Why every button needs a hover state and a backstory.",
  "User research reveals people actually read the content (shocking).",
  "Whitespace is not empty space. It's a silent partner.",
  "The correlation between coffee consumption and pixel perfection is real.",
];

const MagazineFooter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentNote, setCurrentNote] = useState(0);

  useEffect(() => {
    const timeTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    const noteTimer = setInterval(() => {
      setCurrentNote((prevNote) => (prevNote + 1) % editorNotes.length);
    }, 4000); // Change note every 4 seconds

    return () => {
      clearInterval(timeTimer);
      clearInterval(noteTimer);
    };
  }, []);

  const format = (date: Date) => {
    const timeString = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return { timeString, dateString };
  };

  const { timeString, dateString } = format(currentTime);

  return (
    <footer className="grid-footer">
      <div className="footer-board">
        {/* Row 1 */}
        <div className="cell star-cell flex items-center justify-center" data-cta="Explore">
          <Link to="/playground" className="cell-link-overlay" aria-label="Explore the Playground"></Link>
          <span className="star-icon">✶</span>
        </div>
        <div className="cell title-cell col-span-2 flex items-center justify-center">
          <h1 className="footer-title">THE GRYD MAGAZINE</h1>
        </div>
        <div className="cell editor-note-cell p-4 flex flex-col justify-center">
          <h3 className="cell-heading">Editor's Note</h3>
          <p className="cell-text note-ticker">{editorNotes[currentNote]}</p>
        </div>

        {/* Row 2 */}
        <div className="cell discovery-cell p-4" data-cta="Read Philosophy">
          <Link to="/about" className="cell-link-overlay" aria-label="Read more about my philosophy"></Link>
          <h3 className="cell-heading">Discovery for creative survival</h3>
          <p className="cell-text">Design isn’t a fixed state; it’s a living method of inquiry. Here, we explore the thinking behind the pixels.</p>
        </div>
        <div className="cell photo-cell overflow-hidden" data-cta="Meet the Editor">
          <Link to="/about" className="cell-link-overlay" aria-label="Learn more about Aditya Nawal"></Link>
          <img src="/aditya nawal.jpg" alt="Aditya Nawal" className="photo w-full h-full object-cover" />
        </div>
        <div className="cell many-cell p-4" data-cta="View Projects">
          <Link to="/work" className="cell-link-overlay" aria-label="View my work"></Link>
          <h3 className="cell-heading">There are many of us</h3>
          <p className="cell-text">A collection of projects exploring brand, system, and interface design for clients big and small.</p>
        </div>
        <div className="cell freedom-cell p-4" data-cta="Get in Touch">
          <Link to="/contact" className="cell-link-overlay" aria-label="Contact me"></Link>
          <h3 className="cell-heading">Cultural freedom<br/>and cold code</h3>
        </div>

        {/* Row 3 */}
        <div className="cell bang-cell col-span-2 flex items-center justify-center" data-cta="Enter Playground">
          <Link to="/playground" className="cell-link-overlay" aria-label="See my experimental work"></Link>
          <h2 className="bang-text">EXPERIMENTS</h2>
        </div>
        <div className="cell humanity-cell p-4" data-cta="See Case Studies">
          <Link to="/work" className="cell-link-overlay" aria-label="Explore my case studies"></Link>
          <h3 className="cell-heading">Humanity at work</h3>
          <p className="cell-text">Beyond the deliverables, this is where design meets purpose. A look at process, challenges, and outcomes.</p>
        </div>
        <div className="cell status-cell p-4 flex flex-col justify-between">
          <div>
            <h3 className="cell-heading">Now printing</h3>
            <p className="status-time font-mono">{timeString} — {dateString}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="status-dot" />
            <span className="font-body text-sm">Open for projects</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar text-center">
        © 2025 THE GRYD. Making complex things feel inevitable.
      </div>
    </footer>
  );
};

export default MagazineFooter;
