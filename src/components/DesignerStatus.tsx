
const DesignerStatus = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="subhead">Current Status</h3>
        <div className="flex items-center space-x-3">
          <div className="status-dot-green"></div>
          <span className="body font-medium">Open to new opportunities</span>
        </div>
        <p className="body text-gryd-soft">
          Currently exploring product design roles and strategic partnerships. 
          Passionate about creating meaningful experiences that bridge 
          user needs with business objectives.
        </p>
      </div>
      
      <div className="availability-card">
        <div className="space-y-3">
          <span className="caption text-gryd-soft">Let's Connect</span>
          <a 
            href="https://calendly.com/your-handle" 
            target="_blank"
            rel="noopener noreferrer"
            className="schedule-link"
          >
            <div className="flex items-center space-x-4">
              <span className="body font-medium">SCHEDULE</span>
              <span className="subhead">A</span>
              <span className="body font-medium">CONVERSATION</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DesignerStatus;
