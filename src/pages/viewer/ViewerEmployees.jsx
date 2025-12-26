import { Table, Tag } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../features/user/userSlice';

export default function ViewerEmployees() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const employees = users.filter(u => u.role === 'Employee');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'], // always visible
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm', 'md', 'lg', 'xl'], // hide on very small screens
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => <Tag color="blue">{role}</Tag>,
      responsive: ['md', 'lg', 'xl'], // hide on mobile & small tablet
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status || 'Active'}
        </Tag>
      ),
      responsive: ['md', 'lg', 'xl'], // hide on mobile & small tablet
    },
  ];

  return (
    <Table
      loading={loading}
      rowKey="_id"
      dataSource={employees}
      columns={columns}
      pagination={{ pageSize: 5 }}
      scroll={{ x: 'max-content' }} // horizontal scroll for small screens
    />
  );
}
