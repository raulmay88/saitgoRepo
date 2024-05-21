import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  UserPlusIcon, 
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  BriefcaseIcon
} from '@heroicons/react/24/solid';

type SidebarOption = 'dashboard' | 'personal' | 'company' | 'users' | 'roles' | 'actions' | 'perfilUsuario';

const Sidebar: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState<SidebarOption>('dashboard');
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);

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
      <div className={`flex flex-col h-screen fixed shadow-xl bg-cyan-950 ${sidebarVisible ? 'w-44' : 'w-16'}`}>
        <div className="flex justify-center text-center mx-auto m-5">
            <h1 className="text-xl font-bold text-cyan-600">
              Sait<span className="text-white opacity-90">Go</span>
            </h1>
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
      <div className={`fixed z-10 text-center ${sidebarVisible ? 'top-24 left-[10.5rem]' : 'top-24 left-[3.5rem]'}`}>
        <button onClick={toggleSidebar} className="rounded-full center">
          <ChevronDoubleLeftIcon className={`h-6 w-6 p-0.5 bg-white text-cyan-950 rounded-full transition-transform duration-500 ${sidebarVisible ? 'rotate-0' : 'rotate-180'}`} />
        </button>
      </div>
    </>
  );
};

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; label: string; isVisible: boolean; selected: boolean; onClick: () => void; }> = ({ to, icon, label, isVisible, selected, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`font-medium text-sm items-center rounded-lg text-white px-4 py-2 flex transition-all duration-200 group cursor-pointer ${selected ? 'bg-gray-400' : 'hover:bg-gray-400'}`}
    aria-current={selected ? "page" : undefined}
  >
    <div className="flex items-center">
      {icon}
      {isVisible && <span className="ml-3">{label}</span>}
    </div>
  </Link>
);

const SidebarButton: React.FC<{ icon: React.ReactNode; label: string; isVisible: boolean; selected: boolean; isOpen: boolean; onClick: () => void; }> = ({ icon, label, isVisible, selected, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className={`font-medium w-full text-sm items-center rounded-lg text-white px-4 py-2 flex transition duration-300 ease-in-out group cursor-pointer relative ${selected ? 'bg-gray-400' : 'hover:bg-gray-400'}`}
    aria-expanded={isOpen}
    aria-current={selected ? "page" : undefined}
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

export default Sidebar;
