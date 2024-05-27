import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getRoleById } from '../../../services/rol/RolService';
import { Role } from '../../../types/RolTypes';
import { toast } from 'react-toastify';
import { useLoading } from '../../../context/LoadingContext';

const DetailRoles: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const [role, setRole] = useState<Role | null>(null);
  const { setLoading } = useLoading();

  const fetchRole = useCallback(async () => {
    setLoading(true);
    try {
      const roleData = await getRoleById(roleId!);
      setRole(roleData);
    } catch (error) {
      toast.error('Error al obtener rol: ' + (error instanceof Error ? error.message : 'Error desconocido'));
      console.error('Error al obtener rol: ', error);
    } finally {
      setLoading(false);
    }
  }, [roleId, setLoading]);

  useEffect(() => {
    fetchRole();
  }, []);

  return (
    role && (
      <div className='flex flex-1 flex-col space-y-10 items-center justify-center'>
        <div className='bg-white shadow-md rounded p-4'>
          <h1 className="text-2xl font-bold mb-4">Detalles del Rol</h1>
          <p><strong>ID:</strong> {role.id}</p>
          <p><strong>Nombre:</strong> {role.name}</p>
          <p><strong>Fecha de Creación:</strong> {new Date(role.createdDate).toLocaleString()}</p>
        </div>
      </div>
    )
  );
};

export default DetailRoles;
