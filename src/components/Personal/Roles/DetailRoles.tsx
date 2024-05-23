import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoleById } from '../../../services/rol/RolService';
import { Role } from '../../../types/RolTypes';
import Tittle from '../../Tittle';
import { toast } from 'react-toastify';

const DetailRoles: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const roleData = await getRoleById(roleId!);
        setRole(roleData);
      } catch (error) {
        toast.error('Error al obtener rol: ' + (error instanceof Error ? error.message : 'Error desconocido'));
        console.error('Error al obtener rol: ', error);
      }
    };

    fetchRole();
  }, [roleId]);

  if (!role) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className='flex flex-1 flex-col space-y-10 items-center justify-center'>
      <div className='bg-white shadow-md rounded p-4'>
        <p><strong>ID:</strong> {role.id}</p>
        <p><strong>Nombre:</strong> {role.name}</p>
        <p><strong>Fecha de Creación:</strong> {new Date(role.createdDate).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DetailRoles;
