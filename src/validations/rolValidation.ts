export interface ValidationResult {
    valid: boolean;
    errors: string[];
  }
  
  export const validateRole = (data: { name: string }): ValidationResult => {
    let errors: string[] = [];
  
    // Eliminar espacios en blanco al principio y al final
    const trimmedName = data.name.trim();
  
    if (!trimmedName) {
      errors.push('El nombre es obligatorio.');
    } else {
      if (trimmedName.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres.');
      }
      if (trimmedName.length > 50) {
        errors.push('El nombre no debe exceder los 50 caracteres.');
      }
      if (/[^a-zA-Z0-9 ]/g.test(trimmedName)) {
        errors.push('El nombre no debe contener caracteres especiales.');
      }
      if (trimmedName.length !== data.name.length) {
        errors.push('El nombre no debe tener espacios al principio o al final.');
      }
    }
  
    return {
      valid: errors.length === 0,
      errors,
    };
  };
  