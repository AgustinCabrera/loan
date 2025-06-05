import { Request } from "express";

// user dto
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
// authenticated request
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}
