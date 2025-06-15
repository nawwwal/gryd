const DesignerStatus = () => {
  return <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="subhead text-lg">Current Status</h3>
        <div className="flex items-center space-x-3">
          <div className="status-dot-green"></div>
          <span className="body font-medium text-sm">Open to new opportunities</span>
        </div>
        <p className="body text-gryd-soft text-sm leading-relaxed">
          Currently exploring product design roles and strategic partnerships. 
          Passionate about creating meaningful experiences.
        </p>
      </div>
      
      <div className="availability-card">
        <div className="space-y-2">
          <span className="caption text-gryd-soft text-xs">BUILDING SOMETHING MEANINGFUL?</span>
          <a href="https://calendly.com/your-handle" target="_blank" rel="noopener noreferrer" className="schedule-link">
            <div className="flex items-center space-x-2">
              <span className="body font-medium text-sm">let's talk</span>
              
              
            </div>
          </a>
        </div>
      </div>
    </div>;
};
export default DesignerStatus;