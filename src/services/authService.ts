import { supabase } from '@/lib/supabase';
import { User } from '@/types/auth';
import { toast } from 'sonner';

export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, is_admin');
  
  if (error) {
    toast.error('Failed to fetch users');
    return [];
  }
  
  // Map the database response to our User interface
  return (data || []).map(user => ({
    id: user.id,
    isAdmin: user.is_admin
  }));
};

export const createUserInDb = async (id: string, isAdmin: boolean = false): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .insert([{ id, is_admin: isAdmin }]);

  if (error) throw error;
};

export const removeUserFromDb = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) throw error;
};

export const getCurrentUser = async (email: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, is_admin')
    .eq('id', email)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    isAdmin: data.is_admin
  };
};