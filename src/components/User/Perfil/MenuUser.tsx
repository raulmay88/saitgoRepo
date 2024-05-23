import { useState, useEffect } from "react";
import { UserCircleIcon, BellIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import InfoUser from "./InfoUser";
import ConfirmationModal from "../../Modal";
import { logout } from "../../../services/user/authService";
import { useNavigate } from 'react-router-dom';

const MenuUser: React.FC = () => {
    const navigate = useNavigate();
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userCompany, setUserCompany] = useState<string | null>(null);
    const [userBranch, setUserBranch] = useState<string | null>(null);

    useEffect(() => {
        setUserEmail(localStorage.getItem('username'));
        setUserCompany(localStorage.getItem('selectedCompany'));
        setUserBranch(localStorage.getItem('selectedBranch'));
    }, []);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        logout();
        navigate('/');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
            <div className="relative">
                <div className="flex space-x-8 text-white">
                    <ExclamationCircleIcon className="cursor-pointer h-8 w-8" />
                    <BellIcon className="cursor-pointer h-8 w-8" />
                    <UserCircleIcon 
                        className="cursor-pointer h-8 w-8"
                        onClick={() => setShowUserInfo(!showUserInfo)} 
                    />
                </div>
                <div className={`fixed z-10 right-0 mx-6 my-3 p-5 font-medium text-white bg-cyan-950 shadow-xl rounded border transition-all duration-300 ease-in-out ${showUserInfo ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <InfoUser 
                        userEmail={userEmail}
                        userCompany={userCompany}
                        userBranch={userBranch}
                        handleLogout={handleLogout}
                    />
                </div>
            </div>
            <ConfirmationModal
                isOpen={showLogoutModal}
                onClose={cancelLogout}
                onConfirm={confirmLogout}
                title="Cerrar Sesión"
                message="¿Estás seguro que deseas cerrar sesión?"
            />
        </>
    );
}

export default MenuUser;
