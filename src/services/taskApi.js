// services/taskApi.js
import api from './api';

export const getEmployees = () => api.get('/tasks/employees');
export const assignTask = (data) => api.post('/tasks/assign', data);
export const getManagerTasks = () => api.get('/tasks/manager');
export const submitTask = (id, data) => api.put(`/tasks/submit/${id}`, data);
