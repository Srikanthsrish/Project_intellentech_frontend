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
  message,
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
  fetchEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} from '../../features/employee/employeeSlice';

const { Text } = Typography;
const { Option } = Select;

export default function EmployeeTable() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.employee);

  const [statusFilter, setStatusFilter] = useState('All');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees =
    statusFilter === 'All'
      ? list
      : list.filter((e) => e.status === statusFilter);

  /* ================= ADD ================= */
  const handleAddEmployee = async () => {
    if (!form.name || !form.email || !form.password) {
      message.warning('Please fill all fields');
      return;
    }

    try {
      await dispatch(addEmployee(form)).unwrap();
      setOpenAdd(false);
      setForm({ name: '', email: '', password: '', role: 'Employee' });
      dispatch(fetchEmployees());
      message.success('Employee added successfully');
    } catch (err) {
      message.error(err || 'Failed to add employee');
    }
  };

  /* ================= EDIT ================= */
  const handleEditEmployee = async () => {
    if (!form.name || !form.email) {
      message.warning('Please fill all fields');
      return;
    }

    try {
      await dispatch(updateEmployee({ id: editId, data: form })).unwrap();
      setOpenEdit(false);
      setForm({ name: '', email: '', password: '', role: 'Employee' });
      setEditId(null);
      dispatch(fetchEmployees());
      message.success('Employee updated successfully');
    } catch (err) {
      message.error(err || 'Failed to update employee');
    }
  };

  /* ================= LOADER ================= */
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

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      responsive: ['md', 'lg'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (_, record) => (
        <Space wrap>
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
            onClick={() => dispatch(deleteEmployee(record._id))}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
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

        {/* Row 2 – Count */}
        <Col xs={24} sm={12}>
          <Text strong>
            Total Employees: {filteredEmployees.length}
          </Text>
        </Col>

        {/* Row 3 – Add Button */}
        <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            block={window.innerWidth < 576}
            onClick={() => setOpenAdd(true)}
          >
            Add Employee
          </Button>
        </Col>
      </Row>

      {/* ================= TABLE ================= */}
      <Table
        rowKey="_id"
        dataSource={filteredEmployees}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <p><strong>Email:</strong> {record.email}</p>
              <p>
                <strong>Status:</strong>{' '}
                <Tag color={record.status === 'Active' ? 'green' : 'red'}>
                  {record.status}
                </Tag>
              </p>
            </div>
          ),
          rowExpandable: () => window.innerWidth < 768,
        }}
      />

      {/* ================= ADD MODAL ================= */}
      <Modal
        title="Add Employee"
        open={openAdd}
        onOk={handleAddEmployee}
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

      {/* ================= EDIT MODAL ================= */}
      <Modal
        title="Edit Employee"
        open={openEdit}
        onOk={handleEditEmployee}
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

      {/* ================= VIEW MODAL ================= */}
      <Modal
        title="View Employee"
        open={openView}
        onOk={() => setOpenView(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Input value={form.name} readOnly style={{ marginBottom: 10 }} />
        <Input value={form.email} readOnly style={{ marginBottom: 10 }} />
        <Input value={form.role} readOnly />
      </Modal>
    </>
  );
}
