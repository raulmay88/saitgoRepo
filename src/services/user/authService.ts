// authService.ts
import clienteAxios from "../httpClient";
import { LoginResponse, User } from "../../types/UserTypes";

// Constantes para claves de localStorage
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const SELECTED_COMPANY_KEY = 'selectedCompany';
const SELECTED_BRANCH_KEY = 'selectedBranch';

export async function login(username: string, password: string): Promise<boolean> {
  try {
    const response = await clienteAxios.post<LoginResponse>('/auth/login', {
      userName: username,
      password: password,
    });

    if (response.status === 200 && response.data.isSuccess) {
      const token = response.data.result;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USERNAME_KEY, username);
      return true;
    } else {
      console.error('Error al iniciar sesión:', response.data.errorMessages);
      return false;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error instanceof Error ? error.message : 'Error desconocido');
    return false;
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await clienteAxios.get<{ result: User[] }>('/users');
    if (response.status === 200) {
      return response.data.result;
    } else {
      console.error('Error al obtener usuarios:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error instanceof Error ? error.message : 'Error desconocido');
    return [];
  }
}

export function saveSelectedCompany(company: { id: number; name: string }): void {
  localStorage.setItem(SELECTED_COMPANY_KEY, company.name);
}

export function saveSelectedBranch(branch: { id: number; name: string }): void {
  localStorage.setItem(SELECTED_BRANCH_KEY, branch.name);
}

export function getSelectedCompany(): string | null {
  return localStorage.getItem(SELECTED_COMPANY_KEY);
}

export function getSelectedBranch(): string | null {
  return localStorage.getItem(SELECTED_BRANCH_KEY);
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(SELECTED_COMPANY_KEY);
  localStorage.removeItem(SELECTED_BRANCH_KEY);
}
