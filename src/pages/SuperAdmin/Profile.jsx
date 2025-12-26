import { Card, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Row
      justify="center"
      style={{ padding: "16px" }}
    >
      <Col
        xs={24}      // 📱 Mobile
        sm={20}      // 📲 Tablet
        md={14}      // 💻 Small laptop
        lg={10}      // 💻 Laptop
        xl={8}       // 🖥️ Large screen
      >
        <Card
          style={{
            borderRadius: 12,
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            My Profile
          </Title>

          <p>
            <Text strong>Name:</Text> {user.name}
          </p>
          <p>
            <Text strong>Email:</Text> {user.email}
          </p>
          <p>
            <Text strong>Role:</Text> {user.role}
          </p>
          {/* Password intentionally hidden for security */}
        </Card>
      </Col>
    </Row>
  );
}
