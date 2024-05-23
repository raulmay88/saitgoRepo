import { useState, useEffect } from 'react';
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
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState<SidebarOption>('dashboard');
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    if (path) {
      setSelectedOption(path as SidebarOption);
    }
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
      <div className={`flex flex-col h-screen fixed shadow-xl bg-cyan-950 transition-width duration-300 ${sidebarVisible ? 'w-44' : 'w-16'}`}>
        <div className="flex justify-center text-center mx-auto h-16">
          <img src="/saigo.png" alt="logo" className='h-11' />
        </div>
        <hr className="mt-8" />
        <nav className="mt-4 flex-1 bg-top bg-cover space-y-1">
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
            <div className="p-2 transition duration-300 ease-in-out">
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
