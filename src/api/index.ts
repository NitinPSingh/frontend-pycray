import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; 

export interface Property {
  id: number;
  ownerName: string;
  propertyName: string;
  totalUnits: number;
  filledUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  lastMaintenanceDate: string;
}

export interface FinancialRecord {
  id: number;
  propertyId: number;
  income: number;
  expenses: number;
  netProfit: number;
}

export const propertyApi = {
  
  getProperties: async (): Promise<Property[]> => {
    const response = await axios.get(`${API_BASE_URL}/properties`);
    return response.data;
  },

  addProperty: async (property: Omit<Property, 'id'>): Promise<Property> => {
    const response = await axios.post(`${API_BASE_URL}/properties`, property);
    return response.data;
  },

  populateData: async () : Promise<void> => {
    await axios.get(`${API_BASE_URL}/populate`);
    
  },

  deleteProperty: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/properties/${id}`);
  },

  
  getFinancials: async (): Promise<FinancialRecord[]> => {
    const response = await axios.get(`${API_BASE_URL}/financials`);
    return response.data;
  },

  addFinancial: async (financial: Omit<FinancialRecord, 'id'>): Promise<FinancialRecord> => {
    const response = await axios.post(`${API_BASE_URL}/financials`, financial);
    return response.data;
  },

  deleteFinancial: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/financials/${id}`);
  },
};