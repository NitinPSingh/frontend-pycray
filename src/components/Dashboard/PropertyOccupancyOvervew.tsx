import React, { useState } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, InputBase, IconButton, Checkbox } from '@mui/material';
import TableView from './TableView';
import { usePropertyContext } from '../../context/PropertyContext';
import TableTitle from './TableTitle';
import FormModal from '../Form';
  

  const propertyKeys = [
    'Owner Name',
    'Property Name',
    'Total Units',
    'Filled Units',
    'Vacant Units',
    'Occupancy Rate',
    'Last Maintenance Date'
  ];
  
  const propertyKeysMaper = [
    "ownerName",
    "propertyName",
    "totalUnits",
    "filledUnits",
    "vacantUnits",
    "occupancyRate",
    "lastMaintenanceDate"
  ];
  
  

export default function PropertyOccupancyOvervew() {
  const {properties, togglePropertySelection, deleteProperty} = usePropertyContext()
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalType = 'property'
  return (
    <React.Fragment>
        <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <TableTitle
              title="Property Occupancy Overview"
              subtitle="Detailed occupancy breakdown"
              stag="Statistics"
              handleDelete={deleteProperty}
              handleAdd={()=>setModalOpen(true)}
            />
            <TableView  data={properties} header={propertyKeys} keys={propertyKeysMaper} handleCheck={togglePropertySelection}/>
          </Paper>
          <FormModal open={modalOpen} handleClose={()=>setModalOpen(false)} type={modalType} />
    </React.Fragment>
  )
}
