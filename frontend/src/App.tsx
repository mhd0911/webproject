import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";   // 👈 THÊM DÒNG NÀY
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import StockIn from "./pages/StockIn";

function App() {
  return (
    <Routes>
      {/* Mở web vào dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Register */}
      <Route path="/register" element={<Register />} />

      {/* Các trang nằm trong layout chính */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/stockin" element={<StockIn />} />
      </Route>
    </Routes>
  );
}

export default App;
