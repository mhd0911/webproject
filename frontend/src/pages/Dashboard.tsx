// frontend/src/pages/Dashboard.tsx

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";

// Kiểu user an toàn: tất cả field đều optional để tránh lỗi TS
interface UserProfile {
  fullName?: string;
  username?: string;
  dateOfBirth?: string;
  phone?: string;
  address?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Lấy auth từ redux, dùng any để tránh vỡ type nếu slice khác nhau
  const auth = useSelector((state: RootState) => state.auth as any);
  const user: UserProfile | null = auth?.user || null;

  const [openProfile, setOpenProfile] = React.useState(false);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            POS Seller Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Theo dõi doanh thu, đơn hàng và khách hàng hôm nay.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Nút Cài đặt hệ thống */}
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 hover:shadow-md transition"
          >
            <span className="text-indigo-500 text-sm">⚙️</span>
            <span>Cài đặt hệ thống</span>
          </button>

          {/* Nút Xin chào, admin */}
          <button
            type="button"
            onClick={() => setOpenProfile(true)}
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 shadow-md hover:shadow-lg transition text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white font-bold text-lg shadow">
              {user?.fullName?.charAt(0).toUpperCase() ||
                user?.username?.charAt(0).toUpperCase() ||
                "A"}
            </div>

            <div className="text-left leading-tight">
              <div className="text-[11px] opacity-80">Xin chào,</div>
              <div className="text-sm font-semibold">
                {user?.username || "admin"}
              </div>
              <div className="text-[10px] text-emerald-300">
                Bạn đã đăng nhập hệ thống
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* HÀNG THẺ CHỨC NĂNG */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {/* Quản lý đơn hàng */}
        <button
          type="button"
          onClick={() => handleCardClick("/orders")}
          className="flex flex-col rounded-2xl bg-white p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-[1px] transition"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                📦
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Quản lý đơn hàng
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Xem, xử lý và cập nhật trạng thái đơn.
          </p>
        </button>

        {/* Quản lý sản phẩm */}
        <button
          type="button"
          onClick={() => handleCardClick("/products")}
          className="flex flex-col rounded-2xl bg-white p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-[1px] transition"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-500">
              🛒
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Quản lý sản phẩm
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Thêm / sửa tồn kho, giá, hình ảnh sản phẩm.
          </p>
        </button>

        {/* Thông tin khách hàng */}
        <button
          type="button"
          onClick={() => handleCardClick("/customers")}
          className="flex flex-col rounded-2xl bg-white p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-[1px] transition"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-500">
              👥
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Thông tin khách hàng
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Quản lý danh sách khách hàng và lịch sử mua.
          </p>
        </button>

        {/* Nhập hàng / tồn kho */}
        <button
          type="button"
          onClick={() => handleCardClick("/stock")}
          className="flex flex-col rounded-2xl bg-white p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-[1px] transition"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-500">
              📥
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Nhập hàng / tồn kho
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Cập nhật phiếu nhập, kiểm tra số lượng tồn.
          </p>
        </button>
      </div>

      {/* CHỈ SỐ HÔM NAY */}
      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        {/* Doanh thu hôm nay */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 text-xs font-medium text-slate-500">
            DOANH THU HÔM NAY
          </div>
          <div className="text-2xl font-semibold text-slate-800 mb-1">
            5.200.000 đ
          </div>
          <div className="text-xs text-emerald-500">+18% so với hôm qua</div>
        </div>

        {/* Đơn chờ xử lý */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 text-xs font-medium text-slate-500">
            ĐƠN CHỜ XỬ LÝ
          </div>
          <div className="text-2xl font-semibold text-slate-800 mb-1">
            12 đơn
          </div>
          <div className="text-xs text-slate-500">Cần duyệt & giao hàng</div>
        </div>

        {/* Sản phẩm sắp hết */}
        <button
          type="button"
          onClick={() => handleCardClick("/products?tab=low-stock")}
          className="rounded-2xl bg-white p-4 shadow-sm text-left hover:shadow-md hover:-translate-y-[1px] transition"
        >
          <div className="mb-3 text-xs font-medium text-slate-500">
            SẢN PHẨM SẮP HẾT
          </div>
          <div className="text-2xl font-semibold text-slate-800 mb-1">
            7 mặt hàng
          </div>
          <div className="text-xs text-amber-500">
            Nên nhập thêm trong 3 ngày tới
          </div>
        </button>
      </div>

      {/* Đơn hàng gần đây - demo tĩnh */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-800">
              Đơn hàng gần đây
            </div>
            <div className="text-xs text-slate-500">
              Danh sách một số đơn mới tạo và đang xử lý.
            </div>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="py-2 px-3 text-left font-medium text-slate-500">
                  Mã đơn
                </th>
                <th className="py-2 px-3 text-left font-medium text-slate-500">
                  Khách hàng
                </th>
                <th className="py-2 px-3 text-right font-medium text-slate-500">
                  Tổng tiền
                </th>
                <th className="py-2 px-3 text-center font-medium text-slate-500">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  code: "DH0015",
                  customer: "Nguyễn Văn A",
                  total: "1.250.000 đ",
                  status: "Chờ xử lý",
                  color: "bg-amber-100 text-amber-700",
                },
                {
                  code: "DH0016",
                  customer: "Trần Thị B",
                  total: "980.000 đ",
                  status: "Đang giao",
                  color: "bg-sky-100 text-sky-700",
                },
                {
                  code: "DH0017",
                  customer: "Lê Văn C",
                  total: "2.300.000 đ",
                  status: "Đã giao",
                  color: "bg-emerald-100 text-emerald-700",
                },
              ].map((row) => (
                <tr key={row.code} className="border-b last:border-0">
                  <td className="py-2 px-3 text-slate-700">{row.code}</td>
                  <td className="py-2 px-3 text-slate-700">{row.customer}</td>
                  <td className="py-2 px-3 text-right text-slate-700">
                    {row.total}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${row.color}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-[11px] text-slate-400">
            Dữ liệu demo — bạn có thể nối API thật sau.
          </div>
        </div>
      </div>

      {/* POPUP THÔNG TIN TÀI KHOẢN */}
      {openProfile && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="text-indigo-500 text-xl">👤</span>
                Thông tin tài khoản
              </h2>
              <button
                onClick={() => setOpenProfile(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md flex items-center justify-center text-3xl text-white font-bold">
                {user?.fullName?.charAt(0).toUpperCase() ||
                  user?.username?.charAt(0).toUpperCase() ||
                  "A"}
              </div>
              <div className="text-sm font-medium text-slate-700">
                {user?.fullName || user?.username || "admin"}
              </div>
              <div className="text-xs text-emerald-500 font-semibold">
                Đang đăng nhập
              </div>
            </div>

            {/* Info box */}
            <div className="rounded-xl border bg-slate-50 overflow-hidden shadow-sm">
              <div className="flex border-b">
                <div className="w-1/3 bg-slate-100 px-3 py-2 text-slate-500 text-sm flex items-center gap-1">
                  👤 Họ tên
                </div>
                <div className="w-2/3 px-3 py-2 text-sm">
                  {user?.fullName || "-"}
                </div>
              </div>

              <div className="flex border-b">
                <div className="w-1/3 bg-slate-100 px-3 py-2 text-slate-500 text-sm flex items-center gap-1">
                  🧩 Username
                </div>
                <div className="w-2/3 px-3 py-2 text-sm">
                  {user?.username || "-"}
                </div>
              </div>

              <div className="flex border-b">
                <div className="w-1/3 bg-slate-100 px-3 py-2 text-slate-500 text-sm flex items-center gap-1">
                  🎂 Ngày sinh
                </div>
                <div className="w-2/3 px-3 py-2 text-sm">
                  {user?.dateOfBirth || "-"}
                </div>
              </div>

              <div className="flex border-b">
                <div className="w-1/3 bg-slate-100 px-3 py-2 text-slate-500 text-sm flex items-center gap-1">
                  📞 SĐT
                </div>
                <div className="w-2/3 px-3 py-2 text-sm">
                  {user?.phone || "-"}
                </div>
              </div>

              <div className="flex">
                <div className="w-1/3 bg-slate-100 px-3 py-2 text-slate-500 text-sm flex items-center gap-1">
                  📍 Địa chỉ
                </div>
                <div className="w-2/3 px-3 py-2 text-sm">
                  {user?.address || "-"}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setOpenProfile(false)}
                className="px-4 py-2 rounded-lg border text-xs text-slate-600 hover:bg-slate-100"
              >
                Đóng
              </button>

              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 shadow"
              >
                Đăng xuất khỏi hệ thống
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
