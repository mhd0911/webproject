// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import StockIn from "./pages/StockIn";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Routes>
      {/* Trang đăng nhập (ai cũng vào được) */}
      <Route path="/login" element={<Login />} />

      {/* Các route bên trong RequireAuth -> phải login mới vào được */}
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          {/* mặc định "/" chuyển về /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/stockin" element={<StockIn />} />
        </Route>
      </Route>

      {/* Nếu nhập link linh tinh -> về login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
