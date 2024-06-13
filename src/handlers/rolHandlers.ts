import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Role } from '../types/RolTypes';
import { deleteRole, getRoleById, registerRole, updateRole } from '../services/rol/RolService'; 

export const useRoleHandlers = (fetchRoles: () => void) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any>(null);

  const handleEdit = (rowData: any) => {
    navigate(`/content/roles/edit/${rowData.id}`);
  };

  const handleView = (rowData: any) => {
    navigate(`/content/roles/detail/${rowData.id}`);
  };

  const handleDeleteClick = (rowData: any) => {
    setRoleToDelete(rowData);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (roleToDelete) {
      try {
        const response = await deleteRole(roleToDelete.id);
        if (response.success) {
          toast.success(response.message || '¡Rol eliminado exitosamente!');
          fetchRoles(); // Actualiza la lista de roles después de eliminar
        } else {
          if (response.message) {
            toast.error("Este rol está siendo utilizado, no es posible eliminar");
          } else if (response.errorMessages && response.errorMessages.length > 0) {
            response.errorMessages.forEach((msg: string) => toast.error(msg));
          } else {
            toast.error('Error al eliminar rol.');
          }
        }
      } catch (error) {
        toast.error('Error al eliminar rol: ' + (error instanceof Error ? error.message : 'Error desconocido'));
        console.error('Error al eliminar rol: ', error);
      } finally {
        setShowModal(false);
        setRoleToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setRoleToDelete(null);
  };

  return {
    handleEdit,
    handleView, 
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    showModal,
    roleToDelete,
  };
};


//Manejo de creación y edición de roles
export const useRoleFormHandlers = (roleId?: string) => {
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState<Role | null>(null);
  
    useEffect(() => {
      if (roleId) {
        const fetchRole = async () => {
          try {
            const roleData = await getRoleById(roleId);
            setInitialData(roleData);
          } catch (error) {
            toast.error('Error al obtener rol: ' + (error instanceof Error ? error.message : 'Error desconocido'));
            console.error('Error al obtener rol: ', error);
          }
        };
  
        fetchRole();
      }
    }, [roleId]);
  
    const handleSubmit = async (data: Role) => {
      try {
        let result;
        if (roleId) {
          result = await updateRole(roleId, data);
        } else {
          result = await registerRole(data);
        }
  
        if (result.success) {
          toast.success(result.message || '¡Operación exitosa!');
          navigate('/content/roles');
        } else {
          toast.error(result.message || 'Error en la operación.');
        }
      } catch (error) {
        toast.error('Error en la operación: ' + (error instanceof Error ? error.message : 'Error desconocido'));
        console.error('Error en la operación: ', error);
      }
    };
  
    return {
      handleSubmit,
      initialData,
    };
  };

