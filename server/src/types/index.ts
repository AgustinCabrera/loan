import { Request } from "express";

export interface UserDTO {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  loanAmount: number;
  birthDate: string;
  phone: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}
