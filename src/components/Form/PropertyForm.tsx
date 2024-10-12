import React, { useState, useEffect } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { TextField, Button, Box, Typography } from '@mui/material';

interface PropertyFormProps {
    handleClose: () => void;
  }
  
export const PropertyForm: React.FC<PropertyFormProps> = ({ handleClose }) => {
  const { addProperty } = usePropertyContext();
  const [form, setForm] = useState({
    ownerName: '',
    propertyName: '',
    totalUnits: 0,
    filledUnits: 0,
    vacantUnits: 0,
    occupancyRate: 0,
    lastMaintenanceDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const vacantUnits = form.totalUnits - form.filledUnits;
    const occupancyRate = form.totalUnits > 0 ? (form.filledUnits / form.totalUnits) * 100 : 0;
    setForm(prev => ({ ...prev, vacantUnits, occupancyRate }));
  }, [form.totalUnits, form.filledUnits]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProperty(form);
      setForm({
        ownerName: '',
        propertyName: '',
        totalUnits: 0,
        filledUnits: 0,
        vacantUnits: 0,
        occupancyRate: 0,
        lastMaintenanceDate: '',
      });
      handleClose()
      //alert('Property added successfully!');
    } catch (error) {
      console.error('Error adding property:', error);
      handleClose()
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Owner Name"
        name="ownerName"
        value={form.ownerName}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Property Name"
        name="propertyName"
        value={form.propertyName}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Total Units"
        name="totalUnits"
        type="number"
        value={form.totalUnits}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Filled Units"
        name="filledUnits"
        type="number"
        value={form.filledUnits}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Vacant Units"
        name="vacantUnits"
        type="number"
        value={form.vacantUnits}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Occupancy Rate"
        name="occupancyRate"
        type="number"
        inputProps={{ step: "0.01" }}
        value={form.occupancyRate}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Maintenance Date"
        name="lastMaintenanceDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={form.lastMaintenanceDate}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Add Property
      </Button>
    </Box>
  );
};
