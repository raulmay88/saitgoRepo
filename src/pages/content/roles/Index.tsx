import Index from "../../../components/Personal/Roles/Index";
import ButtonAdd from "../../../components/ButtonAdd";
import ConfirmationModal from "../../../components/Modal";
import Tittle from "../../../components/Tittle";
import useModalNavigation from "../../../hooks/useModalNavigation";

const IndexRoles: React.FC = () => {
  const { isModalOpen, openModal, closeModal, confirmAction } = useModalNavigation("/content/roles/create");

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline space-x-10 m-5">
        <Tittle texto="Menú de roles" />
        <ButtonAdd onClick={openModal}>Agregar</ButtonAdd>
      </div>
      <div>
        <Index />
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        title="Confirmación"
        message="¿Estás seguro de crear un nuevo rol?"
      />
    </div>
  );
};

export default IndexRoles;
