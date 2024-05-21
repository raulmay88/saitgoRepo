import React, { useState } from "react";
import { RegisterFormData } from "../../types/UserTypes";
import { register } from "../../services/user/registerService"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import RoleSelect from "../RoleSelect";
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    password: '',
    email: '',
    roleId: 0,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (roleId: number): void => {
    setFormData({
      ...formData,
      roleId,
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const result = await register(formData);
      if (result.success) {
        toast.success('¡Usuario registrado exitosamente!', {
          autoClose: 3000,
          onClose: () => navigate('/content/users'),
        });
      } else {
        toast.error(result.message || 'Hubo un error en el registro', {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Hubo un error en el registro', {
        autoClose: 3000,
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-cyan-950 rounded-xl shadow-2xl p-8 max-w-md mx-auto">
      <div className="text-4xl font-bold mb-4 text-white text-center">
        Registrar usuario
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col text-white space-y-4">
          <label htmlFor="name" className="cursor-text text-xl font-normal">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            className="rounded border border-gray-200 text-xl font-normal text-black h-11 p-2 focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
          <label htmlFor="email" className="cursor-text text-xl font-normal">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            className="rounded border border-gray-200 text-md font-normal text-black h-11 p-2 focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
          <label htmlFor="password" className="cursor-text text-xl font-normal">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              required
              onChange={handleChange}
              className="rounded border border-gray-200 text-xl font-normal text-black h-11 p-2 focus:ring-2 ring-offset-2 ring-gray-900 outline-0 w-full pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6 text-gray-500" />
              ) : (
                <EyeIcon className="h-6 w-6 text-gray-500" />
              )}
            </div>
          </div>
          <RoleSelect selectedRoleId={formData.roleId} onRoleChange={handleRoleChange} />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-cyan-700 hover:bg-cyan-800 w-full px-8 py-2 rounded-xl text-white text-xl font-normal"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
