import { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import api from "../../services/api";

export default function SuperAdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/superAdminTask/tasks");
      setTasks(res.data);
    } catch (e) {
      message.error("Failed to load tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    {
      title: "Manager",
      dataIndex: "managerName",
      render: (v) =>
        v === "Not Assigned" ? <Tag color="red">Not Assigned</Tag> : v || "-",
    },
    {
      title: "Employee",
      dataIndex: "employeeName",
      render: (v) => v || "-",
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (v) => v || <Tag color="red">Not Assigned</Tag>,
    },
    {
      title: "Task URL",
      dataIndex: "taskUrl",
      render: (u) =>
        u ? (
          <a href={u} target="_blank" rel="noreferrer">
            Open
          </a>
        ) : (
          <Tag color="red">Not Assigned</Tag>
        ),
    },
    {
      title: "Submitted URL",
      dataIndex: "submittedUrl",
      render: (u) =>
        u ? (
          <a href={u} target="_blank" rel="noreferrer">
            Open
          </a>
        ) : (
          <Tag color="red">Not Submitted</Tag>
        ),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      render: (d) => (d ? new Date(d).toLocaleDateString() :<Tag color="red">Not Assigned</Tag>),
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      render: (d) =>
        d ? new Date(d).toLocaleDateString() : <Tag color="orange">Pending</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) =>
        s === "Submitted" ? (
          <Tag color="green">Submitted</Tag>
        ) : s === "Completed" ? (
          <Tag color="blue">Completed</Tag>
        ) : s === "In Progress" ? (
          <Tag color="orange">In Progress</Tag>
        ) : (
          <Tag color="red">Pending</Tag>
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey={(r) => r.taskId || r.employeeId} // fallback to employeeId if no task
      loading={loading}
      pagination={{ pageSize: 8 }}
    />
  );
}
