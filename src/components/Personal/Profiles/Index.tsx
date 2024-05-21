import Table from "../../TableIndex";
import { useNavigate } from 'react-router-dom';

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nombre', accessor: 'name' },
        { header: 'Creado por', accessor: 'user_create' },
        { header: 'Fecha creación', accessor: 'action_create' },
        { header: 'Fecha modificación', accessor: 'action_update' },
      ];

    const data = [
        { id: 1, name: "Ver", user_create: "Martín Palermo", action_create: "Martes 10 de octubre 2023 a las 09:12", action_update: "Martes 10 de octubre 2023 a las 10:35"},
        { id: 2, name: "Crear", user_create: "Andrea Pirlo", action_create: "Miércoles 11 de octubre 2023 a las 15:43", action_update: "Miércoles 11 de octubre 2023 a las 15:43"},
        { id: 3, name: "Editar", user_create: "Andrea Pirlo", action_create: "Jueves 12 de octubre 2023 a las 11:33", action_update: "Jueves 12 de octubre 2023 a las 11:33"},
        { id: 4, name: "Eliminar", user_create: "Genaro Gatusso", action_create: "Viernes 13 de octubre 2023 a las 13:20", action_update: "Viernes 13 de octubre 2023 a las 13:20"},
        { id: 5, name: "Imprimir", user_create: "Genaro Gatusso", action_create: "Sábado 14 de octubre 2023 a las 14:08", action_update: "Sábado 14 de octubre 2023 a las 14:08"},
      ];      

const Index: React.FC = () => {

  const navigate = useNavigate();

  const handleEdit = (rowData: any) => {
    navigate('/content/index');
    console.log(rowData)
  };

  const handleDelete = (rowData: any) => {
    navigate('/content/index');
    console.log(rowData)
  };
  
return (
    <div className="container mx-auto">
    <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
);
};

export default Index;