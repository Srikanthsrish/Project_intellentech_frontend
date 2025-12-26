import {
  Table,
  Button,
  Spin,
  Row,
  Col,
  Select,
  Space,
  Typography,
  Tag,
  Modal,
  Input,
} from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchManagers,
  deleteManager,
  addManager,
  updateManager,
} from '../../features/manager/managerSlice';

const { Text } = Typography;
const { Option } = Select;

export default function ManagerTable() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.manager);

  const [statusFilter, setStatusFilter] = useState('All');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Manager',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

  const filteredManagers =
    statusFilter === 'All'
      ? list
      : list.filter((m) => m.status === statusFilter);

  const handleAddManager = () => {
    dispatch(addManager(form));
    setOpenAdd(false);
    setForm({ name: '', email: '', password: '', role: 'Manager' });
  };

  const handleEditManager = () => {
    dispatch(updateManager({ id: editId, data: form }));
    setOpenEdit(false);
    setForm({ name: '', email: '', password: '', role: 'Manager' });
    setEditId(null);
  };

  if (loading) {
    return (
      <div
        style={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {/* 🔹 RESPONSIVE HEADER */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
  {/* Row 1 – Filter */}
  <Col xs={24} sm={12}>
    <Space>
      <Text strong>Status:</Text>
      <Select
        value={statusFilter}
        style={{ width: 140 }}
        onChange={setStatusFilter}
      >
        <Option value="All">All</Option>
        <Option value="Active">Active</Option>
        <Option value="Inactive">Inactive</Option>
      </Select>
    </Space>
  </Col>

  {/* Row 2 – Count (mobile) */}
  <Col xs={24} sm={12}>
    <Text strong>
      Total Managers: {filteredManagers.length}
    </Text>
  </Col>

  {/* Row 3 – Add button */}
  <Col
    xs={24}
    sm={12}
    style={{ textAlign: 'right' }}
  >
    <Button
      type="primary"
      icon={<PlusOutlined />}
      block={window.innerWidth < 576}
      onClick={() => setOpenAdd(true)}
    >
      Add Manager
    </Button>
  </Col>
</Row>


      {/* 🔹 RESPONSIVE TABLE */}
      <Table
        rowKey="_id"
        dataSource={filteredManagers}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 700 }}   // ✅ mobile horizontal scroll
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          {
            title: 'Status',
            dataIndex: 'userStatus',
            render: (status) => (
              <Tag color={status === 'Active' ? 'green' : 'red'}>
                {status}
              </Tag>
            ),
          },
          {
            title: 'Actions',
            render: (_, record) => (
              <Space>
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => {
                    setForm({
                      name: record.name,
                      email: record.email,
                      role: record.role,
                    });
                    setOpenView(true);
                  }}
                />
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    setForm({
                      name: record.name,
                      email: record.email,
                      password: '',
                      role: record.role,
                    });
                    setEditId(record._id);
                    setOpenEdit(true);
                  }}
                />
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => dispatch(deleteManager(record._id))}
                />
              </Space>
            ),
          },
        ]}
      />

      {/* ADD MODAL */}
      <Modal
        title="Add Manager"
        open={openAdd}
        onOk={handleAddManager}
        onCancel={() => setOpenAdd(false)}
        okText="Create"
      >
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        title="Edit Manager"
        open={openEdit}
        onOk={handleEditManager}
        onCancel={() => setOpenEdit(false)}
        okText="Update"
      >
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        title="View Manager"
        open={openView}
        onOk={() => setOpenView(false)}
        onCancel={() => setOpenView(false)}
        okText="Close"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Input value={form.name} readOnly style={{ marginBottom: 10 }} />
        <Input value={form.email} readOnly style={{ marginBottom: 10 }} />
        <Input value={form.role} readOnly />
      </Modal>
    </>
  );
}
