import Table from "../../TableIndex";
import { useNavigate } from 'react-router-dom';

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nombre', accessor: 'name' },
        { header: 'Descripción', accessor: 'description' },
      ];

    const data = [
        { id: 1, name: "Ver", description: "Permite ver información"},
        { id: 2, name: "Crear", description: "Permite crear registros"},
        { id: 3, name: "Editar", description: "Permite editar registros"},
        { id: 4, name: "Eliminar", description: "Permite eliminar registros"},
        { id: 5, name: "Imprimir", description: "Permite imprimir archivos"},
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