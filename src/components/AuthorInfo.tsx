
const AuthorInfo = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="subhead text-lg">About the Author</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="caption text-gryd-soft">Designer</span>
            <div className="body font-medium">Aditya Nawal</div>
          </div>
          <div className="space-y-1">
            <span className="caption text-gryd-soft">Email</span>
            <a href="mailto:aditya@example.com" className="editorial-link body">
              aditya@example.com
            </a>
          </div>
          <div className="caption text-gryd-soft text-sm">
            Usually respond within 24 hours
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="subhead text-lg">Connect</h3>
        <div className="space-y-2">
          <a href="#" className="social-link-item">
            <span className="body text-sm">LinkedIn</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="#" className="social-link-item">
            <span className="body text-sm">Twitter</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="#" className="social-link-item">
            <span className="body text-sm">Dribbble</span>
            <span className="social-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
