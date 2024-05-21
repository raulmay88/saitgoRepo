import axios from 'axios';
import clienteAxios from "../httpClient";
import { Role } from "../../types/RolTypes";

export async function getRoles(): Promise<Role[]> {
  try {
    const response = await clienteAxios.get('/roles');
    if (response.status === 200) {
      return response.data.result;
    } else {
      console.error('Error al obtener roles:', response.statusText);
      return [];
    }
  } catch (error: unknown) {
    let errorMessage = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.message || error.response.statusText;
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error al obtener roles:', errorMessage);
    return [];
  }
}

export async function registerRole(roleData: { name: string }): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await clienteAxios.post('/roles', roleData);
    if (response.status === 201) {
      return { success: true, message: '¡Rol registrado exitosamente!' };
    } else {
      return { success: false, message: response.statusText };
    }
  } catch (error: unknown) {
    let errorMessage = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.message || error.response.statusText;
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}

export async function fetchRolesForSelect(): Promise<Role[]> {
  try {
    const response = await clienteAxios.get('/roles');
    if (response.status === 200) {
      return response.data.result;
    } else {
      console.error('Error al obtener roles:', response.statusText);
      return [];
    }
  } catch (error: unknown) {
    let errorMessage = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'La solicitud tardó demasiado tiempo, por favor intenta nuevamente.';
      } else if (error.response) {
        errorMessage = error.response.data.message || error.response.statusText;
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error al obtener roles:', errorMessage);
    throw new Error(errorMessage);
  }
}