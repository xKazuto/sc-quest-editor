import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  is_admin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
  users: UserProfile[];
  createUser: (email: string, password: string) => Promise<void>;
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
      .select('id, is_admin');
    
    if (error) {
      toast.error('Failed to fetch users');
      return;
    }

    // Get user emails from auth.users through the admin API
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      toast.error('Failed to fetch user details');
      return;
    }

    if (profiles && authUsers?.users) {
      const combinedUsers = profiles.map(profile => ({
        id: profile.id,
        is_admin: profile.is_admin || false,
        email: authUsers.users.find(u => u.id === profile.id)?.email
      }));
      
      setUsers(combinedUsers);
    }
  };

  useEffect(() => {
    // Set up initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session?.user) {
        setCurrentUser(session.user.email);
        checkAdminStatus(session.user);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session?.user) {
        setCurrentUser(session.user.email);
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
    fetchUsers(); // Fetch users when admin status is checked
  };

  const createUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
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

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
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
