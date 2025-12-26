import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, message } from "antd";
import axios from "../../services/api";

export default function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const employeeId = user?._id;

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/EmployeeHome/${employeeId}/summary`);
      setSummary(res.data.summary);
    } catch (err) {
      message.error(err?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) fetchSummary();
  }, [employeeId]);

  if (loading || !summary)
    return (
      <div
        style={{
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spin size="large" />
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Employee Dashboard</h2>

      <Row gutter={[16, 16]} style={{ marginTop: 15 }}>
        {/* Assigned */}
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card title="Assigned Tasks" bordered style={{ textAlign: "center" }}>
            <h1>{summary.assigned}</h1>
          </Card>
        </Col>

        {/* Pending */}
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card title="Pending Tasks" bordered style={{ textAlign: "center" }}>
            <h1>{summary.pending}</h1>
          </Card>
        </Col>

        {/* Submitted */}
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card title="Submitted Tasks" bordered style={{ textAlign: "center" }}>
            <h1>{summary.submitted}</h1>
          </Card>
        </Col>

        {/* Completed */}
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card title="Completed Tasks" bordered style={{ textAlign: "center" }}>
            <h1>{summary.completed}</h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
