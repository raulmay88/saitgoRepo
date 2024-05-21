import React, { useState } from 'react';
import companies, { Company, Branch } from '../../data/companyData';
import {EyeIcon} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const navigate = useNavigate();

    const handleCompanyClick = (company: Company) => {
      setSelectedCompany(company === selectedCompany ? null : company);
      setSelectedBranch(null);
    };
  
    const handleViewCompany = (company: Company) => {
        console.log(company, 'ver');
        setSelectedCompany(company);
        navigate(`/content/companies/detail/${company.id}`);
    };

  const handleViewBranch = (branch: Branch) => {
    console.log("View branch:", branch);
  };

  return (
    <div className='overflow-x-auto shadow-xl rounded-2xl m-4 max-w-xl'>
      <table className="w-full text-center text-gray-500">
        <thead className="font-bold bg-orange-100 text-xs uppercase text-gray-500 tracking-wider">
          <tr>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Correo</th>
            <th className="px-6 py-3">Teléfono</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.id} onClick={() => handleCompanyClick(company)} className="cursor-pointer hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{company.correo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{company.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleViewCompany(company)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"><EyeIcon className='h-4 w-4'/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCompany && (
        <div className="flex flex-wrap justify-center m-1 p-2 border-t border-gray-100">
          {selectedCompany.branches.map((branch) => (
            <div key={branch.id} className="m-2">
              <div className="bg-white shadow-md rounded p-2">
                <p className="font-bold">{branch.name}</p>
                <p>{branch.address}</p>
                <div>
                  <button onClick={() => handleViewBranch(branch)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"><EyeIcon className='h-4 w-4'/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
