export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  address: string;
  loanAmount: number;
  birthDate: string;
  phone: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  birthDate: string;
  loanAmount: number;
  phone: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
}
