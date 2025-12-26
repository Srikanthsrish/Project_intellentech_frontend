import { Card, Statistic, Row, Col } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getEmployeeCount } from '../../services/managerDashboardApi';

export default function ManagerHome() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getEmployeeCount().then(res => {
      setCount(res.totalEmployees || 0);
    });
  }, []);

  return (
    <Row
      justify="center"
      style={{
        padding: '16px',
      }}
    >
      <Col
        xs={24}   // mobile — full width
        sm={20}   // small tablet
        md={16}   // tablet
        lg={10}   // laptop
        xl={8}    // large screen
      >
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}
        >
          <Statistic
            title="Total Employees"
            value={count}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
}
