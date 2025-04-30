
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/material';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check for stored authentication on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Mock authentication functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // This would be replaced with actual API calls in a real app
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin user
      if (email === 'admin@example.com' && password === 'admin') {
        const adminUser: User = {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          dateJoined: new Date(),
          isVerified: true,
          listings: 5
        };
        setUser(adminUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return true;
      }
      
      // Mock regular user
      if (email && password) {
        const newUser: User = {
          id: Math.floor(Math.random() * 1000) + 2,
          name: email.split('@')[0],
          email: email,
          role: 'user',
          dateJoined: new Date(),
          isVerified: false,
          listings: 0
        };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // This would be replaced with actual API calls in a real app
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        const newUser: User = {
          id: Math.floor(Math.random() * 1000) + 100,
          name: name,
          email: email,
          role: 'user',
          dateJoined: new Date(),
          isVerified: false,
          listings: 0
        };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
