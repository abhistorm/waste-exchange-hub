
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthCheck from './AuthCheck';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  requireAuthForActions?: boolean; // New prop for partial auth
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false,
  requireAuthForActions = false // Default to false
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // If requireAuthForActions is true, we allow viewing but restrict actions in the child components
  if (requireAuthForActions) {
    // Pass through the auth state to the children
    return <>{children}</>;
  }
  
  // Regular auth check for fully protected routes
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
