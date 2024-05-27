import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, RegisterFormData, RegisterResponse } from '../types/UserTypes';
import { register } from '../services/user/authService';
import { validateUser } from '../validations/userValidation';

export const useUserHandlers = (fetchUsers: () => void) => {
  const navigate = useNavigate();

  const handleView = (rowData: any) => {
    const user = rowData as User;
    navigate(`/content/users/detail/${user.id}`);
  };

  const handleCreate = async (formData: RegisterFormData) => {
    const validation = validateUser(formData);

    if (!validation.valid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

    try {
      const response: RegisterResponse = await register(formData);
      if (response.success) {
        toast.success('Usuario creado con éxito');
        fetchUsers();
      } else {
        toast.error(response.message || 'Error al crear el usuario');
      }
    } catch (error) {
      toast.error('Error al crear el usuario');
      console.error('Error al crear el usuario:', error);
    }
  };

  return {
    handleView,
    handleCreate,
  };
};
