import { useState } from "react";
import { ArrowRightStartOnRectangleIcon, UserCircleIcon, BellIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ConfirmationModal from "../Modal";
import { logout } from "../../services/user/authService";
import { useNavigate } from 'react-router-dom';

export default function SidebarUser() {
    const navigate = useNavigate();
    const [showUserInfo, setShowUserInfo] = useState(false); 
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const userEmail = localStorage.getItem('username');
    const userCompany = localStorage.getItem('selectedCompany');
    const userBranch = localStorage.getItem('selectedBranch');


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
            <div className="text-left">
                <div className="flex space-x-8 text-white">
                    <ExclamationCircleIcon
                        className="cursor-pointer h-8 w-8"
                    />
                    <BellIcon
                        className="cursor-pointer h-8 w-8"
                    />
                    <UserCircleIcon 
                        className="cursor-pointer h-8 w-8"
                        onClick={() => setShowUserInfo(!showUserInfo)} 
                    />
                </div>
                {showUserInfo && (
                    <div className="fixed z-10 right-0 mx-6 p-5 font-medium text-white bg-cyan-950 shadow-xl rounded-2xl border">
                        <div className="flex items-center ">

                        <UserCircleIcon 
                            className="cursor-pointer h-8 w-8 text-white"
                            />
                        {userCompany && (
                            <p className="text-sm py-3 px-2">Empresa: {userCompany}</p>
                        )}
                        </div>
                        {userBranch && (
                            <p className="text-sm py-3 px-2">{userBranch}</p>
                        )}
                        {userEmail && (
                            <p className="text-sm py-3 px-2">{userEmail}</p>
                        )}
                        <div className="">
                            <button onClick={handleLogout} className="font-medium w-full text-sm py-2 px-1 items-center rounded-lg flex  hover:bg-gray-400 cursor-pointer">
                                <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-4 text-white" />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                )}
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
