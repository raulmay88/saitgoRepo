import Index from "../../../components/Personal/Roles/Index";
import ConfirmationModal from "../../../components/Modal";
import useModalNavigation from "../../../hooks/useModalNavigation";

const IndexRoles: React.FC = () => {
  const { isModalOpen, openModal, closeModal, confirmAction } = useModalNavigation("/content/roles/create");

  return (
    <div className="flex flex-col items-center">
      <Index onAdd={openModal} />
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
