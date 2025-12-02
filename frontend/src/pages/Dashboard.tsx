import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Điều hướng tới trang đăng nhập
  const handleLogin = () => {
    navigate("/login"); // nếu login của bạn đang ở path "/", có thể đổi thành navigate("/")
  };

  // Điều hướng tới trang đăng ký
  const handleRegister = () => {
    navigate("/register"); // sau này bạn tạo thêm route /register
  };

  // Chuyển đổi dark / light mode (chỉ trong Dashboard)
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Lối tắt chức năng
  const handleCreateOrder = () => {
    navigate("/orders");
  };

  const handleManageCustomers = () => {
    navigate("/customers");
  };

  const handleManageProducts = () => {
    navigate("/products");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Thanh top */}
      <header
        className={`border-b ${
          isDarkMode ? "border-slate-700 bg-slate-900/70" : "border-slate-200 bg-white"
        } shadow-sm`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-xl text-white">
              POS
            </span>
            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <p className="text-xs text-slate-500">
                Tổng quan hệ thống quản lý bán hàng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Dark / Light */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition ${
                isDarkMode
                  ? "border-slate-600 bg-slate-800 hover:bg-slate-700"
                  : "border-slate-300 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <span>{isDarkMode ? "🌙" : "☀️"}</span>
              <span>{isDarkMode ? "Dark mode" : "Light mode"}</span>
            </button>

            {/* Nút Đăng nhập / Đăng ký */}
            <button
              onClick={handleLogin}
              className="rounded-full border border-indigo-500 px-4 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Đăng nhập
            </button>
            <button
              onClick={handleRegister}
              className="rounded-full bg-indigo-500 px-4 py-1 text-xs font-medium text-white hover:bg-indigo-600"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="mx-auto max-w-6xl px-6 py-6">
        {/* Khối chào + tổng quan hôm nay */}
        <section className="mb-6 grid gap-4 md:grid-cols-[2fr,1fr]">
          <div
            className={`rounded-2xl border ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/70"
                : "border-slate-200 bg-white"
            } p-5 shadow-sm`}
          >
            <h2 className="text-xl font-semibold">Xin chào 👋</h2>
            <p className="mt-1 text-sm text-slate-500">
              Đây là tổng quan nhanh về tình hình bán hàng hôm nay.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div
                className={`rounded-xl border p-3 text-sm ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-900/40"
                    : "border-indigo-100 bg-indigo-50"
                }`}
              >
                <p className="text-xs text-slate-500">Doanh thu hôm nay</p>
                <p className="mt-1 text-lg font-semibold text-indigo-600">
                  12.500.000₫
                </p>
                <p className="mt-1 text-xs text-emerald-500">▲ +18% so với hôm qua</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
                <p className="text-xs text-slate-500">Đơn hàng</p>
                <p className="mt-1 text-lg font-semibold">32</p>
                <p className="mt-1 text-xs text-slate-400">
                  5 đơn đang chờ xử lý
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
                <p className="text-xs text-slate-500">Khách hàng mới</p>
                <p className="mt-1 text-lg font-semibold">7</p>
                <p className="mt-1 text-xs text-slate-400">Trong 24h gần nhất</p>
              </div>
            </div>
          </div>

          {/* Lối tắt nhanh */}
          <div
            className={`flex flex-col justify-between gap-3 rounded-2xl border ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/70"
                : "border-slate-200 bg-white"
            } p-4 shadow-sm`}
          >
            <div>
              <p className="text-sm font-semibold">Lối tắt nhanh</p>
              <p className="mt-1 text-xs text-slate-500">
                Truy cập nhanh các chức năng thường dùng.
              </p>
            </div>

            <div className="mt-2 space-y-2 text-sm">
              <button
                onClick={handleCreateOrder}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700/60"
              >
                ➕ Tạo đơn hàng mới
              </button>
              <button
                onClick={handleManageCustomers}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700/60"
              >
                👥 Quản lý khách hàng
              </button>
              <button
                onClick={handleManageProducts}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700/60"
              >
                📦 Quản lý sản phẩm
              </button>
            </div>
          </div>
        </section>

        {/* Hai cột: đơn gần đây + tồn kho */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Đơn hàng gần đây */}
          <div
            className={`rounded-2xl border ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/70"
                : "border-slate-200 bg-white"
            } p-4 shadow-sm`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Đơn hàng gần đây</h3>
              <button
                onClick={handleCreateOrder}
                className="text-xs text-indigo-500 hover:underline"
              >
                Xem tất cả
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
                <div>
                  <p className="font-medium">#DH0001</p>
                  <p className="text-xs text-slate-500">Nguyễn Văn A • 2 sản phẩm</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">1.250.000₫</p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600 dark:bg-emerald-900/40">
                    Hoàn thành
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
                <div>
                  <p className="font-medium">#DH0002</p>
                  <p className="text-xs text-slate-500">Trần Thị B • 1 sản phẩm</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">350.000₫</p>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-600 dark:bg-amber-900/40">
                    Đang xử lý
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tồn kho cần chú ý */}
          <div
            className={`rounded-2xl border ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/70"
                : "border-slate-200 bg-white"
            } p-4 shadow-sm`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Sản phẩm sắp hết hàng</h3>
              <button
                onClick={handleManageProducts}
                className="text-xs text-indigo-500 hover:underline"
              >
                Quản lý kho
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
                <div>
                  <p className="font-medium">Áo thun basic trắng</p>
                  <p className="text-xs text-slate-500">Mã: AT001</p>
                </div>
                <p className="text-xs font-semibold text-amber-500">Còn 5</p>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
                <div>
                  <p className="font-medium">Quần jean xanh</p>
                  <p className="text-xs text-slate-500">Mã: QJ023</p>
                </div>
                <p className="text-xs font-semibold text-rose-500">Còn 2</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
