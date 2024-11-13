import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const CreateUserForm = ({ onSubmit }: { onSubmit: (id: string, password: string) => void }) => {
  const [newUserId, setNewUserId] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserId && newUserPassword) {
      onSubmit(newUserId, newUserPassword);
      setNewUserId('');
      setNewUserPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="User ID"
        value={newUserId}
        onChange={(e) => setNewUserId(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={newUserPassword}
        onChange={(e) => setNewUserPassword(e.target.value)}
        required
      />
      <Button type="submit">Create User</Button>
    </form>
  );
};

const ChangePasswordForm = ({ onSubmit, users, isAdmin, currentUser }: { 
  onSubmit: (userId: string, password: string) => void;
  users: Array<{ id: string }>;
  isAdmin: boolean;
  currentUser: string | null;
}) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((selectedUser || currentUser) && newPassword) {
      onSubmit(selectedUser || currentUser || '', newPassword);
      setSelectedUser('');
      setNewPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isAdmin ? (
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
      ) : (
        <input type="hidden" value={currentUser || ''} />
      )}
      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <Button type="submit">Change Password</Button>
    </form>
  );
};

const UserList = ({ users, onRemoveUser }: { 
  users: Array<{ id: string; isAdmin: boolean }>;
  onRemoveUser: (userId: string) => void;
}) => (
  <ScrollArea className="h-[200px]">
    <div className="space-y-2">
      {users.map(user => (
        <div key={user.id} className="p-2 border rounded flex justify-between items-center">
          <span>{user.id}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {user.isAdmin ? 'Admin' : 'User'}
            </span>
            {!user.isAdmin && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">Remove</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Remove User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>Are you sure you want to remove user "{user.id}"?</p>
                    <div className="flex justify-end gap-2">
                      <DialogTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive"
                          onClick={() => onRemoveUser(user.id)}
                        >
                          Remove
                        </Button>
                      </DialogTrigger>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      ))}
    </div>
  </ScrollArea>
);

const UserManagement = () => {
  const { createUser, changePassword, removeUser, users, isAdmin, currentUser } = useAuth();

  return (
    <div className="space-y-4">
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateUserForm onSubmit={createUser} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm 
            onSubmit={changePassword}
            users={users}
            isAdmin={isAdmin}
            currentUser={currentUser}
          />
        </CardContent>
      </Card>

      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <UserList users={users} onRemoveUser={removeUser} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;