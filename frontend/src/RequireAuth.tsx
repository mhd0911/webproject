// src/RequireAuth.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

const RequireAuth = () => {
  // 👉 DÙNG token trong auth để kiểm tra đã đăng nhập
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!token; // true nếu có token, false nếu null/undefined/""

  const location = useLocation();

  if (!isAuthenticated) {
    // Chưa login -> chuyển về trang đăng nhập
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Đã login -> render các route con
  return <Outlet />;
};

export default RequireAuth;
