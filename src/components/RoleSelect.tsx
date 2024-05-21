import React, { useState, useEffect } from "react";
import { fetchRolesForSelect } from "../services/rol/RolService";
import { Role } from "../types/RolTypes";
import { toast } from "react-toastify";

interface RoleSelectProps {
  selectedRoleId: number;
  onRoleChange: (roleId: number) => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({ selectedRoleId, onRoleChange }) => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await fetchRolesForSelect();
        setRoles(rolesData);
      } catch (error) {
        toast.error('Error al obtener roles', {
          autoClose: 3000,
        });
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRoleChange(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor="roleId" className="cursor-text text-xl font-normal text-white">
        Rol
      </label>
      <select
        id="roleId"
        name="roleId"
        value={selectedRoleId}
        onChange={handleChange}
        className="rounded border border-gray-200 text-lg font-normal text-black h-11 p-2 focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
      >
        <option value={0} disabled>Seleccione un rol</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelect;
