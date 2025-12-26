import api from './api';

// Manager dashboard – total employee count
export const getEmployeeCount = async () => {
  const response = await api.get('/manager-dashboard/employee-count');
  return response.data;
};
