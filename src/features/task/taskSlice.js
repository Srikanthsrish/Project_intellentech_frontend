// features/task/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTasks = createAsyncThunk('task/fetch', async () => {
  const res = await api.get('/tasks');
  return res.data;
});

export const deleteTask = createAsyncThunk('task/delete', async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
});
export const fetchEmployeeTasks = createAsyncThunk(
  'task/fetchEmployeeTasks',
  async (employeeId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/tasks/employee/${employeeId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
const taskSlice = createSlice({
  name: 'task',
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => { s.loading = true; })
      .addCase(fetchTasks.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchEmployeeTasks.pending, (state) => {
  state.loading = true;
})
.addCase(fetchEmployeeTasks.fulfilled, (state, action) => {
  state.loading = false;
  state.list = action.payload;
})
.addCase(fetchEmployeeTasks.rejected, (state) => {
  state.loading = false;
})

      .addCase(deleteTask.fulfilled, (s, a) => {
        s.list = s.list.filter(t => t._id !== a.payload);
      });

  },
  
});

export default taskSlice.reducer;
