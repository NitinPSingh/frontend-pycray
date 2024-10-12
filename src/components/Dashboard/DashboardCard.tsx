import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: string;
  text?: string;
  bgColor: string;
  borderColor: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, text = "Lorem ipsum", bgColor, borderColor }) => {
  return (
    <Card sx={{ width: '23%', bgcolor: bgColor, boxShadow: 'none', borderRadius: 2, border: `1px solid ${borderColor}`  }}>
      <CardContent>
        <Typography variant="body2" sx={{ mb: 1,fontWeight:700 }}>{title}</Typography>
        <Typography variant="h4" sx={{ mb: 1 }}>{value}</Typography>
        <Typography variant="caption">{text}</Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
