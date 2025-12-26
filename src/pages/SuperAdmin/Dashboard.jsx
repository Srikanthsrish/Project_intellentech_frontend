import { useEffect, useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  StopOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import api from "../../services/api";

const { Title, Text } = Typography;

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    gap: 16,
  };

  const iconStyle = {
    fontSize: 32,
    padding: 14,
    borderRadius: "50%",
    background: "#f0f5ff",
    color: "#1677ff",
  };

  return (
    <div>
      <Title level={3}>Overview</Title>

      {/* 🔢 Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <div style={cardStyle}>
              <TeamOutlined style={iconStyle} />
              <div>
                <Text type="secondary">Total Managers</Text>
                <Title level={4}>{stats.totalManagers || 0}</Title>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <div style={cardStyle}>
              <UserOutlined style={iconStyle} />
              <div>
                <Text type="secondary">Total Employees</Text>
                <Title level={4}>{stats.totalEmployees || 0}</Title>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <div style={cardStyle}>
              <CheckCircleOutlined
                style={{
                  ...iconStyle,
                  color: "#52c41a",
                  background: "#f6ffed",
                }}
              />
              <div>
                <Text type="secondary">Active Users</Text>
                <Title level={4}>{stats.activeUsers || 0}</Title>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <div style={cardStyle}>
              <StopOutlined
                style={{
                  ...iconStyle,
                  color: "#ff4d4f",
                  background: "#fff1f0",
                }}
              />
              <div>
                <Text type="secondary">Inactive Users</Text>
                <Title level={4}>{stats.inactiveUsers || 0}</Title>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      
      

      <Row gutter={[16, 16]}>
        {stats.taskStatus?.map((t) => (
          <Col xs={24} sm={12} md={8} lg={6} key={t._id}>
            <Card>
              <div style={cardStyle}>
                <BarChartOutlined style={iconStyle} />
                <div>
                  <Text type="secondary">{t._id}</Text>
                  <Title level={4}>{t.count}</Title>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
