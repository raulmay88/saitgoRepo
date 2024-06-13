import React from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from "@heroicons/react/24/solid";
import { saveSelectedBranch } from '../../services/user/authService'

interface BranchSelectProps {
  selectedBranch: { id: number; name: string } | null;
  branches: { id: number; name: string }[];
  setSelectedBranch: (branch: { id: number; name: string } | null) => void;
}

const SelectBranch: React.FC<BranchSelectProps> = ({ selectedBranch, branches, setSelectedBranch }) => {
  const handleBranchSelectChange = (selectedOption: { id: number; name: string }) => {
    setSelectedBranch(selectedOption);
    saveSelectedBranch(selectedOption);
  };

  return (
    <div className="">
      <Listbox value={selectedBranch} onChange={handleBranchSelectChange}>
        <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-md">
          {selectedBranch ? selectedBranch.name : 'Seleccione una sucursal'}
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-2/3 bg-white shadow-lg max-h-60 rounded-md py-1 text-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-md">
          {branches.map(branch => (
            <Listbox.Option
              key={branch.id}
              value={branch}
              className={({ active }) =>
                `rounded-lg ${active ? 'bg-cyan-800 text-white' : 'text-gray-900'}
                  cursor-default select-none relative py-2 pl-3 pr-9`
              }
            >
              {({ selected, active }) => (
                <>
                  <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                    {branch.name}
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

export default SelectBranch;
