import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';

import ProtectedRoute from './components/ProtectedRoute';

// SuperAdmin Pages
import DashboardLayout from "./pages/SuperAdmin/DashboardLayout";
import Dashboard from './pages/SuperAdmin/Dashboard';
import Profile from "./pages/SuperAdmin/Profile";
import ManagerTable from './pages/SuperAdmin/ManagerTable';

// Manager Pages
import ManagerLayout from './pages/Manager/ManagerLayout';
import ManagerHome from './pages/Manager/Home';

// Employee Pages
import EmployeeLayout from "./pages/Employee/EmployeeLayout";

// Viewer Pages
import ViewerLayout from './pages/viewer/ViewerLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* SuperAdmin Routes */}
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="manager" element={<ManagerTable />} />
        </Route>

        {/* Manager Routes */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Manager']}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagerHome />} />
        </Route>

        {/* Employee Routes */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        />

        {/* Viewer Routes */}
        <Route
          path="/viewer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Viewer']}>
              <ViewerLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
