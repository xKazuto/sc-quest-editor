import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const UserManagement = () => {
  const { createUser, changePassword, users, isAdmin, currentUser } = useAuth();
  const [newUserId, setNewUserId] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserId && newUserPassword) {
      createUser(newUserId, newUserPassword);
      setNewUserId('');
      setNewUserPassword('');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && newPassword) {
      changePassword(selectedUser, newPassword);
      setSelectedUser('');
      setNewPassword('');
    }
  };

  return (
    <div className="space-y-4">
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Create User</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            {isAdmin ? (
              <div>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.id}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input type="hidden" value={currentUser || ''} />
            )}
            <div>
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Change Password</Button>
          </form>
        </CardContent>
      </Card>

      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {users.map(user => (
                  <div key={user.id} className="p-2 border rounded flex justify-between items-center">
                    <span>{user.id}</span>
                    <span className="text-sm text-muted-foreground">
                      {user.is_admin ? 'Admin' : 'User'}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;