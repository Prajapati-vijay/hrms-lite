import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import { Toaster } from "react-hot-toast";

function App() {
  return (
      <>
      <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;