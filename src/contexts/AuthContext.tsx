import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  isAdmin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  isAdmin: boolean;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createUser: (id: string, password: string) => Promise<void>;
  changePassword: (userId: string, newPassword: string) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  users: User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, is_admin')
          .eq('id', session.user.email)
          .single();

        if (userData) {
          setIsAuthenticated(true);
          setCurrentUser(userData.id);
          setIsAdmin(userData.is_admin);
        }
      }
    };

    checkSession();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, is_admin')
          .eq('id', session.user.email)
          .single();

        if (userData) {
          setIsAuthenticated(true);
          setCurrentUser(userData.id);
          setIsAdmin(userData.is_admin);
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
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, is_admin');
      
      if (error) {
        toast.error('Failed to fetch users');
        return;
      }
      
      setUsers(data || []);
    };

    if (isAdmin) {
      fetchUsers();
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

      const { error: insertError } = await supabase
        .from('users')
        .insert([{ id, is_admin: false }]);

      if (insertError) throw insertError;

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
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

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