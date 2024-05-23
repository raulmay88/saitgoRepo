import { useEffect, useState, useCallback } from 'react';
import Table from "../../../components/TableIndex";
import { getRoles } from "../../../services/rol/RolService";
import ConfirmationModal from "../../../components/Modal";
import { useRoleHandlers } from '../../../handlers/rolHandlers';

const Index: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);

  const fetchRoles = useCallback(async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error al obtener roles: ', error);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const {
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleView,
    showModal,
    roleToDelete,
  } = useRoleHandlers(fetchRoles);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Fecha de alta', accessor: 'createdDate', isDate: true },
  ];

  return (
    <div className="container mx-auto">
      <Table columns={columns} data={roles} onEdit={handleEdit} onDelete={handleDeleteClick} onView={handleView} />
      <ConfirmationModal
        isOpen={showModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirmación de eliminación"
        message={`¿Estás seguro de que deseas eliminar el rol "${roleToDelete?.name}"?`}
      />
    </div>
  );
};

export default Index;
