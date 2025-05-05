
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // No longer requiring authentication
  return <>{children}</>;
};

export default ProtectedRoute;
