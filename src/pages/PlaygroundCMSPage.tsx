
import CMSNavigation from '../components/cms/CMSNavigation';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import PlaygroundCMS from '../components/cms/PlaygroundCMS';

const PlaygroundCMSPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <CMSNavigation />
        <PlaygroundCMS />
      </div>
    </ProtectedRoute>
  );
};

export default PlaygroundCMSPage;
