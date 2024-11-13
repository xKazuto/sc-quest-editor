import { createAdminUser } from '@/services/authService';

const CreateAdminPage = () => {
  const handleCreateAdmin = async () => {
    try {
      await createAdminUser('admin@example.com', 'admin123');
      alert('Admin user created successfully! You can now login with these credentials.');
    } catch (error) {
      console.error('Failed to create admin user:', error);
      alert('Failed to create admin user. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Admin User</h1>
        <p className="mb-4">This will create an admin user with:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Email: admin@example.com</li>
          <li>Password: admin123</li>
        </ul>
        <button
          onClick={handleCreateAdmin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Admin User
        </button>
      </div>
    </div>
  );
};

export default CreateAdminPage;