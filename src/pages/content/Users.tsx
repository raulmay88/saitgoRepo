import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Index from "../../components/User/Index";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmationModal from "../../components/Modal";
import Tittle from "../../components/Tittle";

const Users: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmAction = () => {
    setModalOpen(false);
    navigate("/content/users/register");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline space-x-10 m-5">
        <Tittle texto="Usuarios"/>
        <ButtonAdd onClick={handleOpenModal}>Agregar</ButtonAdd>
      </div>
      <div>
        <Index />
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        title="Confirmación"
        message="¿Estás seguro de crear un nuevo usuario?"
      />
    </div>
  );
};

export default Users;
