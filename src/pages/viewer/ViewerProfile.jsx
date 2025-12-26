import { Card, Typography, Grid } from 'antd';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function ViewerProfile() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const screens = useBreakpoint();

  // Adjust card width based on screen size
  const cardWidth = screens.xs
    ? '90%'   // mobile
    : screens.sm
    ? '70%'   // tablet
    : 400;    // laptop and above

  return (
    <Card
      style={{
        width: cardWidth,
        margin: '20px auto',
        borderRadius: 12,
        padding: 24,
      }}
    >
      <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>
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
  );
}
