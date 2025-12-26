import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// FETCH EMPLOYEES
export const fetchEmployees = createAsyncThunk(
  'employee/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/employees');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const fetchTasks = createAsyncThunk(
  'task/fetchAll',
  async () => {
    const res = await api.get('/tasks');
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  'task/delete',
  async (id) => {
    await api.delete(`/tasks/${id}`);
    return id;
  }
);
// ADD EMPLOYEE
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/employees', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// UPDATE EMPLOYEE
export const updateEmployee = createAsyncThunk(
  'employee/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/employees/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE EMPLOYEE
export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/employees/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchEmployees.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ADD
      .addCase(addEmployee.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // UPDATE
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(e => e._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // DELETE
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e._id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
