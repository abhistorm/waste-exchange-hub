
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users who somehow access this page
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Authentication required");
      navigate('/signin');
      return;
    }
    
    if (!isAdmin) {
      toast.error("You don't have permission to access the admin area");
      navigate('/');
      return;
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
