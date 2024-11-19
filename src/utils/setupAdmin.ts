import { supabase } from "@/integrations/supabase/client";

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

    // Create the admin user
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@temp.com',
      password: 'xK9#mP2$vL5',
      options: {
        data: {
          username: 'admin'
        }
      }
    });

    if (error) throw error;

    // Set the user as admin in the profiles table
    if (data.user) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', data.user.id);

      if (updateError) throw updateError;
    }

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Run the setup
createAdminUser();