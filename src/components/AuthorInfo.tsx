
const AuthorInfo = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="subhead">About the Author</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="caption text-gryd-soft">Designer</span>
            <div className="body font-medium">Aditya Nawal</div>
          </div>
          <div className="space-y-2">
            <span className="caption text-gryd-soft">Email</span>
            <a href="mailto:aditya@example.com" className="editorial-link body">
              aditya@example.com
            </a>
          </div>
          <div className="caption text-gryd-soft">
            Usually respond within 24 hours
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="subhead">Connect</h3>
        <div className="space-y-3">
          <a href="#" className="social-link-item">
            <span className="body">LinkedIn</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="#" className="social-link-item">
            <span className="body">Twitter</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="#" className="social-link-item">
            <span className="body">Dribbble</span>
            <span className="social-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
