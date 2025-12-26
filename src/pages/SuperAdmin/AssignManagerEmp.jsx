import React, { useEffect, useState } from "react";
import {
  Card,
  Select,
  Checkbox,
  Button,
  Spin,
  Typography,
  List,
  Space,
  message
} from "antd";
import api from "../../services/api";

const { Title, Text } = Typography;
const { Option } = Select;

export default function AssignManagerEmp() {
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [managerList, setManagerList] = useState([]);

  const loadManagerList = async () => {
    const res = await api.get("/superAdminManEmp/managers-with-employees");
    setManagerList(res.data);
  };

  useEffect(() => {
    loadManagers();
    loadEmployees();
    loadManagerList();
  }, []);

  const loadManagers = async () => {
    const res = await api.get("/superAdminManEmp/managers");
    setManagers(res.data);
  };

  const loadEmployees = async () => {
    const res = await api.get("/superAdminManEmp/employees");
    setEmployees(res.data);
  };

  const toggleEmployee = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const unassignEmployee = async (managerId, employeeId) => {
    try {
      await api.put("/superAdminManEmp/unassign-employee", {
        managerId,
        employeeId
      });

      message.success("Employee removed from manager");

      loadManagerList();
      loadEmployees();
    } catch (err) {
      message.error("Error removing employee");
    }
  };

  const handleAssign = async () => {
    if (!selectedManager || selectedEmployees.length === 0) {
      return message.warning(
        "Please select a Manager and at least one Employee"
      );
    }

    try {
      setLoading(true);

      await api.put("/superAdminManEmp/assign-manager", {
        managerId: selectedManager,
        employeeIds: selectedEmployees
      });

      message.success("Manager assigned successfully");

      setSelectedEmployees([]);
      setSelectedManager("");

      loadEmployees();
      loadManagerList(); // refresh UI
    } catch (err) {
      message.error(err?.response?.data?.msg || "Error assigning");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ---------- ASSIGN UI ---------- */}
      <Card
        style={{ maxWidth: 700, margin: "30px auto", borderRadius: 12 }}
        bordered
      >
        <Title level={3}>Assign Manager to Employees</Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Text strong>Select Manager</Text>

            <Select
              placeholder="Select Manager"
              value={selectedManager || undefined}
              style={{ width: "100%", marginTop: 8 }}
              onChange={setSelectedManager}
            >
              {managers.map((m) => (
                <Option key={m._id} value={m._id}>
                  {m.name} — {m.email}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <Text strong>Select Employees</Text>

            {employees.length === 0 ? (
              <Spin />
            ) : (
              <List
                bordered
                style={{ marginTop: 8, borderRadius: 8 }}
                dataSource={employees}
                renderItem={(emp) => (
                  <List.Item>
                    <Checkbox
                      checked={selectedEmployees.includes(emp._id)}
                      onChange={() => toggleEmployee(emp._id)}
                    >
                      {emp.name} — {emp.email}
                    </Checkbox>
                  </List.Item>
                )}
              />
            )}
          </div>

          <Button
            type="primary"
            block
            size="large"
            loading={loading}
            onClick={handleAssign}
            style={{ borderRadius: 8 }}
          >
            Assign Manager
          </Button>
        </Space>
      </Card>

      {/* ---------- MANAGER EMPLOYEE VIEW ---------- */}
      <Card style={{ maxWidth: 900, margin: "20px auto", borderRadius: 12 }}>
        <Title level={4}>Managers & Assigned Employees</Title>

        {managerList.map((m) => (
          <Card
            key={m._id}
            title={`${m.name} — ${m.email}`}
            style={{ marginBottom: 15, borderRadius: 10 }}
          >
            <Text strong>Total Employees: {m.employees.length}</Text>

            {m.employees.length === 0 ? (
              <p style={{ color: "gray" }}>No Employees Assigned</p>
            ) : (
              <List
                dataSource={m.employees}
                renderItem={(emp) => (
                  <List.Item
                    actions={[
                      <Button
                        danger
                        onClick={() => unassignEmployee(m._id, emp._id)}
                      >
                        Remove
                      </Button>
                    ]}
                  >
                    {emp.name} — {emp.email}
                  </List.Item>
                )}
              />
            )}
          </Card>
        ))}
      </Card>
    </>
  );
}
