import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Index from "../../components/User/Index";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmationModal from "../../components/Modal";
import Tittle from "../../components/Tittle";

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleConfirmAction = () => {
    setIsModalOpen(false);
    navigate("/content/users/register");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline space-x-10 m-5">
        <Tittle texto="Menú de usuarios"/>
        <ButtonAdd onClick={() => setIsModalOpen(true)}>Agregar</ButtonAdd>
      </div>
      <div>
        <Index/>
      </div>
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        title="Confirmación"
        message="¿Estás seguro de crear un nuevo usuario?"
        />
    </div>
  );
}
