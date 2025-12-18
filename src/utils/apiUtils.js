/**
 * Handles API errors consistently across the application
 * @param {Error} error - The error object
 * @param {string} defaultMessage - Default error message if error doesn't have one
 * @throws {Error} - The error with a user-friendly message
 */
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  const errorMessage = error.response?.data?.error || error.message || defaultMessage;
  console.error('API Error:', errorMessage);
  throw new Error(errorMessage);
};

/**
 * Validates equipment data before submission
 * @param {Object} data - Equipment data to validate
 * @throws {Error} - If validation fails
 */
export const validateEquipmentData = (data) => {
  if (!data.name?.trim()) {
    throw new Error('Name is required');
  }
  if (!data.type) {
    throw new Error('Type is required');
  }
  if (!data.status) {
    throw new Error('Status is required');
  }
};
