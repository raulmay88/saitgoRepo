export interface Column {
  header: string;
  accessor: string;
  isSwitch?: boolean; 
  isDate?: boolean;
}

export interface RowData {
  [key: string]: any;
}

export interface TableProps {
  columns: Column[];
  data: RowData[];
  onEdit: (rowData: RowData) => void;
  onDelete: (rowData: RowData) => void;
}
