import { Card, Col, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../features/user/userSlice';

const { Title } = Typography;

export default function ViewerHome() {
  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state.user || {}); // ✅ safe fallback

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const employeeCount = users.filter(u => u.role === 'Employee').length;
  const managerCount = users.filter(u => u.role === 'Manager').length;

  return (
    <>
      <Title level={4}>Overview</Title>

      <Row gutter={16}>
        <Col span={12}>
          <Card bordered>
            <Title level={5}>Total Employees</Title>
            <Title>{employeeCount}</Title>
          </Card>
        </Col>

        <Col span={12}>
          <Card bordered>
            <Title level={5}>Total Managers</Title>
            <Title>{managerCount}</Title>
          </Card>
        </Col>
      </Row>
    </>
  );
}
