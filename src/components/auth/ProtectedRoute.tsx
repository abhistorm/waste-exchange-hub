
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthCheck from './AuthCheck';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminRequired?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminRequired = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Not authenticated, show auth check
  if (!isAuthenticated) {
    return <AuthCheck>{children}</AuthCheck>;
  }
  
  // Admin route but user is not admin
  if (adminRequired && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // User is authenticated (and is admin if required)
  return <>{children}</>;
};

export default ProtectedRoute;
