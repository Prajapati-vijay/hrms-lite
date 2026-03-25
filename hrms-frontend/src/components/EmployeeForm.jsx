import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("employees/", form);

      toast.success("Employee added successfully ✅");

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      refresh();
    } catch (err) {
      const errorMsg =
        err.response?.data?.email ||
        err.response?.data?.employee_id ||
        "Something went wrong";

      toast.error(errorMsg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="Employee ID"
          className="border p-2 rounded-lg"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        />
        <input
          placeholder="Full Name"
          className="border p-2 rounded-lg"
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          className="border p-2 rounded-lg"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          placeholder="Department"
          className="border p-2 rounded-lg"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Add Employee
      </button>
    </form>
  );
}

export default EmployeeForm;