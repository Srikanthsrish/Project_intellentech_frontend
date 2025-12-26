import { Card, Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

export default function ManagerProfile() {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <Row justify="center" style={{ padding: '16px' }}>
      <Col
        xs={22}  // mobile
        sm={18}  // small tablets
        md={14}  // tablets
        lg={10}  // laptops
        xl={8}   // large screens
      >
        <Card
          style={{
            width: '100%',
            textAlign: 'left',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <Title level={4} style={{ textAlign: 'center' }}>
            My Profile
          </Title>
          <p>
            <Text strong>Name:</Text> {user.name || 'N/A'}
          </p>
          <p>
            <Text strong>Email:</Text> {user.email || 'N/A'}
          </p>
          <p>
            <Text strong>Role:</Text> {user.role || 'N/A'}
          </p>
        </Card>
      </Col>
    </Row>
  );
}
