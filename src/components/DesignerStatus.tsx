
const DesignerStatus = () => {
  return (
    <div className="availability-section">
      <h3 className="section-title">Current Status</h3>
      <div className="status-indicator">
        <div className="status-dot available pulsing-dot"></div>
        <span className="status-text">Open to new opportunities</span>
      </div>
      <p className="availability-note">
        Currently exploring product design roles and strategic partnerships. 
        Passionate about creating meaningful experiences that bridge 
        user needs with business objectives.
      </p>
      
      <div className="availability-calendar">
        <div className="calendar-header">
          <span className="calendar-label">Let's Connect</span>
        </div>
        <div className="calendar-date interactive-calendar">
          <a 
            href="https://calendly.com/your-handle" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-decoration-none"
          >
            <span className="date-month">SCHEDULE</span>
            <span className="date-day">A</span>
            <span className="date-year">CONVERSATION</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DesignerStatus;
