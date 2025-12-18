
import { useState, useEffect } from 'react';

const EquipmentForm = ({ 
  equipment, 
  onSubmit, 
  onCancel,
  isLoading,
  error
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '',
    last_cleaned: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name || '',
        type: equipment.type || '',
        status: equipment.status || '',
        last_cleaned: equipment.last_cleaned || ''
      });
    }
  }, [equipment]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.type) errors.type = 'Type is required';
    if (!formData.status) errors.status = 'Status is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
   
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="equipment-form">
      {error && (
        <div className="form-error">
          {error}
        </div>
      )}
      
      <div className={`form-group ${formErrors.name ? 'has-error' : ''}`}>
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className="form-control"
          placeholder="Enter equipment name"
        />
        {formErrors.name && (
          <span className="error-message">{formErrors.name}</span>
        )}
      </div>

      <div className={`form-group ${formErrors.type ? 'has-error' : ''}`}>
        <label htmlFor="type">Type*</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          disabled={isLoading}
          className="form-control"
        >
          <option value="">Select a type</option>
          <option value="Machine">Machine</option>
          <option value="Vessel">Vessel</option>
          <option value="Tank">Tank</option>
          <option value="Mixer">Mixer</option>
        </select>
        {formErrors.type && (
          <span className="error-message">{formErrors.type}</span>
        )}
      </div>

      <div className={`form-group ${formErrors.status ? 'has-error' : ''}`}>
        <label htmlFor="status">Status*</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isLoading}
          className="form-control"
        >
          <option value="">Select status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
        {formErrors.status && (
          <span className="error-message">{formErrors.status}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="last_cleaned">Last Cleaned Date</label>
        <input
          type="date"
          id="last_cleaned"
          name="last_cleaned"
          value={formData.last_cleaned || ''}
          onChange={handleChange}
          disabled={isLoading}
          className="form-control"
        />
      </div>
      
      <div className="form-actions">
        <button 
          type="button" 
          onClick={onCancel}
          disabled={isLoading}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              {equipment ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            equipment ? 'Update Equipment' : 'Add Equipment'
          )}
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;