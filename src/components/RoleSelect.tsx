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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await fetchRolesForSelect();
        setRoles(rolesData);
        setFilteredRoles(rolesData);
      } catch (error) {
        toast.error('Error al obtener roles', {
          autoClose: 3000,
        });
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRoles(roles);
    } else {
      setFilteredRoles(
        roles.filter(role =>
          role.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, roles]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleRoleSelect = (role: Role) => {
    onRoleChange(role.id);
    setSearchTerm(role.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex flex-col space-y-4">
      <label htmlFor="roleSearch" className="cursor-text text-xl font-normal text-white">
        Rol
      </label>
      <div className="relative">
        <input
          type="text"
          id="roleSearch"
          placeholder="Buscar rol..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded border border-gray-200 text-lg font-normal text-black h-11 p-2 w-full focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
        />
        {showDropdown && (
          <ul className="absolute z-10 text-black bg-white border w-full border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1" role="listbox">
            {filteredRoles.length > 0 ? (
              filteredRoles.map(role => (
                <li
                  key={role.id}
                  onMouseDown={(e) => e.preventDefault()} 
                  onClick={() => handleRoleSelect(role)}
                  className="cursor-pointer hover:bg-gray-200 p-2"
                  role="option"
                  aria-selected={role.id === selectedRoleId}
                >
                  {role.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No se encontraron roles</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RoleSelect;
