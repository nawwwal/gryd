const AuthorInfo = () => {
  return <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="subhead text-lg">About the Author</h3>
        <div className="space-y-3">
          <div className="space-y-1 flex justify-start items-end ">
            <span className="caption text-gryd-soft h-fit my-[4px]">Designer</span>
            <div className="body font-medium mx-[10px]">Aditya Nawal</div>
          </div>
          <div className="space-y-1 mx-0">
            <span className="caption text-gryd-soft">Email</span>
            <a href="mailto:hey@naw.al" className="editorial-link body mx-[40px]">
              hey@naw.al
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
          <a href="https://www.linkedin.com/in/adityanawal/" target="_blank" rel="noopener noreferrer" className="social-link-item">
            <span className="body text-sm">LinkedIn</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="https://twitter.com/adityanawal" target="_blank" rel="noopener noreferrer" className="social-link-item">
            <span className="body text-sm">Twitter</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="https://github.com/nawwwal" target="_blank" rel="noopener noreferrer" className="social-link-item">
            <span className="body text-sm">GitHub</span>
            <span className="social-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>;
};
export default AuthorInfo;
