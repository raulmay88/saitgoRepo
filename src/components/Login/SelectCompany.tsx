import React from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from "@heroicons/react/24/solid";
import companies from "../../data/companyData";
import { saveSelectedCompany } from '../../services/user/authService'

interface CompanySelectProps {
  selectedCompany: { 
    id: number; 
    name: string; 
    branches: { id: number; name: string; }[] } | null;
    setSelectedCompany: (company: { id: number; name: string; branches: { id: number; name: string; }[] } | null) => void;
}

const SelectCompany: React.FC<CompanySelectProps> = ({ selectedCompany, setSelectedCompany }) => {

  const handleCompanySelectChange = (selectedOption: { id: number; name: string }) => {
    const selectedCompanyWithBranches = companies.find(company => company.id === selectedOption.id);
    if (selectedCompanyWithBranches) {
      setSelectedCompany(selectedCompanyWithBranches);
      saveSelectedCompany(selectedCompanyWithBranches);
    }
  };

  return (
    <div className="mt-4">
      <Listbox value={selectedCompany} onChange={handleCompanySelectChange}>
        <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-md">
          {selectedCompany ? selectedCompany.name : 'Selecciona una empresa'}
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-2/3 bg-white shadow-lg max-h-60 rounded-md py-1 text-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-md">
          {companies.map(company => (
            <Listbox.Option
              key={company.id}
              value={company}
              className={({ active, disabled }) =>
                `rounded-lg ${active ? 'bg-cyan-800 text-white' : 'text-gray-900'}
                  cursor-default select-none relative py-2 pl-3 pr-9 ${disabled ? 'bg-gray-100' : ''}`
              }
            >
              {({ selected, active }) => (
                <>
                  <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                    {company.name}
                  </span>
                  {selected && (
                    <span className={`rounded-3xl ${active ? 'text-white' : 'text-cyan-600'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default SelectCompany;
