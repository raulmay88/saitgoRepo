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
      <div className="container rounded mx-auto p-4 bg-cyan-950 text-white">
        <table className='min-w-full'>
          <h1 className="text-2xl font-bold mb-4">Detalles del Rol</h1>
          <tbody>
            <tr>
              <td className="px-6 py-4 border-b border-gray-200">ID</td>
              <td className="px-6 py-4 border-b border-gray-200">{role.id}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 border-b border-gray-200">Nombre</td>
              <td className="px-6 py-4 border-b border-gray-200">{role.name}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 border-b border-gray-200">Fecha creación</td>
              <td className="px-6 py-4 border-b border-gray-200">{new Date(role.createdDate).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default DetailRoles;
