import { useEffect, useState, useCallback } from 'react';
import Table from '../TableIndex';
import { getUsers } from '../../services/user/authService';
import { useUserHandlers } from '../../handlers/userHandlers';
import { useLoading } from '../../context/LoadingContext';
import { User } from '../../types/UserTypes';

interface IndexProps {
  onAdd: () => void;
}

const Index: React.FC<IndexProps> = ({ onAdd }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { setLoading } = useLoading();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const { handleView, handleStatusChange } = useUserHandlers(fetchUsers);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Correo', accessor: 'email' },
    { header: 'Status', accessor: 'status', isSwitch: true },
    { header: 'Id Rol', accessor: 'roleId' },
    { header: 'Rol', accessor: 'roleName' },
    { header: 'Fecha de alta', accessor: 'createdDate', isDate: true },
  ];

  return (
    <div className="w-full pl-10">
      <Table 
        title='Usuarios'
        columns={columns} 
        data={users} 
        onEdit={() => {}} 
        onDelete={() => {}} 
        onView={handleView} 
        onAdd={onAdd} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  );
};

export default Index;
