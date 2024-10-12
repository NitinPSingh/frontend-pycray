import React, { useState, useEffect } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

interface FinancialFormProps {
  handleClose: () => void;
}

export const FinancialForm: React.FC<FinancialFormProps> = ({ handleClose }) => {
  const { properties, addFinancial } = usePropertyContext();
  const [form, setForm] = useState({
    propertyId: '',
    income: 0,
    expenses: 0,
    netProfit: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  useEffect(() => {
    const netProfit = form.income - form.expenses;
    setForm(prev => ({ ...prev, netProfit: netProfit >= 0 ? netProfit : 0 }));
  }, [form.income, form.expenses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.expenses > form.income) {
      alert('Expenses cannot be more than income.');
      return;
    }
    if (form.netProfit < 0 || form.expenses < 0) {
      alert('Expenses and Net Profit cannot be negative.');
      return;
    }
    try {
      await addFinancial(form);
      setForm({
        propertyId: '',
        income: 0,
        expenses: 0,
        netProfit: 0,
      });
      handleClose();
    } catch (error) {
      console.error('Error adding financial record:', error);
      handleClose();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Add Financial Record
      </Typography>
      <TextField
        select
        fullWidth
        margin="normal"
        label="Property"
        name="propertyId"
        value={form.propertyId}
        onChange={handleChange}
        required
      >
        {properties.map((property) => (
          <MenuItem key={property.id} value={property.id}>
            {property.propertyName}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        label="Income"
        name="income"
        type="number"
        inputProps={{ step: "0.01" }}
        value={form.income}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Expenses"
        name="expenses"
        type="number"
        inputProps={{ step: "0.01" }}
        value={form.expenses}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Net Profit"
        name="netProfit"
        type="number"
        inputProps={{ step: "0.01" }}
        value={form.netProfit}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Add Financial Record
      </Button>
    </Box>
  );
};
