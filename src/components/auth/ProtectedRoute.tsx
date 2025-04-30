
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthCheck from './AuthCheck';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // If not authenticated, show AuthCheck
  if (!isAuthenticated) {
    return <AuthCheck>{children}</AuthCheck>;
  }
  
  // If admin-only route and user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // User is authenticated and has proper permissions
  return <>{children}</>;
};

export default ProtectedRoute;
