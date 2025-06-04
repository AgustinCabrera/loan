export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  loanAmount: number;
  birthDate: string;
  phoneNumber: string;
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
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
}
