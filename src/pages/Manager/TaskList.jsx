import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import axios from "../../services/api";

export default function ManagerViewTasks() {
  const user = JSON.parse(localStorage.getItem("user"));
  const managerId = user?._id;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/ManagerTaskView/${managerId}/view-tasks`);

      // Convert employees → rows
      const flat = res.data.flatMap(emp =>
        (emp.tasks || []).map(task => ({
          key: task._id,
          employeeName: emp.name,
          employeeEmail: emp.email,
          title: task.title,
          taskUrl: task.taskUrl,
          submittedUrl: task.submittedUrl,
          submissionDate: task.submissionDate,
          deadline: task.deadline,
        }))
      );

      setRows(flat);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    {
      title: "Employee",
      dataIndex: "employeeName",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Task URL (Given)",
      dataIndex: "taskUrl",
      render: url =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ) : "-",
    },
    {
      title: "Submitted URL",
      dataIndex: "submittedUrl",
      render: url =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ) : (
          <Tag color="red">Not Submitted</Tag>
        ),
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      render: date =>
        date ? new Date(date).toLocaleString() : "-",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      render: date =>
        date ? new Date(date).toLocaleString() : "-",
    },
  ];

  return (
    <Table
      loading={loading}
      dataSource={rows}
      columns={columns}
      bordered
    />
  );
}
