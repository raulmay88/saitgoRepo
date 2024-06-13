import { z } from 'zod';
import { CompanyFormValues, FieldConfig } from '../../types/FormTypes';

export const companyFields: { [key in keyof CompanyFormValues]: FieldConfig } = {
  name: {
    label: 'Company Name',
    type: 'text',
    validation: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.')
  },
  address: {
    label: 'Address',
    type: 'text',
    validation: z.string().min(5, 'La dirección debe tener al menos 5 caracteres.')
  }
  // Otros campos para empresa...
};
