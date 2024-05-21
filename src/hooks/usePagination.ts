import { useState, useMemo, useCallback } from 'react';

const usePagination = (data: any[], rowsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = useMemo(() => data.slice(indexOfFirstRow, indexOfLastRow), [data, indexOfFirstRow, indexOfLastRow]);

  const totalPages = useMemo(() => Math.ceil(data.length / rowsPerPage), [data.length, rowsPerPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    totalPages,
    currentRows,
    handleNextPage,
    handlePreviousPage,
    handlePageChange
  };
};

export default usePagination;
