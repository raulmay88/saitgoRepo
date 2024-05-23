import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useModalNavigation = (initialPath: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmAction = () => {
    setIsModalOpen(false);
    navigate(initialPath);
  };

  return { isModalOpen, openModal, closeModal, confirmAction };
};

export default useModalNavigation;
