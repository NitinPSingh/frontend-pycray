import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
interface FinancialData {
    'id':number;
    'Owner Name': string;
    'Property Name': string;
    'Income': number;
    'Expenses': number;
    'Net Profit': number;
    'selected': boolean;
  }
  
  interface PropertyData {
    'Owner Name': string;
    'Property Name': string;
    'Total Units': number;
    'Filled Units': number;
    'Vacant Units': number;
    'Occupancy Rate': number; 
    'Last Maintenance Date': string;
    'selected': boolean;
  }
  
  type Data = FinancialData | PropertyData;
  

interface TableViewProps {
  data: Data[];
  keys: string[];
  header: string[];
  handleCheck: (index: number) => void;
}

const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDate = (dateStr: string): string => {
  return dateStr.split('T')[0];
};

const TableView: React.FC<TableViewProps> = ({ data, keys, header, handleCheck }) => {
  return (
    <TableContainer sx={{ userSelect: 'none', cursor: 'default' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            {header.map((key, index) => <TableCell sx={{color:'text.primary',fontWeight:700}} key={index}>{key}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Checkbox checked={row['selected']} onChange={() => handleCheck(row.id)} />
              </TableCell>
              {keys.map((key, i) => (
                <TableCell key={i} sx={{ color:'#667085'}}>
                  {key === 'occupancyRate'
                    ? `${row[key].toFixed(2)}%`
                    : ['Income', 'Expenses', 'Net Profit'].includes(key)
                    ? formatCurrency(row[key])
                    : key === 'lastMaintenanceDate'
                    ? formatDate(row[key])
                    : row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView
