import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (id: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// This would typically come from an API/backend
const VALID_CREDENTIALS = {
  id: 'admin',
  password: 'password123'
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (id: string, password: string) => {
    if (id === VALID_CREDENTIALS.id && password === VALID_CREDENTIALS.password) {
      setIsAuthenticated(true);
      navigate('/');
      toast.success('Successfully logged in');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
    toast.success('Successfully logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};