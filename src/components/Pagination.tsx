import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  rowsPerPage,
  onPageChange,
  handleNextPage,
  handlePreviousPage,
}) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between items-center mt-4">
      <span className="bg-cyan-900 rounded-xl text-white font-semibold py-2 px-4 m-2">
        {`Mostrando ${Math.min((currentPage - 1) * rowsPerPage + 1, totalRecords)} - ${Math.min(currentPage * rowsPerPage, totalRecords)} de ${totalRecords}`}
      </span>
      <div className="flex items-center text-white font-semibold bg-cyan-900 rounded-xl m-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="py-2 px-4 disabled:opacity-50 hover:opacity-100"
          aria-label="Página anterior"
        >
          Anterior
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 ${currentPage === page ? 'bg-cyan-700 text-white' : 'text-white hover:bg-cyan-700'}`}
            aria-label={`Ir a la página ${page}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="py-2 px-4 disabled:opacity-50 hover:opacity-100"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
