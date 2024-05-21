import Table from "../../TableIndex";
import { useNavigate } from 'react-router-dom';
import { getRoles } from "../../../services/rol/RolService";
import { useEffect, useState } from 'react';
    

const Index: React.FC = () => {

  const navigate = useNavigate();
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleEdit = (rowData: any) => {
    navigate('/content/index');
    console.log(rowData)
  };

  const handleDelete = (rowData: any) => {
    navigate('/content/index');
    console.log(rowData)
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Fecha de alta', accessor: 'createdDate', isDate: true },
  ]; 
  
return (
    <div className="container mx-auto">
    <Table columns={columns} data={roles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
);
};

export default Index;