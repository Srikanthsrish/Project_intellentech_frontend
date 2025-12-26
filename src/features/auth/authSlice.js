import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, googleLogin } from './authService';

// helpers
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

const getToken = () => localStorage.getItem('token') || null;

// REGISTER
export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      return await registerUser(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      return await loginUser(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Invalid email or password'
      );
    }
  }
);

// GOOGLE
export const googleAuth = createAsyncThunk(
  'auth/google',
  async (token, thunkAPI) => {
    try {
      return await googleLogin(token);
    } catch {
      return thunkAPI.rejectWithValue('Google login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUser(),
    token: getToken(),
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      state.error = null;
      localStorage.clear();
    },
    clearStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;

        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GOOGLE
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.accessToken);
      });
  }
});

export const { logout, clearStatus } = authSlice.actions;
export default authSlice.reducer;
