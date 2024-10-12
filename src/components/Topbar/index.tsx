import { Box, Paper, InputBase, IconButton, Avatar, Typography, FormControl, OutlinedInput, InputAdornment, FormHelperText, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { propertyApi } from '../../api';
import { usePropertyContext } from '../../context/PropertyContext';

export default function Topbar() {
    const {populateData} = usePropertyContext()


  return (
    <Box component="main" sx={{ flexGrow: 1, p: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={      
            <IconButton type="submit" sx={{ p: '10px' }}>
                <SearchIcon />
            </IconButton>
            }
            aria-describedby="outlined-weight-helper-text"
            sx={{ width: '26.5vw', height: '45px', borderRadius: '10px' }} 
            inputProps={{
            'aria-label': 'weight',
            }}
            placeholder='Search'
        />
        </FormControl>
        <Button variant='secondary' sx={{ color: 'text.primary' }} onClick={populateData}>Populate Data</Button>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
          <NotificationsOutlinedIcon sx={{ mr: 2, }} />
          <Avatar alt="Alex Johnson" src="/path-to-avatar.jpg" sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1" sx={{ ml: 1 }}>Alex Johnson</Typography>
          <ExpandMoreIcon sx={{ color: 'grey.500' }} />
        </Box>
      </Box>
    </Box>
  );
}