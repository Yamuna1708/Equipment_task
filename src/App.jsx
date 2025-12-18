import { useState, useEffect } from 'react';
import './App.css';
import EquipmentList from './components/EquipmentList';

const API_URL = 'http://localhost:5000/api/equipment';

function App() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      console.log('📡 API CALL: GET', API_URL);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }
      const data = await response.json();
      console.log('✅ Response from GET', API_URL, ':', data);
      setEquipment(data);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching equipment:', err);
      setError('Failed to load equipment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleAddEquipment = async (newEquipment) => {
    try {
      console.log('📡 API CALL: POST', API_URL, 'with data:', newEquipment);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEquipment),
      });

      if (!response.ok) {
        throw new Error('Failed to add equipment');
      }
      const data = await response.json();
      console.log('✅ Response from POST', API_URL, ':', data);

      await fetchEquipment();
    } catch (err) {
      console.error('Error adding equipment:', err);
      setError('Failed to add equipment. Please try again.');
    }
  };

  const handleUpdateEquipment = async (id, updatedEquipment) => {
    const url = `${API_URL}/${id}`;
    try {
      console.log('📡 API CALL: PUT', url, 'with data:', updatedEquipment);
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEquipment),
      });

      if (!response.ok) {
        throw new Error('Failed to update equipment');
      }
      const data = await response.json();
      console.log('✅ Response from PUT', url, ':', data);

      await fetchEquipment();
    } catch (err) {
      console.error('Error updating equipment:', err);
      setError('Failed to update equipment. Please try again.');
    }
  };

  const handleDeleteEquipment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) {
      return;
    }

    const url = `${API_URL}/${id}`;
    try {
      console.log('📡 API CALL: DELETE', url);
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete equipment');
      }
      console.log('✅ Successfully deleted from', url);

      setEquipment(equipment.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting equipment:', err);
      setError('Failed to delete equipment. Please try again.');
    }
  };

  if (loading && equipment.length === 0) {
    return <div className="loading">Loading equipment...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Equipment Tracker</h1>
      </header>
      
      <main className="app-content">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}
        
        <EquipmentList
          equipment={equipment}
          onAdd={handleAddEquipment}
          onUpdate={handleUpdateEquipment}
          onDelete={handleDeleteEquipment}
        />
      </main>
      
      <footer className="app-footer">
        <p>Equipment Tracker &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
