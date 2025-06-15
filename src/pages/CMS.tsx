
import { Navigate } from 'react-router-dom';
import CMSNavigation from '../components/cms/CMSNavigation';

const CMS = () => {
  // Redirect to work cms by default
  return <Navigate to="/cms/work" replace />;
};

export default CMS;
