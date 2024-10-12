import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface TableTitleProps {
  title: string;
  subtitle: string;
  stag: string;
  handleDelete: () => void;
  handleAdd: () => void;
}

const TableTitle: React.FC<TableTitleProps> = ({ title, subtitle, stag, handleDelete, handleAdd }) => {
  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a237e', mr: 1 }}>{title}</Typography>
          <Typography variant="caption" sx={{ color: 'text.primary', backgroundColor: '#f5f5f5' , px: 1, borderRadius: '10px', height:'13px', lineHeight:'12px', fontSize:'8px' }}>{stag}</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary'  }}>{subtitle}</Typography>
      </Box>
      <Box>
        <Button
          variant="secondary"
          sx={{ mr: 1, color: 'text.primary', borderColor: 'grey.300', height: '30px' }}
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: 'text.primary', height: '30px' }}
          onClick={handleAdd}
          startIcon={<AddIcon />}
        >
          Add new
        </Button>
      </Box>
    </Box>
  );
};

export default TableTitle;
