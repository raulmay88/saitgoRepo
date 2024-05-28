import { useState, useCallback, useMemo } from 'react';
import { Column } from '../types/TableTypes';

const useSearch = (data: any[], columns: Column[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(row => 
      columns.some(column => 
        String(row[column.accessor]).toLowerCase().includes(searchTerm)
      )
    );
  }, [data, columns, searchTerm]);

  return { filteredData, handleSearch };
};

export default useSearch;
