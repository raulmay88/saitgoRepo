import React from 'react';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';

interface SidebarToggleProps {
  sidebarVisible: boolean;
  toggleSidebar: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ sidebarVisible, toggleSidebar }) => (
  <div className={`fixed z-10 text-center transition-transform duration-300 ${sidebarVisible ? 'top-24 left-[10.5rem]' : 'top-24 left-[3.5rem]'}`}>
    <button onClick={toggleSidebar} className="rounded-full center">
      <ChevronDoubleLeftIcon className={`h-6 w-6 p-0.5 bg-white text-cyan-950 rounded-full transform transition-transform duration-500 ${sidebarVisible ? '' : 'rotate-180'}`} />
    </button>
  </div>
);

export default SidebarToggle;
