import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const empRes = await API.get("employees/");
      const attRes = await API.get("attendance/");

      setEmployees(empRes.data);
      setAttendance(attRes.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // 📊 Metrics
  const totalEmployees = employees.length;

  const totalPresent = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const totalAbsent = attendance.filter(
    (a) => a.status === "Absent"
  ).length;

  const today = new Date().toISOString().split("T")[0];

  const todayAttendance = attendance.filter(
    (a) => a.date === today
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Total Employees" value={totalEmployees} />
        <Card title="Total Present" value={totalPresent} color="green" />
        <Card title="Total Absent" value={totalAbsent} color="red" />
        <Card title="Today's Records" value={todayAttendance.length} />
      </div>

      {/* 🔹 Today's Attendance Table */}
      <div className="bg-white rounded-2xl shadow">
        <div className="p-4 border-b font-semibold">
          Today's Attendance
        </div>

        {todayAttendance.length === 0 ? (
          <p className="p-4 text-gray-500">No attendance marked today</p>
        ) : (
          todayAttendance.map((item) => (
            <div
              key={item.id}
              className="flex justify-between p-4 border-b"
            >
              <span>{item.employee_name}</span>
              <span>{item.status}</span>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

// 🔹 Reusable Card Component
function Card({ title, value, color }) {
  const bg =
    color === "green"
      ? "bg-green-100"
      : color === "red"
      ? "bg-red-100"
      : "bg-gray-100";

  return (
    <div className={`${bg} p-6 rounded-2xl shadow`}>
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

export default Dashboard;