import React from 'react';
import { format } from 'date-fns';
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/solid';
import SwitchStatus from './SwitchStatus';
import { TableProps } from '../types/TableTypes';
import usePagination from '../hooks/usePagination';
import Pagination from './Pagination';

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  const rowsPerPage = 10;
  const { currentPage, totalPages, currentRows, handlePageChange, handleNextPage, handlePreviousPage } = usePagination(data, rowsPerPage);

  return (
    <div className="overflow-x-auto shadow-xl rounded-2xl m-4">
      <table className="w-full text-center text-gray-500">
        <thead className="font-bold bg-cyan-800 text-xs uppercase text-white tracking-wider">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3">
                {column.header}
              </th>
            ))}
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
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
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
                  aria-label="View"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button onClick={() => onEdit(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1" aria-label="Edit">
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(row)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1" aria-label="Delete">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default Table;
