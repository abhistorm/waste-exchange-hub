
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock authentication helper
// In a real app, this would use your auth system
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: AuthCheckProps) => {
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // If already authenticated, render children
  if (isAuthenticated()) {
    return <>{children}</>;
  }

  // If decided to redirect to sign in
  if (redirectToSignIn) {
    toast({
      title: "Authentication required",
      description: "Please sign in to continue.",
    });
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  // If decided to redirect to sign up
  if (redirectToSignUp) {
    toast({
      title: "Authentication required",
      description: "Please create an account to continue.",
    });
    return <Navigate to="/signup" state={{ from: location.pathname }} replace />;
  }

  // Show auth required message
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Authentication Required</CardTitle>
          <CardDescription>
            You need to be signed in to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">
            Please sign in with your existing account or create a new account to continue.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => setRedirectToSignIn(true)}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button 
            onClick={() => setRedirectToSignUp(true)}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthCheck;
