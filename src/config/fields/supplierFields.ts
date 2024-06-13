import { z } from 'zod';
import { FieldConfig, SupplierFormValues } from '../../types/FormTypes';

export const supplierFields: { [key in keyof SupplierFormValues]: FieldConfig } = {
  name: {
    label: 'Supplier Name',
    type: 'text',
    validation: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.')
  },
  contactEmail: {
    label: 'Contact Email',
    type: 'email',
    validation: z.string().email('Debe ser un correo electrónico válido.')
  }
  // Otros campos para proveedores...
};
