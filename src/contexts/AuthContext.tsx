import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  is_admin: boolean;
  username: string;
  email?: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
  users: UserProfile[];
  createUser: (username: string, password: string) => Promise<void>;
  changePassword: (userId: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, is_admin, username');
    
    if (error) {
      toast.error('Failed to fetch users');
      return;
    }

    if (profiles) {
      const userProfiles: UserProfile[] = profiles.map(profile => ({
        id: profile.id,
        is_admin: profile.is_admin || false,
        username: profile.username
      }));
      setUsers(userProfiles);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session?.user) {
        setCurrentUser(session.user.user_metadata.username);
        checkAdminStatus(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session?.user) {
        setCurrentUser(session.user.user_metadata.username);
        await checkAdminStatus(session.user);
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (user: User) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();
    
    setIsAdmin(!!profile?.is_admin);
    fetchUsers();
  };

  const createUser = async (username: string, password: string) => {
    try {
      // First check if username exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (existingUser) {
        throw new Error('Username already exists');
      }

      const { data, error } = await supabase.auth.signUp({
        email: `${username}@temp.com`,
        password,
        options: {
          data: {
            username
          }
        }
      });

      if (error) throw error;
      
      await fetchUsers();
      toast.success('User created successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user');
    }
  };

  const changePassword = async (userId: string, newPassword: string) => {
    try {
      if (!isAdmin && userId !== session?.user?.id) {
        throw new Error('Unauthorized to change password');
      }

      const { error } = await supabase.auth.admin.updateUserById(
        userId,
        { password: newPassword }
      );

      if (error) throw error;
      
      toast.success('Password changed successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password');
    }
  };

  const login = async (username: string, password: string) => {
    try {
      // First get the user's email from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

      if (profileError || !profile) {
        throw new Error('Invalid username or password');
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: `${username}@temp.com`,
        password,
      });

      if (error) throw error;
      
      navigate('/');
      toast.success('Successfully logged in');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/login');
      toast.success('Successfully logged out');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      isAdmin, 
      login, 
      logout,
      session,
      users,
      createUser,
      changePassword
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