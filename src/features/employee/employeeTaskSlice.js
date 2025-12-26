import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch employee tasks
export const fetchEmployeeTasks = createAsyncThunk(
  'employeeTask/fetch',
  async (id) => {
    const res = await api.get(`/tasks/employee/${id}`);
    return res.data;
  }
);

// Submit task
export const submitTask = createAsyncThunk(
  'employeeTask/submit',
  async ({ taskId, link }) => {
    const res = await api.put(`/tasks/submit/${taskId}`, {
      employeeTaskLink: link,
    });
    return res.data;
  }
);

const employeeTaskSlice = createSlice({
  name: 'employeeTask',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchEmployeeTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployeeTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Submit task
      .addCase(submitTask.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default employeeTaskSlice.reducer;
