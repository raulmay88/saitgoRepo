import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import SidebarButton from './SidebarButton';
import SidebarToggle from './SidebarToggle';
import {
  HomeIcon,
  UserPlusIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  BriefcaseIcon
} from '@heroicons/react/24/solid';

type SidebarOption = 'dashboard' | 'personal' | 'company' | 'users' | 'roles' | 'actions' | 'perfilUsuario';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SidebarOption>('dashboard');
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    if (path) {
      setSelectedOption(path as SidebarOption);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDashboardMenu = () => {
    setDashboardMenuOpen(!dashboardMenuOpen);
  };

  const handleOptionClick = (option: SidebarOption) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className={`flex flex-col h-screen shadow-xl fixed bg-cyan-950 transition-all duration-300 ease-in-out ${sidebarVisible ? 'w-44 ' : 'w-16'}`} ref={sidebarRef}>
        <div className="flex justify-center items-center mt-6">
          <img
            src="/saitgoIconoBlanco.svg"
            alt="logo"
            className={`h-12 transition-all duration-300 ease-in-out ${sidebarVisible ? '' : 'ml-14'}`}
          />
          <span className={`text-white text-lg font-bold transition-all duration-300 ease-in-out ${sidebarVisible ? 'opacity-100' : 'opacity-0'}`}>
            Saitgo
          </span>
        </div>
        <hr className="mt-2 border-gray-700" />
        <nav className="mt-4 flex-1 mx-auto bg-top bg-cover space-y-1">
          <SidebarLink
            to="/content/index"
            icon={<HomeIcon className="h-6 w-6 text-white" />}
            label="Dashboard"
            isVisible={sidebarVisible}
            selected={selectedOption === 'dashboard'}
            onClick={() => handleOptionClick('dashboard')}
          />
          <SidebarButton
            icon={<ClipboardDocumentCheckIcon className="h-6 w-6 text-white" />}
            label="Personal"
            isVisible={sidebarVisible}
            selected={selectedOption === 'personal'}
            isOpen={dashboardMenuOpen}
            onClick={toggleDashboardMenu}
          />
          {dashboardMenuOpen && (
            <div className={`p-2 transition-all duration-300 space-y-2 ease-in-out ${sidebarVisible ? 'w-44' : 'w-16'}`}>
              <SidebarLink
                to="/content/users"
                icon={<UserPlusIcon className="h-6 w-6 text-white" />}
                label="Usuarios"
                isVisible={sidebarVisible}
                selected={selectedOption === 'users'}
                onClick={() => handleOptionClick('users')}
              />
              <SidebarLink
                to="/content/roles"
                icon={<BriefcaseIcon className="h-6 w-6 text-white" />}
                label="Roles"
                isVisible={sidebarVisible}
                selected={selectedOption === 'roles'}
                onClick={() => handleOptionClick('roles')}
              />
              <SidebarLink
                to="/content/actions"
                icon={<ClipboardDocumentListIcon className="h-6 w-6 text-white" />}
                label="Acciones"
                isVisible={sidebarVisible}
                selected={selectedOption === 'actions'}
                onClick={() => handleOptionClick('actions')}
              />
            </div>
          )}
          <SidebarLink
            to="/content/companies"
            icon={<BuildingOfficeIcon className="h-6 w-6 text-white" />}
            label="Empresas"
            isVisible={sidebarVisible}
            selected={selectedOption === 'company'}
            onClick={() => handleOptionClick('company')}
          />
        </nav>
      </div>
      <SidebarToggle sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Sidebar;
