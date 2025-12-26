// pages/superadmin/DashboardLayout.jsx
import { Layout, Menu, Typography } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

import Dashboard from './Dashboard';
import Profile from './Profile';
import ManagerTable from './ManagerTable';
import EmployeeTable from './EmployeeTable';
import ViewTasks from './ViewTasks';
import AssignManagerEmp from './AssignManagerEmp';
import SuperAdminTasks from './ViewTasks';

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const [active, setActive] = useState('home');
  const [collapsed, setCollapsed] = useState(false);

  const siderWidth = collapsed ? 80 : 200;

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home' },
    { key: 'managers', icon: <TeamOutlined />, label: 'Managers' },
    { key: 'employees', icon: <TeamOutlined />, label: 'Employees' },
    { key: 'view-tasks', icon: <ProfileOutlined />, label: 'View Tasks' },
    { key: 'assign-manager', icon: <TeamOutlined />, label: 'Assign Manager → Employees' },
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        dispatch(logout());
        localStorage.clear();
      },
    },
  ];

  const pageTitles = {
    home: 'Dashboard',
    managers: 'Managers',
    employees: 'Employees',
    'view-tasks': 'View Tasks',
    'assign-manager': 'Assign Manager to Employees',
    profile: 'Profile',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* FIXED SIDEBAR */}
      <Sider
        width={200}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
        breakpoint="md"
        collapsedWidth={80}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1000,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[active]}
          items={menuItems}
          onClick={(e) => e.key !== 'logout' && setActive(e.key)}
        />
      </Sider>

      {/* MAIN LAYOUT WITH LEFT MARGIN */}
      <Layout style={{ marginLeft: siderWidth }}>
        {/* FIXED HEADER */}
        <Header
          style={{
            position: 'fixed',
            top: 0,
            left: siderWidth,
            right: 0,
            height: 64,
            zIndex: 900,
            background: '#001529',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            SuperAdmin Dashboard
            {active !== 'home' && (
              <span style={{ fontSize: 14, color: '#d9d9d9' }}>
                {' '} / {pageTitles[active]}
              </span>
            )}
          </Title>
        </Header>

        {/* SCROLLABLE CONTENT */}
        <Content
          style={{
            marginTop: 80,
            padding: 16,
            height: 'calc(100vh - 80px)',
            overflowY: 'auto',
          }}
        >
          {active === 'home' && <Dashboard />}
          {active === 'managers' && <ManagerTable />}
          {active === 'employees' && <EmployeeTable />}
          {active === 'view-tasks' && <SuperAdminTasks/>}
          {active === 'assign-manager' && <AssignManagerEmp />}
          {active === 'profile' && <Profile />}
        </Content>
      </Layout>
    </Layout>
  );
}
