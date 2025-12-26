import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Popconfirm,
  Modal,
  message,
  Row,
  Col,
} from "antd";
import api from "../../services/api";

export default function EmployeeTasks() {
  const user = JSON.parse(localStorage.getItem("user"));
  const employeeId = user?._id;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewTask, setViewTask] = useState(null);

  const [fileMap, setFileMap] = useState({});

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/Emploeetasks/${employeeId}`);
      setTasks(res.data);
    } catch {
      message.error("Failed to load tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const submitTask = async (taskId) => {
    const file = fileMap[taskId];
    if (!file) return message.warning("Please select a file to upload");

    try {
      const fd = new FormData();
      fd.append("file", file);

      await api.put(
        `/Emploeetasks/${employeeId}/${taskId}/submit`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      message.success("Task submitted successfully");
      fetchTasks();
      setFileMap((p) => ({ ...p, [taskId]: null }));
    } catch (e) {
      message.error(e?.response?.data?.message || "Submit failed");
    }
  };

  const resetTask = async (taskId) => {
    try {
      await api.put(`/Emploeetasks/${employeeId}/${taskId}/reset`);
      message.success("Submission cleared");
      setFileMap((p) => ({ ...p, [taskId]: null }));
      fetchTasks();
    } catch {
      message.error("Reset failed");
    }
  };

  const columns = [
    {
      title: "Manager",
      dataIndex: "managerName",
      responsive: ["sm"],
    },
    {
      title: "Title",
      dataIndex: "title",
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      render: (d) => (d ? new Date(d).toLocaleDateString() : "No Deadline"),
      responsive: ["sm"],
    },
    {
      title: "View",
      render: (_, record) => (
        <Button type="link" onClick={() => setViewTask(record)}>
          View
        </Button>
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },

    // ⭐ Responsive file upload column
    {
      title: "Upload Task File",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 576 ? "column" : "row",
            gap: 8,
          }}
        >
          <input
            type="file"
            disabled={record.status === "Submitted"}
            onChange={(e) =>
              setFileMap({
                ...fileMap,
                [record._id]: e.target.files[0],
              })
            }
          />

          <Button
            type="primary"
            disabled={record.status === "Submitted"}
            onClick={() => submitTask(record._id)}
          >
            Upload & Submit
          </Button>
        </div>
      ),
      responsive: ["xs", "sm", "md", "lg"],
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
      responsive: ["xs", "sm", "md", "lg"],
    },

    {
      title: "Reset",
      render: (_, record) =>
        record.status === "Submitted" ? (
          <Popconfirm
            title="Clear submitted file & move back to Pending?"
            onConfirm={() => resetTask(record._id)}
          >
            <Button danger>Reset</Button>
          </Popconfirm>
        ) : (
          <Button disabled>Reset</Button>
        ),
      responsive: ["sm", "md", "lg"],
    },
  ];

  return (
    <>
      <Row style={{ padding: 10 }}>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={tasks}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 800 }}   // ⭐ Enables mobile scrolling
          />
        </Col>
      </Row>

      {/* View Modal */}
      <Modal
        open={!!viewTask}
        title={viewTask?.title}
        onCancel={() => setViewTask(null)}
        footer={null}
        centered
      >
        <p>
          <strong>Task File:</strong>
          <br />
          <a href={viewTask?.taskUrl} target="_blank" rel="noreferrer">
            View Task
          </a>
        </p>

        {viewTask?.submittedUrl && (
          <p>
            <strong>Your Submitted File:</strong>
            <br />
            <a
              href={viewTask?.submittedUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Submission
            </a>
          </p>
        )}
      </Modal>
    </>
  );
}
