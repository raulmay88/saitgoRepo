import React from "react";
import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

interface UserInfoProps {
    userEmail: string | null;
    userCompany: string | null;
    userBranch: string | null;
    handleLogout: () => void;
}

const InfoUser: React.FC<UserInfoProps> = ({ userEmail, userCompany, userBranch, handleLogout }) => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <UserCircleIcon className="cursor-pointer h-8 w-8 text-white" />
                {userCompany && (
                    <p className="text-sm py-3 px-2">Empresa: {userCompany}</p>
                )}
            </div>
            {userBranch && (
                <p className="text-sm py-3 px-2">Sucursal: {userBranch}</p>
            )}
            {userEmail && (
                <p className="text-sm py-3 px-2">Correo: {userEmail}</p>
            )}
            <div className="mt-4">
                <button 
                    onClick={handleLogout} 
                    className="font-medium w-full text-sm py-2 px-1 items-center rounded flex hover:bg-gray-400 cursor-pointer"
                >
                    <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-4 text-white" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
};

export default InfoUser;
