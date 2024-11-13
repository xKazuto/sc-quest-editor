export interface User {
  id: string;
  isAdmin: boolean;
}

export interface AuthContextType {
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