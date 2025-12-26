import { Layout, Menu, Typography } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

import ViewerHome from './ViewerHome';
import ViewerEmployees from './ViewerEmployees';
import ViewerProfile from './ViewerProfile';

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

export default function ViewerLayout() {
  const [active, setActive] = useState('home');
  const [collapsed, setCollapsed] = useState(false); // responsive collapse
  const dispatch = useDispatch();

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home' },
    { key: 'employees', icon: <TeamOutlined />, label: 'Employee Details' },
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        dispatch(logout());
        localStorage.clear();
        window.location.replace('/login');
      },
    },
  ];

  const pageTitles = {
    home: 'Home',
    employees: 'Employee Details',
    profile: 'Profile',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Responsive Sidebar */}
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="md"        // Tablet breakpoint
        collapsedWidth={80}    // Mobile icon-only view
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[active]}
          items={menuItems}
          onClick={(e) => e.key !== 'logout' && setActive(e.key)}
        />
      </Sider>

      {/* Right Layout */}
      <Layout>
        {/* Responsive Header */}
        <Header
          style={{
            background: '#001529',
            height: 64,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title
            level={4}
            style={{
              color: '#fff',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Viewer Dashboard
            {active !== 'home' && (
              <span
                style={{
                  fontSize: 14,
                  color: '#d9d9d9',
                  marginLeft: 8,
                }}
              >
                / {pageTitles[active]}
              </span>
            )}
          </Title>
        </Header>

        {/* Responsive Content */}
        <Content
          style={{
            padding: 16,
            overflowX: 'auto',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {active === 'home' && <ViewerHome />}
          {active === 'employees' && <ViewerEmployees />}
          {active === 'profile' && <ViewerProfile />}
        </Content>
      </Layout>
    </Layout>
  );
}
