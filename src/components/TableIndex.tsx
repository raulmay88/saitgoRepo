import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PencilSquareIcon, TrashIcon, EyeIcon, ArrowDownIcon, FunnelIcon } from '@heroicons/react/24/solid';
import SwitchStatus from './SwitchStatus';
import { TableProps } from '../types/TableTypes';
import usePagination from '../hooks/usePagination';
import Pagination from './Pagination';
import Search from './Search';
import ButtonAdd from './ButtonAdd';
import FilterModal from './FilterModal';

const Table: React.FC<TableProps> = ({ title, columns, data, onEdit, onDelete, onView, onAdd }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(columns.map(col => col.accessor));

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (sortConfig !== null) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
  }, [sortConfig]);

  const rowsPerPage = 10;
  const { currentPage, totalPages, currentRows, handlePageChange, handleNextPage, handlePreviousPage } = usePagination(filteredData, rowsPerPage);

  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = data.filter(row => 
      columns.some(column => 
        String(row[column.accessor]).toLowerCase().includes(lowercasedTerm)
      )
    );
    setFilteredData(filtered);
  };

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleApplyFilter = (selectedColumns: string[]) => {
    setSelectedColumns(selectedColumns);
  };

  return (
    <div className="overflow-x-auto shadow-xl rounded m-4">
      <div className="text-xl font-bold bg-cyan-800 text-white p-4 rounded-t flex justify-between items-center">
        {title}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between m-2">
        <div className="flex items-center space-x-2">
          <Search onSearch={handleSearch} />
          <button
            onClick={handleFilterClick}
            className="bg-white h-10 w-8 flex items-center justify-center border border-gray-300 text-gray-700 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FunnelIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <ButtonAdd onClick={onAdd}>Agregar</ButtonAdd>
      </div>
      <div className="block w-full">
        <table className=" w-full text-center text-gray-500 table-auto">
          <thead className="font-bold bg-cyan-800 text-xs uppercase text-white tracking-wider">
            <tr>
              {columns.filter(col => selectedColumns.includes(col.accessor)).map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort(column.accessor)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.header}</span>
                    <ArrowDownIcon className={`h-4 w-4 transition-transform duration-300 ${sortConfig && sortConfig.key === column.accessor ? (sortConfig.direction === 'ascending' ? 'rotate-0' : 'rotate-180') : ''}`} />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.filter(col => selectedColumns.includes(col.accessor)).map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {column.isSwitch ? (
                      <SwitchStatus initialValue={row[column.accessor]} />
                    ) : column.isDate ? (
                      format(new Date(row[column.accessor]), "dd/MM/yyyy HH:mm:ss")
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
                <td>
                  <button
                    className="text-cyan-900 hover:text-cyan-700 font-bold py-2 px-4 rounded m-1"
                    aria-label="View"
                    onClick={() => onView(row)}
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => onEdit(row)} className="text-cyan-900 hover:text-cyan-700 font-bold py-2 px-4 rounded m-1" aria-label="Edit">
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => onDelete(row)} className="text-cyan-900 hover:text-cyan-700 font-bold py-2 px-4 rounded m-1" aria-label="Delete">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={filteredData.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
      <FilterModal
        columns={columns}
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
};

export default Table;
