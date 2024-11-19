import { createAdminUser } from '../utils/setupAdmin';

// Execute the admin user creation
createAdminUser().then(() => {
  console.log('Admin setup completed');
}).catch(console.error);