import { useState } from 'react';
import { PlusIcon } from "@heroicons/react/24/solid";
import { PropsWithChildren } from "react";

interface ButtonAddProps {
  onClick?: () => void; 
}

export default function ButtonAdd({ children, onClick }: PropsWithChildren<ButtonAddProps>) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="flex flex-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={onClick}
        className="flex min-w-44 justify-center items-center py-2 px-5 text-sm sm:text-xl rounded-xl text-white bg-cyan-800 hover:bg-cyan-900 relative" 
      >
        <PlusIcon 
          className='h-5 w-5 mr-1 text-white transition-transform duration-300'
        />
        <span>
          {children}
        </span>
      </button>
    </div>
  );
}
