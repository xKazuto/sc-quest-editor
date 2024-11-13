import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  password: string;
  isAdmin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  isAdmin: boolean;
  login: (id: string, password: string) => void;
  logout: () => void;
  createUser: (id: string, password: string) => void;
  changePassword: (userId: string, newPassword: string) => void;
  removeUser: (userId: string) => void;
  users: User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

const initialUsers: User[] = [{
  id: 'admin',
  password: 'password123',
  isAdmin: true
}];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (id: string, password: string) => {
    const user = users.find(u => u.id === id && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user.id);
      setIsAdmin(user.isAdmin);
      navigate('/');
      toast.success('Successfully logged in');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate('/login');
    toast.success('Successfully logged out');
  };

  const createUser = (id: string, password: string) => {
    if (!isAdmin) {
      toast.error('Only admins can create users');
      return;
    }
    
    if (users.some(u => u.id === id)) {
      toast.error('User ID already exists');
      return;
    }

    setUsers([...users, { id, password, isAdmin: false }]);
    toast.success('User created successfully');
  };

  const changePassword = (userId: string, newPassword: string) => {
    if (!isAdmin && currentUser !== userId) {
      toast.error('You can only change your own password');
      return;
    }

    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, password: newPassword }
        : user
    ));
    toast.success('Password changed successfully');
  };

  const removeUser = (userId: string) => {
    if (!isAdmin) {
      toast.error('Only admins can remove users');
      return;
    }

    if (userId === 'admin') {
      toast.error('Cannot remove admin user');
      return;
    }

    if (userId === currentUser) {
      toast.error('Cannot remove your own account');
      return;
    }

    setUsers(users.filter(user => user.id !== userId));
    toast.success('User removed successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      isAdmin, 
      login, 
      logout, 
      createUser, 
      changePassword,
      removeUser,
      users 
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