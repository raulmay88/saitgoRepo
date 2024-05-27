// src/components/FilterModal.tsx
import React, { useState } from 'react';

interface FilterModalProps {
  columns: { header: string; accessor: string }[];
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (selectedColumns: string[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ columns, isOpen, onClose, onApplyFilter }) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const handleColumnToggle = (column: string) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  const handleApplyFilter = () => {
    onApplyFilter(selectedColumns);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex bg-white p-4 rounded shadow-lg ">
        <div>

        <h2 className="text-lg font-bold mb-4">Columnas</h2>
        <div className="mb-4">
          {columns.map((column) => (
            <div key={column.accessor} className="flex items-center">
              <input
                type="checkbox"
                id={column.accessor}
                checked={selectedColumns.includes(column.accessor)}
                onChange={() => handleColumnToggle(column.accessor)}
                />
              <label htmlFor={column.accessor} className="ml-2">{column.header}</label>
            </div>
          ))}
        </div>
          </div>
        <div>

        <h2 className="text-lg font-bold mb-4">Signos</h2>
        <div className="mb-4">
          {columns.map((column) => (
            <div key={column.accessor} className="flex items-center">
              <input
                type="checkbox"
                id={column.accessor}
                checked={selectedColumns.includes(column.accessor)}
                onChange={() => handleColumnToggle(column.accessor)}
                />
              <label htmlFor={column.accessor} className="ml-2">{column.header}</label>
            </div>
          ))}
        </div>
          </div>
        <div>

        <h2 className="text-lg font-bold mb-4">Resultado</h2>
        <div className="mb-4">
          {columns.map((column) => (
            <div key={column.accessor} className="flex items-center">
              <input
                type="checkbox"
                id={column.accessor}
                checked={selectedColumns.includes(column.accessor)}
                onChange={() => handleColumnToggle(column.accessor)}
                />
              <label htmlFor={column.accessor} className="ml-2">{column.header}</label>
            </div>
          ))}
        </div>
          </div>
        <div className="flex items-end justify-end">
          <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-cyan-800 text-white rounded" onClick={handleApplyFilter}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
