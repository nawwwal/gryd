
import CMSNavigation from '../components/cms/CMSNavigation';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import WorkCMS from '../components/cms/WorkCMS';

const WorkCMSPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <CMSNavigation />
        <WorkCMS />
      </div>
    </ProtectedRoute>
  );
};

export default WorkCMSPage;
