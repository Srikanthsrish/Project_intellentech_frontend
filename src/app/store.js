import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import managerReducer from "../features/manager/managerSlice"
import employeeReducer from '../features/employee/employeeSlice';
import taskReducer from '../features/task/taskSlice';
import employeeTaskReducer from '../features/employee/employeeTaskSlice';
import userReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    manager: managerReducer, 
    employee: employeeReducer,
     task: taskReducer,
     employeeTask: employeeTaskReducer,
     user: userReducer, 
  }
});
