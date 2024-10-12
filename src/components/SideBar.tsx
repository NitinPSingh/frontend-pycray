import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  path: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        pl:3,
        cursor: 'pointer',
        color: isActive ? 'text.primary' : '#686868',
        '&:hover': {
          bgcolor: '#f5f5f5',
        },
      }}
      onClick={() => navigate(path)}
    >
      {icon}
      <p style={{ marginLeft: '20px',cursor: 'none',fontWeight: '500', userSelect: 'none', pointerEvents: 'none' }}>{text}</p>
    </Box>
  );
};

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: 240, bgcolor: 'white', maxHeight: '100vh' }}>
      <Typography variant="h6" sx={{ px: 2, mb: 4, color: '#1a237e', fontWeight: 'bold' }}>my app</Typography>
      <Typography variant="caption" sx={{ px: 2, mb: 1, color: 'grey.500' }}>MAIN MENU</Typography>
      <SidebarItem icon={<DashboardIcon />} text="Dashboard" path="/dashboard" />
      <SidebarItem icon={<PeopleIcon />} text="Create Portfolio" path="/create-portfolio" />
      <SidebarItem icon={<ListAltIcon />} text="Property List" path="/property-list" />
      <Typography variant="caption" sx={{ px: 2, my: 1, color: 'grey.500' }}>OTHER</Typography>
      <SidebarItem icon={<HelpIcon />} text="Support" path="/support" />
      <SidebarItem icon={<SettingsIcon />} text="Settings" path="/settings" />
    </Box>
  );
};

export default Sidebar;
