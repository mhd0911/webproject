import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  const location = useLocation();

  // Ẩn sidebar khi đang ở dashboard
  const hideSidebar = location.pathname === "/dashboard";

  return (
    <div className="flex bg-slate-100 min-h-screen">
      
      {/* Sidebar: chỉ hiển thị khi KHÔNG ở dashboard */}
      {!hideSidebar && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* Header luôn hiển thị (hoặc bạn muốn ẩn riêng thì nói mình biết) */}
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
