import { NavLink } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex gap-6">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-blue-600"
              : "font-semibold text-gray-600"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-blue-600"
              : "font-semibold text-gray-600"
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-blue-600"
              : "font-semibold text-gray-600"
          }
        >
          Attendance
        </NavLink>

      </nav>

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}

export default Layout;