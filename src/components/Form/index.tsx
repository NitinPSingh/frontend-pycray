import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { PropertyForm } from './PropertyForm';
import { FinancialForm } from './FinancialForm';

interface FormModalProps {
  open: boolean;
  handleClose: () => void;
  type: 'property' | 'financial';
}

const FormModal: React.FC<FormModalProps> = ({ open, handleClose, type }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="body2" >
          {type === 'property' ? 'Add Property' : 'Add Financial'}
        </Typography>
        {type === 'property' ? <PropertyForm handleClose={handleClose}/> : <FinancialForm handleClose={handleClose}/>}
      </Box>
    </Modal>
  );
};

export default FormModal;
