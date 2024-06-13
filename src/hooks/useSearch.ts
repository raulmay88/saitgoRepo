import { useState, useCallback, useMemo } from 'react';
import { Column } from '../types/TableTypes';

interface FilterCriteria {
  column: string;
  operator: string;
  value: string | number;
}

const useSearch = (data: any[], columns: Column[], filters: FilterCriteria[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  const filteredData = useMemo(() => {
    let filtered = data;

    filters.forEach((filter) => {
      filtered = filtered.filter((row) => {
        const rowValue = row[filter.column];
        const filterValue = filter.value;

        switch (filter.operator) {
          case '=':
            return rowValue == filterValue;
          case '>':
            return rowValue > filterValue;
          case '<':
            return rowValue < filterValue;
          case 'texto':
            return String(rowValue).includes(String(filterValue));
          default:
            return true;
        }
      });
    });

    if (!searchTerm) return filtered;

    return filtered.filter(row => 
      columns.some(column => 
        String(row[column.accessor]).toLowerCase().includes(searchTerm)
      )
    );
  }, [data, columns, searchTerm, filters]);

  return { filteredData, handleSearch };
};

export default useSearch;
