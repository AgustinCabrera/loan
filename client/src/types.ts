export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  adress: string;
  loanAmount: number;
  birthDate: string;
  phoneNumber: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => void;
}
