import clienteAxios from "../httpClient";
import { LoginResponse, User, RegisterFormData, RegisterResponse, TokenResponse } from "../../types/UserTypes";
import { validateUser, handleError, handleGenericError } from '../../validations/userValidation';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const REGISTER_API_ENDPOINT = '/users';
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
      const errorMessage = response.data.errorMessages?.join(', ') || 'Error desconocido al iniciar sesión';
      console.error('Error al iniciar sesión:', errorMessage);
      return false;
    }
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error al iniciar sesión:', errorMessage);
    return false;
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await clienteAxios.get<{ result: User[] }>('/users');
    if (response.status === 200) {
      console.log(response.data.result)
      return response.data.result;
    } else {
      console.error('Error al obtener usuarios:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', handleError(error));
    return [];
  }
}

export async function getUserById(userId: string): Promise<User> {
  try {
    const response = await clienteAxios.get(`/users/${userId}`);
    if (response.status === 200) {
      return response.data.result;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error(handleError(error));
  }
}

export async function checkDuplicateUser(email: string, name: string): Promise<boolean> {
  try {
    const response = await clienteAxios.get<{ result: User[] }>(`/users/check-duplicate`, {
      params: { email, name },
    });
    return response.data.result.length > 0;
  } catch (error) {
    console.error('Error al verificar duplicados:', handleError(error));
    return false;
  }
}

export async function register(formData: RegisterFormData): Promise<RegisterResponse> {
  const validation = validateUser(formData);
  
  if (!validation.valid) {
    return { success: false, message: validation.errors.join(', ') };
  }

  const isDuplicate = await checkDuplicateUser(formData.email, formData.name);
  if (isDuplicate) {
    return { success: false, message: 'Nombre de usuario o correo electrónico ya existen.' };
  }

  try {
    const response = await clienteAxios.post(REGISTER_API_ENDPOINT, formData);
    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error al registrar usuario:', errorMessage);
    return { success: false, message: errorMessage };
  }
}


export async function confirmEmail(token: string, email: string): Promise<TokenResponse> {
  try {
    const response = await clienteAxios.get<TokenResponse>(`/users/confirm-email`, {
      params: { token, email },
    });
    return response.data;
  } catch (error) {
    const errorMessages = handleGenericError(error);
    return {
      isSuccess: false,
      result: '',
      errorMessages: errorMessages
    };
  }
}


export async function updateUserStatus(userId: number, status: boolean): Promise<void> {
  try {
    const response = await clienteAxios.patch(`/users/${userId}/status`, { status });
    if (response.status !== 200) {
      console.error('Error al actualizar el estado del usuario:', response.statusText);
    }
  } catch (error) {
    console.error('Error al actualizar el estado del usuario:', handleError(error));
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
