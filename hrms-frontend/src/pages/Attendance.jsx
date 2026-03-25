import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import AttendanceForm from "../components/AttendanceForm";

function Attendance() {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch attendance
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get("attendance/");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await API.get("employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchEmployees();
  }, []);

  // Helper to get employee name
  const getEmployeeName = (id) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? emp.full_name : "Unknown";
  };

  // ✅ Filter Logic
  const filteredData = data.filter((item) => {
    if (!filterDate) return true;
    return item.date === filterDate;
  });

  const presentCountMap = {};

  data.forEach((item) => {
    if (item.status === "Present") {
      presentCountMap[item.employee] =
        (presentCountMap[item.employee] || 0) + 1;
    }
  });
  return (
    <Layout>
      {/* Attendance Form */}
      <AttendanceForm refresh={fetchData} />

      {/* Header + Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Attendance Records</h2>

        <div className="flex gap-2">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded-lg"
          />

          {/* Reset Button */}
          <button
            onClick={() => setFilterDate("")}
            className="bg-gray-200 px-3 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-gray-500">No records found</p>
      ) : (
        <div className="bg-white rounded-2xl shadow">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              {/* Employee Name */}
              <div className="flex flex-col">
                <span className="font-medium">
                  {getEmployeeName(item.employee)}
                </span>

                <span className="text-xs text-gray-500">
                  Present Days: {presentCountMap[item.employee] || 0}
                </span>
              </div>

              {/* Date */}
              <span>{item.date}</span>

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
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
