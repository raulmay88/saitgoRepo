export interface LoginResponse {
  isSuccess: boolean;
  result: string;
  errorMessages?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  roleId: number;
  roleName: string;
  createdDate: string;
}

export interface Company {
  id: number;
  name: string;
  branches: Branch[];
}

export interface Branch {
  id: number;
  name: string;
}

export interface RegisterFormData {
  name: string;
  password: string;
  email: string;
  roleId: number;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}

export interface TokenResponse {
  isSuccess: boolean;
  result: string;
  errorMessages?: string[];
}
