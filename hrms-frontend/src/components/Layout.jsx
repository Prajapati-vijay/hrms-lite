import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">HRMS Lite</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-600">Employees</Link>
          <Link to="/attendance" className="hover:text-blue-600">
            Attendance
          </Link>
        </div>
      </nav>

      <div className="p-6">{children}</div>
    </div>
  );
}

export default Layout;