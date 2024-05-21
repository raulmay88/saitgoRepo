import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../TableIndex';
import { getUsers } from '../../services/user/authService';
import { useLoading } from '../../context/LoadingContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
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

  const handleEdit = (rowData: any) => {
    navigate('/content/index');
    console.log('Edit:', rowData);
  };

  const handleDelete = (rowData: any) => {
    navigate('/content/index');
    console.log('Delete:', rowData);
  };

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
    <div className="container mx-auto">
      <Table columns={columns} data={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Index;
