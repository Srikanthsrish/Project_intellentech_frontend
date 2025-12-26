import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  message,
  Row,
  Col,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../features/auth/authSlice';
import GoogleLoginBtn from '../components/GoogleLoginBtn';

const { Title } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, loading, error } = useSelector((state) => state.auth);
  const hasRedirected = useRef(false);

  // 🔹 Register button loading state
  const [registerLoading, setRegisterLoading] = useState(false);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  // ❌ Error message
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // ✅ Success + delayed redirect
  useEffect(() => {
    if (!token || !user || hasRedirected.current) return;

    hasRedirected.current = true;

    message.success(
      `Successfully logged in, ${user.name}. Redirecting...`,
      3
    );

    setTimeout(() => {
      if (user.role === 'SuperAdmin') {
        navigate('/superadmin/dashboard', { replace: true });
      } else if (user.role === 'Manager') {
        navigate('/manager/dashboard', { replace: true });
      } else if (user.role === 'Employee') {
        navigate('/employee/dashboard', { replace: true });
      } else if (user.role === 'Viewer') {
        navigate('/viewer/dashboard', { replace: true });
      }
    }, 2000);
  }, [token, user, navigate]);

  // 🔹 Handle Register button click
  const handleRegister = () => {
    if (registerLoading || loading) return;

    setRegisterLoading(true);

    message.loading({
      content: 'Redirecting to register page...',
      key: 'register',
      duration: 1.5,
    });

    setTimeout(() => {
      navigate('/register');
      setRegisterLoading(false);
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
              Login
            </Title>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Invalid email format' },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter password' }]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                disabled={loading || registerLoading}  // 🔒 auto-disable
              >
                Login
              </Button>
            </Form>

            <Divider>OR</Divider>

            <GoogleLoginBtn />

            <Divider />

            <Button
              block
              size="large"
              type="default"
              onClick={handleRegister}
              loading={registerLoading}
              disabled={loading || registerLoading}  // 🔒 auto-disable
            >
              New User? Register Here
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
