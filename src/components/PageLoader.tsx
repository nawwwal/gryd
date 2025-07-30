import React from 'react';

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="preloader-text">
        <span style={{ animationDelay: '0.1s' }}>G</span>
        <span style={{ animationDelay: '0.2s' }}>R</span>
        <span style={{ animationDelay: '0.3s' }}>Y</span>
        <span style={{ animationDelay: '0.4s' }}>D</span>
      </div>
    </div>
  );
};

export default PageLoader;
