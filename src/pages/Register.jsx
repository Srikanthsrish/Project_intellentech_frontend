import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  Select,
  message,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { register, clearStatus } from '../features/auth/authSlice';
import GoogleRegisterBtn from '../components/GoogleRegisterBtn';

const { Title } = Typography;
const { Option } = Select;

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.auth);

  // 🔹 Login button loading state
  const [loginLoading, setLoginLoading] = useState(false);

  const onFinish = (values) => {
    dispatch(register(values));
  };

  useEffect(() => {
    if (success) {
      message.success({
        content: '🎉 Registered successfully! Redirecting to login...',
        duration: 1.5,
      });

      const timer = setTimeout(() => {
        dispatch(clearStatus());
        navigate('/login');
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (error) {
      message.error(error);
      dispatch(clearStatus());
    }
  }, [success, error, dispatch, navigate]);

  // 🔹 Handle Login button click
  const handleLogin = () => {
    if (loginLoading || loading) return;

    setLoginLoading(true);

    message.loading({
      content: 'Redirecting to login page...',
      key: 'login',
      duration: 1.2,
    });

    setTimeout(() => {
      navigate('/login');
      setLoginLoading(false);
    }, 1100);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <Row justify="center" style={{ width: '100%' }}>
        <Col
          xs={24}
          sm={20}
          md={14}
          lg={10}
          xl={8}
        >
          <Card
            style={{
              width: '100%',
              borderRadius: 12,
            }}
          >
            <Title level={3} style={{ textAlign: 'center' }}>
              Register
            </Title>

            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ role: 'Employee' }}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Invalid email format' },
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Password is required' },
                  { min: 6, message: 'Minimum 6 characters' },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                label="Register As"
                name="role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select>
                  <Option value="SuperAdmin">SuperAdmin</Option>
                  <Option value="Manager">Manager</Option>
                  <Option value="Employee">Employee</Option>
                  <Option value="Viewer">Viewer</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  disabled={loading || loginLoading}   // 🔒 disable both buttons
                >
                  Register
                </Button>
              </Form.Item>
            </Form>

            <Divider>OR</Divider>

            <GoogleRegisterBtn />

            <Divider />

            <Button
              block
              size="large"
              type="default"
              onClick={handleLogin}
              loading={loginLoading}
              disabled={loading || loginLoading}     // 🔒 disable both buttons
            >
              Already have an account? Login
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
