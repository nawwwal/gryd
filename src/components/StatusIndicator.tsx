
const StatusIndicator = () => {
  return (
    <div className="availability-section">
      <h3 className="section-title">Current Status</h3>
      <div className="status-indicator">
        <div className="status-dot available pulsing-dot"></div>
        <span className="status-text">Available for new projects</span>
      </div>
      <p className="availability-note">
        Currently taking on select projects for Q1 2025. 
        Best fit for teams looking for strategic design partnership 
        rather than just execution.
      </p>
      
      <div className="availability-calendar">
        <div className="calendar-header">
          <span className="calendar-label">Next Available</span>
        </div>
        <div className="calendar-date interactive-calendar">
          <span className="date-month">JAN</span>
          <span className="date-day">15</span>
          <span className="date-year">2025</span>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicator;
