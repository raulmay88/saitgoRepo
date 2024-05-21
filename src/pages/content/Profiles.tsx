import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Index from "../../components/Personal/Profiles/Index";
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
    <div className="flex flex-col ml-40 items-center">
      <div className="w-full">
        <div className="flex flex-row px-4 justify-between">
                <Tittle texto="Menú de perfiles"/>
            <div className="py-12">
                <ButtonAdd onClick={() => setIsModalOpen(true)}>Agregar</ButtonAdd>
            </div>
                <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAction}
                title="Confirmación"
                message="¿Estás seguro de crear un nuevo perfil?"
                />
        </div>
        <div className="w-96 sm:ml-0 sm:w-full">
          <Index/>
        </div>
      </div>
    </div>
  );
}
