import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  isVisible: boolean;
  selected: boolean;
  isOpen: boolean;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, isVisible, selected, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className={`font-medium w-full text-sm items-center rounded-lg text-white px-4 py-2 flex transition duration-300 ease-in-out group cursor-pointer relative ${selected ? 'bg-gray-400' : 'hover:bg-gray-400'}`}
    aria-expanded={isOpen}
    aria-current={selected ? 'page' : undefined}
  >
    <div className="flex items-center">
      {icon}
      {isVisible && <span className="ml-3">{label}</span>}
    </div>
    {isVisible && (
      <ChevronRightIcon className={`h-6 w-6 ml-auto transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
    )}
  </button>
);

export default SidebarButton;
