import React from 'react';
import FormCreate from '../../../components/FormCreate';
import Tittle from '../../../components/Tittle';
import { useRoleFormHandlers } from '../../../handlers/rolHandlers';

const CreateRoles: React.FC = () => {
  const { handleSubmit } = useRoleFormHandlers();

  return (
    <div className='flex flex-1 flex-col space-y-10 items-center justify-center'>
      <Tittle texto="Registrar nuevo rol" />
      <FormCreate onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateRoles;
