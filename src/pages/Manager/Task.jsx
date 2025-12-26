import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Select,
  Form,
  Input,
  DatePicker,
  message,
  Popconfirm,
  Row,
  Col,
} from "antd";
import axios from "../../services/api"; // axios instance

export default function ManagerTasks() {
  const user = JSON.parse(localStorage.getItem("user"));
  const managerId = user?._id;

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  // ================= FETCH EMPLOYEES (With Tasks) =================
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/managertask/employees`, {
        params: { managerId },
      });

      setEmployees(res.data ?? []);
    } catch (err) {
      console.error(err);
      message.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!managerId) return;
    fetchEmployees();
  }, [managerId]);

  // ================= ASSIGN TASK =================
  const onFinish = async (values) => {
    if (!file) return message.error("Please select a file");

    try {
      const formData = new FormData();
      formData.append("employeeId", values.employeeId);
      formData.append("title", values.title);
      formData.append(
        "deadline",
        values.deadline ? values.deadline.toISOString() : ""
      );
      formData.append("file", file);

      await axios.post("/managertask/tasks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Task assigned successfully");
      form.resetFields();
      setFile(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      message.error("Failed to assign task");
    }
  };

  // ================= DELETE TASK =================
  const handleDelete = async (employeeId, taskId) => {
    try {
      await axios.delete(`/managertask/tasks/${employeeId}/${taskId}`);
      message.success("Task deleted");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete task");
    }
  };

  // ================= TABLE DATA =================
  const dataSource = (employees ?? []).flatMap((emp) =>
    (emp.tasks ?? []).map((task) => ({
      ...task,
      employeeName: emp.name,
      employeeId: emp._id,
    }))
  );

  // ================= TABLE COLUMNS =================
  const columns = [
    { title: "Employee", dataIndex: "employeeName" },
    { title: "Title", dataIndex: "title" },

    {
      title: "Task Link",
      dataIndex: "taskUrl",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noreferrer">
            View
          </a>
        ) : (
          "—"
        ),
    },

    {
      title: "Deadline",
      dataIndex: "deadline",
      render: (d) => (d ? new Date(d).toLocaleDateString() : "—"),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (s) => s || "Pending",
    },

    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record.employeeId, record._id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={20} lg={16} xl={14}>
          <h2>Assign Task</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "100%", marginBottom: 30 }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="employeeId"
                  label="Employee"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={(employees ?? []).map((e) => ({
                      label: e.name,
                      value: e._id,
                    }))}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="title"
                  label="Task Title"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="file"
                  label="Upload File"
                  rules={[{ required: true }]}
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*,video/*,application/pdf,audio/*"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <Form.Item name="deadline" label="Deadline">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Button type="primary" htmlType="submit" block>
                  Assign Task
                </Button>
              </Col>
            </Row>
          </Form>

          <h2>Assigned Tasks</h2>

          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={(record) => record._id}
            loading={loading}
            scroll={{ x: "max-content" }}
          />
        </Col>
      </Row>
    </div>
  );
}
