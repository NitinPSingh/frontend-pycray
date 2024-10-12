import React, { useState } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, InputBase, IconButton, Checkbox } from '@mui/material';
import TableView from './TableView';
import { usePropertyContext } from '../../context/PropertyContext';
import TableTitle from './TableTitle';
import FormModal from '../Form';

const financialKeys = [
    'Owner Name',
    'Property Name',
    'Income',
    'Expenses',
    'Net Profit'
  ];

  const financialKeyMapper = [
    'ownerName',
    'propertyName',
    "income",
    "expenses",
    "netProfit",
  ];
  

  
export default function FinancialOverview() {
  const {financials, toggleFinancialSelection, deleteFinancial} = usePropertyContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalType = "financial"

  return (
    <React.Fragment>
        <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <TableTitle
            title="Financial Overview"
            subtitle="Financial status for each property, summarizing income, expenses, and net profit."
            stag="Statistics"
            handleDelete={deleteFinancial}
            handleAdd={()=>setModalOpen(true)}
          />
            <TableView  data={financials} header={financialKeys} keys={financialKeyMapper} handleCheck={toggleFinancialSelection}/>
          </Paper>
          <FormModal open={modalOpen} handleClose={()=>setModalOpen(false)} type={modalType} />
    </React.Fragment>
  )
}
