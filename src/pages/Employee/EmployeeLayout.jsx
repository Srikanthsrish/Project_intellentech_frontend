import { Layout, Menu, Typography, Grid, Drawer, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import EmployeeHome from "./EmployeeHome";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeTasks from "./EmployeeTasks";

const { Sider, Content, Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function EmployeeLayout() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const menuItems = [
    { key: "home", icon: <HomeOutlined />, label: "Home" },
    { key: "tasks", icon: <ProfileOutlined />, label: "Tasks" },
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        dispatch(logout());
        localStorage.clear();
      },
    },
  ];

  const pageTitles = {
    home: "Home",
    profile: "Profile",
    tasks: "Tasks",
  };

  const MenuContent = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[active]}
      items={menuItems}
      onClick={(e) => {
        if (e.key === "logout") return;
        setActive(e.key);
        setDrawerOpen(false);
      }}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for Tablet + Desktop */}
      {!isMobile && (
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="md"
          collapsedWidth={80}
        >
          {MenuContent}
        </Sider>
      )}

      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#001529",
            height: 64,
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "space-between" : "center",
          }}
        >
          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              type="text"
              style={{ color: "white" }}
              onClick={() => setDrawerOpen(true)}
            />
          )}

          <Title
            level={4}
            style={{
              color: "#fff",
              margin: 0,
              textAlign: "center",
              fontSize: isMobile ? 16 : 20,
            }}
          >
            Employee Dashboard
            {active !== "home" && (
              <span style={{ fontSize: 13, color: "#d9d9d9" }}>
                {" "}
                / {pageTitles[active]}
              </span>
            )}
          </Title>
        </Header>

        {/* Drawer for Mobile */}
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          bodyStyle={{ padding: 0 }}
        >
          {MenuContent}
        </Drawer>

        {/* Content */}
        <Content
          style={{
            padding: isMobile ? "10px" : "16px",
            overflowX: "auto",
            background: "#f5f7fa",
          }}
        >
          {active === "home" && <EmployeeHome />}
          {active === "profile" && <EmployeeProfile />}
          {active === "tasks" && <EmployeeTasks />}
        </Content>
      </Layout>
    </Layout>
  );
}
