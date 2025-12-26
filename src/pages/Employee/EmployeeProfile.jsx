// pages/Employee/EmployeeProfile.jsx
import { Card, Row, Col, Typography, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function EmployeeProfile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div
      style={{
        padding: "16px",
        minHeight: "100%",
      }}
    >
      <Row justify="center">
        <Col
          xs={24}   // Mobile full width
          sm={20}   // Small tablets
          md={16}   // Tablet
          lg={12}   // Laptop
          xl={10}   // Desktop
        >
          <Card
            style={{
              borderRadius: 12,
              padding: "16px",
            }}
          >
            <Space
              direction="vertical"
              size="middle"
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <Avatar
                size={90}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1677ff" }}
              />

              <Title
                level={4}
                style={{ marginBottom: 0, textAlign: "center" }}
              >
                My Profile
              </Title>

              <div style={{ width: "100%" }}>
                <p>
                  <Text strong>Name: </Text>
                  <Text>{user.name || "N/A"}</Text>
                </p>

                <p>
                  <Text strong>Email: </Text>
                  <Text>{user.email || "N/A"}</Text>
                </p>

                <p>
                  <Text strong>Role: </Text>
                  <Text>{user.role || "N/A"}</Text>
                </p>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
