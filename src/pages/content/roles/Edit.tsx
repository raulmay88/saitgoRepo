import React from 'react';
import FormCreate from '../../../components/FormCreate';
import Tittle from '../../../components/Tittle';
import { useRoleFormHandlers } from '../../../handlers/rolHandlers';
import { useParams } from 'react-router-dom';

const EditRoles: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const { handleSubmit, initialData } = useRoleFormHandlers(roleId);

  return (
    <div className='flex flex-1 flex-col space-y-10 items-center justify-center'>
      <Tittle texto="Editar rol" />
      {initialData ? (
        <FormCreate initialData={initialData} onSubmit={handleSubmit} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default EditRoles;