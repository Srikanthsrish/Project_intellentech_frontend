import { Layout, Menu, Typography, Grid } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  CheckSquareOutlined,
  PlusOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

import ManagerHome from './Home';
import ManagerProfile from './Profile';
import ManagerTasks from './Task';
import ManagerViewTasks from './TaskList';

const { Sider, Content, Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function ManagerLayout() {
  const dispatch = useDispatch();
  const screens = useBreakpoint();

  const [active, setActive] = useState('home');
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home' },
    {
      key: 'tasks',
      icon: <CheckSquareOutlined />,
      label: 'Tasks',
      children: [
        { key: 'add-task', icon: <PlusOutlined />, label: 'Add Task' },
        { key: 'view-tasks', label: 'View Tasks' },
      ],
    },
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const handleClick = ({ key }) => {
    if (key === 'logout') {
      dispatch(logout());
      localStorage.clear();
      return;
    }
    setActive(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="md"         // collapses on tablet & below
        collapsedWidth={70}     // compact icons on small screens
        width={230}
      >
        <div
          style={{
            height: 60,
            margin: 12,
            color: '#fff',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: collapsed ? 14 : 18,
          }}
        >
          Manager
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={active === 'logout' ? [] : [active]}
          items={items}
          onClick={handleClick}
        />
      </Sider>

      {/* Right Side */}
      <Layout>
        <Header
          style={{
            background: '#001529',
            height: 64,
            padding: screens.xs ? '0 8px' : '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title
            level={screens.xs ? 5 : 4}
            style={{ margin: 0, color: '#fff', textAlign: 'center' }}
          >
            Manager Dashboard
            {active !== 'home' && (
              <span style={{ fontSize: 13, color: '#d9d9d9' }}>
                {' '} / {active.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            )}
          </Title>
        </Header>

        <Content
          style={{
            padding: screens.xs ? '10px' : '16px',
            minHeight: 'calc(100vh - 64px)',
            background: '#f5f7fa',
            overflowX: 'auto',  // prevents layout breaking on mobile
          }}
        >
          {active === 'home' && <ManagerHome />}
          {active === 'add-task' && <ManagerTasks />}
          {active === 'view-tasks' && <ManagerViewTasks />}
          {active === 'profile' && <ManagerProfile />}
        </Content>
      </Layout>
    </Layout>
  );
}
