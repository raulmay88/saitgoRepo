import React from 'react';
import Index from "../../../components/User/Index";
import ConfirmationModal from "../../../components/Modal";
import useModalNavigation from "../../../hooks/useModalNavigation";

const Users: React.FC = () => {
  const { isModalOpen, openModal, closeModal, confirmAction } = useModalNavigation("/content/users/create");

  return (
    <div className="flex flex-col items-center">
      <Index onAdd={openModal} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        title="Confirmación"
        message="¿Estás seguro de crear un nuevo usuario?"
      />
    </div>
  );
};

export default Users;
