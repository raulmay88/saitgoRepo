import axios from 'axios';
import clienteAxios from "../httpClient";
import { RegisterFormData, RegisterResponse } from "../../types/UserTypes";

const REGISTER_API_ENDPOINT = '/users';

export async function register(formData: RegisterFormData): Promise<RegisterResponse> {
  try {
    const response = await clienteAxios.post(REGISTER_API_ENDPOINT, formData);
    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false, message: response.statusText };
    }
  } catch (error: unknown) {
    let errorMessage = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'La solicitud tardó demasiado tiempo, por favor intenta nuevamente.';
      } else if (error.response) {
        if (error.response.status === 400) {
          errorMessage = 'Error al registrar: nombre de usuario o correo electrónico duplicado.';
        } else {
          errorMessage = error.response.data.message || error.response.statusText;
        }
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error al registrar usuario:', errorMessage);
    return { success: false, message: errorMessage };
  }
}
