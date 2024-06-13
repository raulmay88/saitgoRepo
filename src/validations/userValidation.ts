import axios from 'axios';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const validateUser = (data: { name: string; email: string; password: string; }): ValidationResult => {
  let errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push("El nombre es requerido.");
  } else if (data.name.length < 3) {
    errors.push("El nombre debe tener al menos 3 caracteres.");
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push("El correo electrónico es requerido.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("El formato del correo electrónico es inválido.");
  }

  if (!data.password || data.password.trim().length === 0) {
    errors.push("La contraseña es requerida.");
  } else if (data.password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const handleError = (error: unknown): string => {
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
  return errorMessage;
};


export const handleGenericError = (error: unknown): string[] => {
  let errorMessages: string[] = ['Error desconocido'];

  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      errorMessages = ['La solicitud tardó demasiado tiempo, por favor intenta nuevamente.'];
    } else if (error.response) {
      if (error.response.data && error.response.data.errorMessages) {
        errorMessages = error.response.data.errorMessages;
      } else {
        errorMessages = [error.response.data.message || error.response.statusText];
      }
    } else {
      errorMessages = [error.message];
    }
  } else if (error instanceof Error) {
    errorMessages = [error.message];
  }
  return errorMessages;
};