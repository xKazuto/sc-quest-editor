import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { User, AuthContextType } from '@/types/auth';
import { fetchUsers, createUserInDb, removeUserFromDb, getCurrentUser } from '@/services/authService';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const userData = await getCurrentUser(session.user.email!);
        if (userData) {
          setIsAuthenticated(true);
          setCurrentUser(userData.id);
          setIsAdmin(userData.isAdmin);
        }
      }
    };

    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userData = await getCurrentUser(session.user.email!);
        if (userData) {
          setIsAuthenticated(true);
          setCurrentUser(userData.id);
          setIsAdmin(userData.isAdmin);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers().then(setUsers);
    }
  }, [isAdmin]);

  const login = async (id: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: id,
        password: password,
      });

      if (error) throw error;
      
      navigate('/');
      toast.success('Successfully logged in');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const createUser = async (id: string, password: string) => {
    if (!isAdmin) {
      toast.error('Only admins can create users');
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: id,
        password: password,
      });

      if (signUpError) throw signUpError;

      await createUserInDb(id, false);
      setUsers([...users, { id, isAdmin: false }]);
      toast.success('User created successfully');
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const changePassword = async (userId: string, newPassword: string) => {
    if (!isAdmin && currentUser !== userId) {
      toast.error('You can only change your own password');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const removeUser = async (userId: string) => {
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

    try {
      await removeUserFromDb(userId);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User removed successfully');
    } catch (error) {
      toast.error('Failed to remove user');
    }
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