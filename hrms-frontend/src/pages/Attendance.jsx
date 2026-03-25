import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import AttendanceForm from "../components/AttendanceForm";

function Attendance() {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    const res = await API.get("attendance/");
    setData(res.data);
  };

  // Fetch employees to map names
  const fetchEmployees = async () => {
    const res = await API.get("employees/");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchData();
    fetchEmployees();
  }, []);

  // Helper to get employee name
  const getEmployeeName = (id) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? emp.full_name : id;
  };

  return (
    <Layout>
      {/* Form */}
      <AttendanceForm refresh={fetchData} />

      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>

      {data.length === 0 ? (
        <p>No records found</p>
      ) : (
        <div className="bg-white rounded-2xl shadow">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex justify-between p-4 border-b"
            >
              <span className="font-medium">
                {getEmployeeName(item.employee)}
              </span>
              <span>{item.date}</span>
              <span
                className={`px-2 py-1 rounded ${
                  item.status === "Present"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Attendance;