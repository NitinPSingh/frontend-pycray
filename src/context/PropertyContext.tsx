import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { propertyApi, Property, FinancialRecord } from '../api';

interface PropertyWithSelection extends Property {
  selected: boolean;
}

interface FinancialRecordWithSelection extends FinancialRecord {
  selected: boolean;
  propId: number;
}

interface SummaryData {
  numberOfProperties: number;
  averageOccupancyRate: number;
  averageVacancyRate: number;
  overallNetProfit: number;
}

interface PropertyContextType {
  properties: PropertyWithSelection[];
  financials: FinancialRecordWithSelection[];
  summaryData: SummaryData;
  addProperty: (property: Omit<Property, 'id'>) => Promise<void>;
  deleteProperty: () => Promise<void>;
  addFinancial: (financial: Omit<FinancialRecord, 'id'>) => Promise<void>;
  deleteFinancial: () => Promise<void>;
  togglePropertySelection: (id: number) => void;
  toggleFinancialSelection: (id: number) => void;
  populateData: ()=>void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider = ({children}: PropertyProviderProps): React.ReactNode => {
  const [properties, setProperties] = useState<PropertyWithSelection[]>([]);
  const [financials, setFinancials] = useState<FinancialRecordWithSelection[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData>({
    numberOfProperties: 0,
    averageOccupancyRate: 0,
    averageVacancyRate: 0,
    overallNetProfit: 0,
  });

  useEffect(() => {
    fetchProperties();
    fetchFinancials();
  }, []);

  useEffect(() => {
    updateSummaryData();
  }, [properties, financials]);

  const fetchProperties = async () => {
    const fetchedProperties = await propertyApi.getProperties();
    setProperties(fetchedProperties.map(prop => ({ ...prop, selected: false })));
  };

  const flattenAndSetFinancials = (fetchedFinancials: any[]) => {
    setFinancials(fetchedFinancials);
  };

  const populateData = async () => {
    await propertyApi.populateData();
    fetchProperties()
    fetchFinancials()
  }

  const fetchFinancials = async () => {
    const fetchedFinancials = await propertyApi.getFinancials();

    flattenAndSetFinancials(fetchedFinancials);
  };
  

  const addProperty = async (property: Omit<Property, 'id'>) => {
    const newProperty = await propertyApi.addProperty(property);
    setProperties([...properties, { ...newProperty, selected: false }]);
  };
  

  const deleteProperty = async () => {
    const selectedProperties = properties.filter(p => p.selected);
    for (const property of selectedProperties) {
      await propertyApi.deleteProperty(property.id);
    }
    
    setProperties(properties.filter(p => !p.selected));
    fetchFinancials()
  };
  

  const addFinancial = async (financial: Omit<FinancialRecord, 'id'>) => {
    const newFinancial = await propertyApi.addFinancial(financial);
    flattenAndSetFinancials([...financials, newFinancial]);
  };
  

  const deleteFinancial = async () => {
    const selectedFinancials = financials.filter(f => f.selected);
    for (const financial of selectedFinancials) {
      await propertyApi.deleteFinancial(financial.id);
    }
    setFinancials(financials.filter(f => !f.selected));
  };
  

  const togglePropertySelection = (id: number) => {
    setProperties(prevProperties =>
      prevProperties.map(prop =>
        prop.id === id ? { ...prop, selected: !prop.selected } : prop
      )
    );
  };

  const toggleFinancialSelection = (id: number) => {
    setFinancials(prevFinancials =>
      prevFinancials.map(fin =>
        fin.id === id ? { ...fin, selected: !fin.selected } : fin
      )
    );
  };

  const updateSummaryData = () => {
    const selectedProperties = properties.filter(prop => prop.selected);
    const selectedFinancials = financials.filter(fin => fin.selected);
    const numberOfProperties = selectedProperties.length;
    let averageOccupancyRate = 0;
    let averageVacancyRate = 0;
    let overallNetProfit = 0;
    if (numberOfProperties > 0) {
      averageOccupancyRate = selectedProperties.reduce((sum, prop) => sum + prop.occupancyRate, 0) / numberOfProperties;
      averageVacancyRate = selectedProperties.reduce((sum, prop) => sum + (prop.vacantUnits / prop.totalUnits) * 100, 0) / numberOfProperties;
    }
    if (selectedFinancials.length > 0) {
      overallNetProfit = selectedFinancials.reduce((sum, fin) => sum + fin.netProfit, 0);
    }
    setSummaryData({
      numberOfProperties,
      averageOccupancyRate,
      averageVacancyRate,
      overallNetProfit,
    });
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      financials,
      summaryData,
      addProperty,
      deleteProperty,
      addFinancial,
      deleteFinancial,
      togglePropertySelection,
      toggleFinancialSelection,
      populateData
    }}>
      {children}
    </PropertyContext.Provider>
  )
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
