
import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import CMSLogin from './CMSLogin';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <CMSLogin />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
