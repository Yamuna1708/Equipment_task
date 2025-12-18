import { useState, useMemo } from 'react';
import EquipmentForm from './EquipmentForm';

const EquipmentList = ({ equipment, onAdd, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'status', direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return '';
    }
  };

  const filteredEquipment = useMemo(() => {
    let result = [...equipment];
    
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term)
      );
    }

   
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [equipment, searchTerm, sortConfig]);

  const handleSubmit = async (formData) => {
    try {
      if (editingId) {
        await onUpdate(editingId, formData);
        setEditingId(null);
      } else {
        await onAdd(formData);
      }
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving equipment:', error);
    }
  };

  

  return (
    <div className="equipment-container">
      {!showAddForm && !editingId && (
        <div className="equipment-header">
          <h2>Equipment List</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setShowAddForm(true);
              setEditingId(null);
            }}
          >
            Add New Equipment
          </button>
        </div>
      )}

      {showAddForm && !editingId && (
        <EquipmentForm 
          onSubmit={handleSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {!showAddForm && !editingId && (
        <div className="table-responsive">
          <table className="equipment-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th 
                  className="sortable" 
                  onClick={() => handleSort('status')}
                >
                  Status {getSortIndicator('status')}
                </th>
                <th>Last Cleaned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.length > 0 ? (
                filteredEquipment.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.last_cleaned ? new Date(item.last_cleaned).toLocaleDateString() : 'N/A'}</td>
                    <td className="actions">
                      <button 
                        className="btn btn-edit"
                        onClick={() => {
                          setEditingId(item.id);
                          setShowAddForm(false);
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    {searchTerm ? 'No matching equipment found' : 'No equipment available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editingId && (
        <div className="card form-card">
          <h3>Edit Equipment</h3>
          <EquipmentForm
            equipment={equipment.find(eq => eq.id === editingId)}
            onSubmit={handleSubmit}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default EquipmentList;