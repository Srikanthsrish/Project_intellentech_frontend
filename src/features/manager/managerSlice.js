import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchManagers = createAsyncThunk(
  'manager/fetchAll',
  async () => {
    const res = await api.get('/managers');
    return res.data;
  }
);

export const deleteManager = createAsyncThunk(
  'manager/delete',
  async (id) => {
    await api.delete(`/managers/${id}`);
    return id;
  }
);
export const addManager = createAsyncThunk(
  'manager/add',
  async (data) => {
    const res = await api.post('/managers', data);
    return res.data;
  }
);

export const updateManager = createAsyncThunk(
  'manager/update',
  async ({ id, data }) => {
    const res = await api.put(`/managers/${id}`, data);
    return res.data;
  }
);


const managerSlice = createSlice({
  name: 'manager',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.pending, (state) => {
        state.loading = true;
      })
      .addCase(addManager.fulfilled, (state, action) => {
  state.list.push(action.payload);
})

.addCase(updateManager.fulfilled, (state, action) => {
  const index = state.list.findIndex(m => m._id === action.payload._id);
  if (index !== -1) state.list[index] = action.payload;
})

      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        state.list = state.list.filter(m => m._id !== action.payload);
      });
      
  }
});

export default managerSlice.reducer;
