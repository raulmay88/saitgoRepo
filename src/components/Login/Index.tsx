import React, { useState, FormEvent } from "react";
import { login } from "../../services/user/authService";
import { useNavigate } from 'react-router-dom';
import CompanySelect from './SelectCompany';
import BranchSelect from './SelectBranch';
import { Company, Branch } from "../../types/UserTypes";
import { toast } from 'react-toastify';
import { useLoading } from "../../context/LoadingContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import saitgoIcon from '../../../public/saitgoNegativo.png'; 

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginState, setLoginState] = useState({
    isLoggedIn: false,
    selectedCompany: null as Company | null,
    selectedBranch: null as Branch | null,
  });

  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        setLoginState(prevState => ({ ...prevState, isLoggedIn: true }));
        toast.success('Inicio de sesión exitoso. Seleccione una empresa y una sucursal.');
      } else {
        toast.error('Credenciales inválidas');
      }
    } catch (error) {
      toast.error('Error al iniciar sesión: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!loginState.isLoggedIn) {
      toast.error("Por favor, inicie sesión primero.");
      return;
    }

    if (!loginState.selectedCompany) {
      toast.error("Por favor, seleccione una empresa.");
      return;
    }

    if (!loginState.selectedBranch) {
      toast.error("Por favor, seleccione una sucursal.");
      return;
    }

    navigate('/content/index');
  };

  return (
    <div className="bg-cyan-950 rounded-xl shadow-2xl">
      <div className="max-w-2xl relative flex flex-col p-10 xl:px-20 rounded-md">
        <img src={saitgoIcon} alt="SaitGo Icon" className="mx-auto w-44 h-44 object-contain" />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col text-white space-y-4 ">
            <label htmlFor="email" className="cursor-text text-xl font-normal">
              Email
            </label>
            <input 
              type="text" 
              id="email" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded border border-gray-200 text-md font-normal text-black h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
            />
            <label htmlFor="password" className="cursor-text text-xl font-normal">
              Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="rounded border border-gray-200 text-xl font-normal text-black h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0 w-full pr-10"
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>

          {loginState.isLoggedIn && (
            <>
              <label htmlFor="company" className="cursor-text text-xl font-normal text-white">
                Seleccione una empresa y una sucursal
              </label>
              <CompanySelect 
                selectedCompany={loginState.selectedCompany} 
                setSelectedCompany={(company) => setLoginState(prevState => ({
                  ...prevState,
                  selectedCompany: company,
                  selectedBranch: null,
                }))}
              />
              
              {loginState.selectedCompany && (
                <BranchSelect 
                  selectedBranch={loginState.selectedBranch} 
                  branches={loginState.selectedCompany.branches}
                  setSelectedBranch={(branch) => setLoginState(prevState => ({
                    ...prevState,
                    selectedBranch: branch,
                  }))}
                />
              )}
            </>
          )}

          <button 
            type="button" 
            className="bg-cyan-700 hover:bg-cyan-800 w-max m-auto px-8 py-2 rounded-xl text-white text-xl font-normal mt-4"
            onClick={!loginState.isLoggedIn ? handleSubmit : handleContinue}
          >
            {!loginState.isLoggedIn ? "Iniciar sesión" : "Continuar"}
          </button>

          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
