import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    // First check if admin user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', 'admin')
      .single();

    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    // Create the auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin@temp.com',
      password: 'xK9#mP2$vL5',
      options: {
        data: {
          username: 'admin'
        }
      }
    });

    if (signUpError) throw signUpError;

    if (!authData.user) {
      throw new Error('Failed to create admin user');
    }

    // Update the profile to set admin privileges
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', authData.user.id);

    if (updateError) throw updateError;

    console.log('Admin user created successfully');
    return authData;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};