import React from 'react';
import { Box } from '@mui/material';
import DashboardCard from './DashboardCard';
import { usePropertyContext } from '../../context/PropertyContext';

const DashboardCardContainer: React.FC = () => {
  const { summaryData } = usePropertyContext();

  const cardData = [
    { 
      title: 'Number of properties', 
      value: summaryData.numberOfProperties.toString(), 
      color: '#e3f2fd',
      bcolor: 'rgba(69, 111, 255, 0.3)'
    },
    { 
      title: 'Average Occupancy Rate', 
      value: `${summaryData.averageOccupancyRate.toFixed(2)}%`, 
      color: '#e8f5e9',
      bcolor: 'rgba(130, 254, 87, 0.63)'
    },
    { 
      title: 'Average Vacancy Rate', 
      value: `${summaryData.averageVacancyRate.toFixed(2)}%`, 
      color: '#fce4ec',
      bcolor: 'rgba(255, 174, 247, 1)'
    },
    {
      title: 'Overall Net Profit',
      value: `$${summaryData.overallNetProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      color: '#fff8e1',
      bcolor: 'rgba(239, 206, 91, 1)'
    }
    
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      {cardData.map((item, index) => (
        <DashboardCard 
          key={index}
          title={item.title}
          value={item.value}
          bgColor={item.color}
          borderColor={item.bcolor}
        />
      ))}
    </Box>
  );
};

export default DashboardCardContainer;
