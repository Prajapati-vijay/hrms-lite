import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function AttendanceForm({ refresh }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  // Fetch employees for dropdown
  useEffect(() => {
    API.get("employees/").then((res) => setEmployees(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
  await API.post("attendance/", form);
  refresh();
  toast.success("Attendance marked successfully ✅");
} catch (err) {
  const message =
    err.response?.data?.message ||          // your custom message
    err.response?.data?.non_field_errors?.[0] ||  // default DRF error
    err.response?.data?.detail || 
    "Something went wrong ❌";

  toast.error(message);
}
  };

  return (
    <form className="bg-white p-6 rounded-2xl shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Mark Attendance</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Employee Dropdown */}
        <select
          className="border p-2 rounded-lg"
          onChange={(e) => setForm({ ...form, employee: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          max={new Date().toISOString().split("T")[0]}
          className="border p-2 rounded-lg"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* Status */}
        <select
          className="border p-2 rounded-lg"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        Submit
      </button>
    </form>
  );
}

export default AttendanceForm;