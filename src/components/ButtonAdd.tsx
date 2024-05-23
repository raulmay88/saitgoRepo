import { PlusIcon } from "@heroicons/react/24/solid";
import { PropsWithChildren } from "react";

interface ButtonAddProps {
  onClick?: () => void;
}

const ButtonAdd: React.FC<PropsWithChildren<ButtonAddProps>> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center py-2 px-5 text-sm sm:text-xl rounded-xl text-white bg-cyan-800 hover:bg-cyan-900 relative transition-colors duration-300"
    >
      <PlusIcon className="h-5 w-5 mr-1 text-white transition-transform duration-300" />
      <span>{children}</span>
    </button>
  );
};

export default ButtonAdd;
