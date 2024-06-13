import { z } from 'zod';
import { FieldConfig, RoleFormValues } from '../../types/FormTypes';

export const roleFields: { [key in keyof RoleFormValues]: FieldConfig } = {
  name: {
    label: 'Name',
    type: 'text',
    validation: z.string()
      .min(3, 'El nombre debe tener al menos 3 caracteres.')
      .max(50, 'El nombre no debe exceder los 50 caracteres.')
      .regex(/^[a-zA-Z0-9 ]*$/, 'El nombre no debe contener caracteres especiales.')
      .refine((val) => val.trim() === val, 'El nombre no debe tener espacios al principio o al final.')
  },
  description: {
    label: 'Description',
    type: 'text',
    validation: z.string()
      .min(1, 'La descripción es obligatoria.')
  }
};
