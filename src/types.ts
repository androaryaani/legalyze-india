export type UserRole = 'user' | 'lawyer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}