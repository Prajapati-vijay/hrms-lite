import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import EmployeeForm from "../components/EmployeeForm";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    const res = await API.get("employees/");
    setEmployees(res.data);
    setLoading(false);
  };

  const deleteEmployee = async (id) => {
    await API.delete(`employees/${id}/`);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Layout>
      <EmployeeForm refresh={fetchEmployees} />

      <h2 className="text-xl font-semibold mb-4">Employee List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <div className="bg-white rounded-2xl shadow">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="flex justify-between p-4 border-b"
            >
              <div>
                <p className="font-medium">ID: {emp.id}</p>
                <p className="font-medium">{emp.full_name}</p>
                <p className="text-sm text-gray-500">{emp.email}</p>
                <p className="text-sm text-gray-500">{emp.department}</p>
              </div>

              <button
                onClick={() => deleteEmployee(emp.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Employees;