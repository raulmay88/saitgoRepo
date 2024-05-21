import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Index from "../../components/TableInfo";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmationModal from "../../components/Modal";
import Tittle from "../../components/Tittle";

export default function InfoCompanies() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleConfirmAction = () => {
    setIsModalOpen(false);
    navigate("/content/roles/create");
  };

  return (
    <div className="flex flex-col ml-40 items-center">
      <div className="w-full">
        <div className="flex flex-row px-4 py-8 justify-between">
                <Tittle texto="Vista de empresas o sucursales"/>
            
                <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAction}
                title="Confirmación"
                message="¿Estás seguro?"
                />
        </div>
        <div className="w-96 sm:ml-0 sm:w-full">
          <Index/>
        </div>
        <div className="flex flex-row px-4 justify-between">
                <ButtonAdd onClick={() => setIsModalOpen(true)}>Editar</ButtonAdd>
                <ButtonAdd onClick={() => setIsModalOpen(true)}>Eliminar</ButtonAdd>
            </div>
      </div>
    </div>
  );
}
