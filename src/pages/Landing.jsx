import { Link } from 'react-router-dom';
import { Button, Typography, Row, Col, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Row
        align="middle"
        justify="center"
        style={{
          minHeight: '100vh',
          padding: '24px',
        }}
      >
        {/* Image Section */}
        <Col
          xs={24}       // Mobile
          sm={24}
          md={12}       // Tablet
          lg={12}       // Laptop
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.k6nmJeLn5smasbRaUeyoYAHaEK?pid=Api&P=0&h=180"
            alt="Workflow Management"
            style={{
              width: '100%',
              maxWidth: 420,
              height: 'auto',
            }}
          />
        </Col>

        {/* Content Section */}
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          style={{
            textAlign: 'left',
          }}
        >
          <Title
            level={1}
            style={{
              textAlign: 'center',
              textAlignLast: 'left',
            }}
          >
            WorkFlowX
          </Title>

          <Text
            type="secondary"
            style={{
              fontSize: 16,
              display: 'block',
              textAlign: 'center',
            }}
          >
            Role-Based Enterprise Task & Workflow Management System
          </Text>

          <Paragraph style={{ fontSize: 16, color: '#555', marginTop: 20 }}>
            WorkFlowX is a secure and scalable platform designed to manage
            enterprise-level tasks and workflows with full
            <b> role-based access control</b>.
          </Paragraph>

          <Paragraph style={{ fontSize: 16, color: '#555' }}>
            Built for <b>SuperAdmins</b>, <b>Managers</b>, <b>Employees</b>, and
            <b> Viewers</b> to collaborate efficiently with transparency,
            accountability, and control.
          </Paragraph>

          {/* Buttons */}
          <Space
            direction="horizontal"
            size="large"
            style={{
              marginTop: 28,
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Link to="/register">
              <Button type="primary" size="large">
                Register
              </Button>
            </Link>

            <Link to="/login">
              <Button size="large">Login</Button>
            </Link>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
