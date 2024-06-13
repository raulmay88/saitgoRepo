// types/TableTypes.ts
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
  title: string; 
  columns: Column[];
  data: RowData[];
  onEdit: (rowData: RowData) => void;
  onDelete: (rowData: RowData) => void;
  onView: (rowData: RowData) => void;
  onAdd: () => void;
  onStatusChange: (userId: number, status: boolean) => void;
}
