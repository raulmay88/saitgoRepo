import { z } from 'zod';

export interface FieldConfig {
  label: string;
  type: string;
  validation: z.ZodTypeAny;
}

export interface RoleFormValues {
  name: string;
  description: string;
}

export interface GenericFormProps<T> {
  fields: { [key in keyof T]: FieldConfig };
  onSubmit: (data: T) => void;
  initialData?: T;
}
