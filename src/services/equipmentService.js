const API_URL = 'http://localhost:5000/api/equipment';

export const getEquipment = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch equipment');
  }
  return response.json();
};

export const addEquipment = async (equipmentData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipmentData),
  });
  if (!response.ok) {
    throw new Error('Failed to add equipment');
  }
  return response.json();
};

export const updateEquipment = async (id, equipmentData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipmentData),
  });
  if (!response.ok) {
    throw new Error('Failed to update equipment');
  }
  return response.json();
};

export const deleteEquipment = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete equipment');
  }
  return id; // Return the ID of the deleted item
};
