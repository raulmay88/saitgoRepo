import axios from 'axios';
import clienteAxios from '../httpClient';
import { Role } from '../../types/RolTypes';
import { validateRole } from '../../validations/validationForm';

// Obtener roles
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

// Obtener rol por ID
export async function getRoleById(roleId: string): Promise<Role> {
  try {
    const response = await clienteAxios.get(`/roles/${roleId}`);
    if (response.status === 200) {
      return response.data.result;
    } else {
      console.error('Error al obtener rol:', response.statusText);
      throw new Error(response.statusText);
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
    console.error('Error al obtener rol:', errorMessage);
    throw new Error(errorMessage);
  }
}

// Registrar rol
export async function registerRole(roleData: { name: string }): Promise<{ success: boolean; message?: string }> {
  try {
    const { valid, errors } = validateRole(roleData);
    if (!valid) {
      return { success: false, message: errors.join(' ') };
    }

    const response = await clienteAxios.post('/roles', roleData);

    if (response.status === 200 && response.data.result === 'El Role ya existe.') {
      return { success: false, message: 'El rol ya existe. Por favor, elige un nombre diferente.' };
    }

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

// Obtener roles para select
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

// Actualizar rol
export async function updateRole(roleId: string, roleData: { name: string }): Promise<{ success: boolean; message?: string }> {
  try {
    const { valid, errors } = validateRole(roleData);
    if (!valid) {
      return { success: false, message: errors.join(' ') };
    }

    const response = await clienteAxios.put(`/roles/${roleId}`, roleData);

    if (response.status === 200) {
      return { success: true, message: '¡Rol actualizado exitosamente!' };
    } else if (response.status === 204) {
      return { success: true, message: '¡Rol actualizado exitosamente!' };
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

// Eliminar rol
export async function deleteRole(roleId: string): Promise<{ success: boolean; message?: string, errorMessages?: string[] }> {
  try {
    const response = await clienteAxios.delete(`/roles/${roleId}`);
    if (response.status === 200 || response.status === 204) {
      return { success: true, message: '¡Rol eliminado exitosamente!' };
    } else {
      return { success: false, message: response.statusText, errorMessages: response.data.errorMessages };
    }
  } catch (error: unknown) {
    let errorMessage = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.message || error.response.statusText;
        return { success: false, message: errorMessage, errorMessages: error.response.data.errorMessages };
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
