import React, { useState } from 'react';

interface FilterModalProps {
  columns: { header: string; accessor: string }[];
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: FilterCriteria[]) => void;
}

interface FilterCriteria {
  column: string;
  operator: string;
  value: string | number;
}

const FilterModal: React.FC<FilterModalProps> = ({ columns, isOpen, onClose, onApplyFilter }) => {
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria[]>([
    { column: columns[0].accessor, operator: '=', value: '' }
  ]);

  const handleColumnChange = (index: number, newColumn: string) => {
    const newCriteria = [...filterCriteria];
    newCriteria[index].column = newColumn;
    setFilterCriteria(newCriteria);
  };

  const handleOperatorChange = (index: number, newOperator: string) => {
    const newCriteria = [...filterCriteria];
    newCriteria[index].operator = newOperator;
    setFilterCriteria(newCriteria);
  };

  const handleValueChange = (index: number, newValue: string | number) => {
    const newCriteria = [...filterCriteria];
    newCriteria[index].value = newValue;
    setFilterCriteria(newCriteria);
  };

  const handleApplyFilter = () => {
    onApplyFilter(filterCriteria);
    onClose();
  };

  const handleRemoveFilter = (index: number) => {
    const newCriteria = filterCriteria.filter((_, i) => i !== index);
    setFilterCriteria(newCriteria);
  };

  const handleAddFilter = () => {
    setFilterCriteria([...filterCriteria, { column: columns[0].accessor, operator: '=', value: '' }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed ml-8 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-auto">
        <h2 className="text-lg font-bold mb-4 p-2">Filtrar columnas</h2>
        {filterCriteria.map((criteria, index) => (
          <div key={index} className="mb-4 p-2">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">

              {/* Select columnas */}
              <select
                value={criteria.column}
                onChange={(e) => handleColumnChange(index, e.target.value)}
                className="py-2 border rounded"
              >
                {columns.map((column) => (
                  <option key={column.accessor} value={column.accessor}>
                    {column.header}
                  </option>
                ))}
              </select>
              {/* Select signos */}
              <select
                value={criteria.operator}
                onChange={(e) => handleOperatorChange(index, e.target.value)}
                className="py-2 border rounded"
              >
                <option value="=">=</option>
                <option value=">"> {'>'} </option>
                <option value="<">
                  {'<'}
                </option>
                <option value="texto">Contiene</option>
              </select>

              {/* Agregar valores */}
              <input
                type="text"
                value={criteria.value}
                onChange={(e) => handleValueChange(index, e.target.value)}
                className="py-1.5 border rounded flex-grow"
              />
              <button
                onClick={() => handleRemoveFilter(index)}
                className="ml-2 text-red-500"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
          <div className='flex p-2 space-x-4'>
            <button onClick={handleAddFilter} className="p-2 bg-gray-300 rounded">Añadir filtro</button>
            <button className="p-2 bg-gray-300 rounded" onClick={onClose}>Cancelar</button>
            <button className="p-2 bg-cyan-800 text-white rounded" onClick={handleApplyFilter}>Aplicar</button>
          </div>
      </div>
    </div>
  );
};

export default FilterModal;
