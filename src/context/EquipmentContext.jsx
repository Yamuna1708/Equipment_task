import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getEquipment as fetchEquipment,
  addEquipment as createEquipment,
  updateEquipment as editEquipment,
  deleteEquipment as removeEquipment
} from '../services/equipmentService';

const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const data = await fetchEquipment();
      setEquipment(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading equipment:', err);
    } finally {
      setLoading(false);
    }
  };

  const addEquipment = async (equipmentData) => {
    try {
      const newEquipment = await createEquipment(equipmentData);
      setEquipment(prev => [newEquipment, ...prev]);
      return newEquipment;
    } catch (err) {
      setError(err.message);
      console.error('Error adding equipment:', err);
      throw err;
    }
  };

  const updateEquipment = async (id, equipmentData) => {
    try {
      const updated = await editEquipment(id, equipmentData);
      setEquipment(prev => 
        prev.map(item => item.id === parseInt(id) ? updated : item)
      );
      return updated;
    } catch (err) {
      setError(err.message);
      console.error('Error updating equipment:', err);
      throw err;
    }
  };

  const deleteEquipment = async (id) => {
    try {
      await removeEquipment(id);
      setEquipment(prev => prev.filter(item => item.id !== parseInt(id)));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting equipment:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  return (
    <EquipmentContext.Provider
      value={{
        equipment,
        loading,
        error,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        refreshEquipment: loadEquipment
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};
