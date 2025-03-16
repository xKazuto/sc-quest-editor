import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  isAdmin: boolean;
  login: (id: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const VALID_CREDENTIALS = [
  {
    id: 'StalkerClassic',
    password: 'QuestMaking556'
  },
  {
    id: 'DJ_MF',
    password: 'Qu3stM@ker789#DJ'
  },
  {
    id: 'SSURV',
    password: 'Q!u@e#s$tM%a^k&er*'
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin] = useState(true);
  const navigate = useNavigate();

  const login = (id: string, password: string) => {
    const validUser = VALID_CREDENTIALS.find(
      cred => cred.id === id && cred.password === password
    );

    if (validUser) {
      setIsAuthenticated(true);
      setCurrentUser(id);
      navigate('/');
      toast.success('Successfully logged in');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate('/login');
    toast.success('Successfully logged out');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      isAdmin, 
      login, 
      logout
    }}>
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