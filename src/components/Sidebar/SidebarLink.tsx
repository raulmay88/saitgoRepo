import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isVisible: boolean;
  selected: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isVisible, selected, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`font-medium text-sm items-center rounded-lg text-white px-4 py-2 flex transition-all duration-200 group cursor-pointer ${selected ? 'bg-gray-400' : 'hover:bg-gray-400'}`}
    aria-current={selected ? 'page' : undefined}
  >
    <div className="flex items-center">
      {icon}
      {isVisible && <span className="ml-3">{label}</span>}
    </div>
  </Link>
);

export default SidebarLink;
