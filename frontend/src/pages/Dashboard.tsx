import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../hooks/useTheme";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();

  const [showSettings, setShowSettings] = useState(false);
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);

  // Lấy thông tin user từ redux
  const auth = useSelector((state: any) => state.auth);
  const username =
    auth?.user?.username || auth?.username || "Khách";
  const isLoggedIn =
    auth?.isAuthenticated || !!auth?.token || !!auth?.user;

  const stats = [
    {
      label: "Doanh thu hôm nay",
      value: "5.200.000 đ",
      sub: "+18% so với hôm qua",
    },
    {
      label: "Đơn chờ xử lý",
      value: "12 đơn",
      sub: "Cần duyệt & giao hàng",
    },
    {
      label: "Đơn đã giao",
      value: "35 đơn",
      sub: "Trong 7 ngày gần đây",
    },
    {
      label: "Sản phẩm sắp hết",
      value: "7 mặt hàng",
      sub: "Nên nhập thêm trong 3 ngày",
    },
  ];

  const recentOrders = [
    {
      code: "DH0015",
      customer: "Nguyễn Văn A",
      total: "1.250.000 đ",
      status: "Chờ xử lý",
      badgeClass:
        "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-200 dark:border-orange-500/40",
    },
    {
      code: "DH0016",
      customer: "Trần Thị B",
      total: "980.000 đ",
      status: "Đang giao",
      badgeClass:
        "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:border-blue-500/40",
    },
    {
      code: "DH0017",
      customer: "Lê Văn C",
      total: "2.300.000 đ",
      status: "Đã giao",
      badgeClass:
        "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/40",
    },
  ];

  // Nếu chưa đăng nhập, khi ấn các nút chức năng sẽ chuyển sang /login
  const goTo = (path: string) => () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(path);
  };

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* TOP BAR */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-medium text-orange-600 dark:bg-orange-500/10 dark:text-orange-200">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              POS Seller Dashboard
            </div>
            <h1 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
              Tổng quan bán hàng hôm nay
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Theo dõi doanh thu, đơn hàng và tình trạng kho.
            </p>
          </div>

          {/* Góc phải: thông tin user + nút cài đặt */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500 text-xs font-semibold text-white">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Xin chào, {username}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isLoggedIn ? "Bạn đã đăng nhập hệ thống" : "Bạn chưa đăng nhập"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span>⚙</span>
              <span>Cài đặt hệ thống</span>
            </button>
          </div>
        </div>

        {/* Banner nhắc nếu chưa đăng nhập */}
        {!isLoggedIn && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 dark:border-amber-500/50 dark:bg-amber-500/10 dark:text-amber-100">
            <p className="font-semibold">Bạn chưa đăng nhập.</p>
            <p>
              Một số chức năng (Đơn hàng, Kho, Khách hàng, Cài đặt nâng cao) sẽ
              yêu cầu đăng nhập. Vui lòng{" "}
              <button
                className="underline font-semibold"
                onClick={() => navigate("/login")}
              >
                vào trang Đăng nhập
              </button>{" "}
              để sử dụng đầy đủ.
            </p>
          </div>
        )}

        {/* QUICK ACTIONS */}
        <section className="grid gap-3 md:grid-cols-4">
          <button
            onClick={goTo("/orders")}
            className="flex flex-col items-start gap-1 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white px-4 py-3 text-left text-xs shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-orange-500/40 dark:from-orange-500/10 dark:to-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 text-lg text-white shadow">
              🧾
            </span>
            <span className="mt-1 text-sm font-semibold text-orange-600 dark:text-orange-200">
              Quản lý đơn hàng
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Xem, xử lý và cập nhật trạng thái đơn.
            </span>
          </button>

          <button
            onClick={goTo("/products")}
            className="flex flex-col items-start gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-xs shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500 text-lg text-white shadow">
              📦
            </span>
            <span className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Quản lý sản phẩm
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Thêm / sửa giá, tồn kho, hình ảnh.
            </span>
          </button>

          {/* NÚT THÔNG TIN KHÁCH HÀNG -> MỞ BẢNG RIÊNG */}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                navigate("/login");
              } else {
                setShowCustomerInfo(true);
              }
            }}
            className="flex flex-col items-start gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-xs shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-lg text-white shadow">
              👥
            </span>
            <span className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Thông tin khách hàng
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Xem thông tin cá nhân và đăng xuất tài khoản.
            </span>
          </button>

          <button
            onClick={goTo("/stockin")}
            className="flex flex-col items-start gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-xs shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-lg text-white shadow">
              📥
            </span>
            <span className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Nhập hàng / tồn kho
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Cập nhật phiếu nhập và số lượng tồn.
            </span>
          </button>
        </section>

        {/* STATS */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-orange-500 dark:text-orange-300">
                {item.value}
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                {item.sub}
              </p>
            </div>
          ))}
        </section>

        {/* RECENT ORDERS TABLE */}
        <section>
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-100 px-5 py-3 dark:border-slate-800">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Đơn hàng gần đây
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Danh sách một số đơn mới tạo và đang xử lý.
              </p>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="min-w-full text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/70">
                  <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    <th className="px-5 py-2">Mã đơn</th>
                    <th className="px-5 py-2">Khách hàng</th>
                    <th className="px-5 py-2 text-right">Tổng tiền</th>
                    <th className="px-5 py-2 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.code}
                      className="text-slate-700 dark:text-slate-200"
                    >
                      <td className="px-5 py-2">{order.code}</td>
                      <td className="px-5 py-2">{order.customer}</td>
                      <td className="px-5 py-2 text-right">{order.total}</td>
                      <td className="px-5 py-2 text-center">
                        <span
                          className={
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] " +
                            order.badgeClass
                          }
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-500">
              Dữ liệu demo — bạn có thể nối API thật sau.
            </div>
          </div>
        </section>
      </div>

      {/* SETTINGS MODAL (TRUNG TÂM MÀN HÌNH) */}
      {showSettings && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Cài đặt hệ thống
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tùy chỉnh giao diện và một số cấu hình cơ bản.
                </p>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="divide-y divide-slate-100 text-xs dark:divide-slate-800">
              {/* Theme toggle */}
              <div className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    Chế độ giao diện
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Bật tắt Dark / Light mode cho toàn hệ thống.
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isDark ? "bg-yellow-300" : "bg-slate-700"
                    }`}
                  />
                  {isDark ? "Đang dùng Dark mode" : "Đang dùng Light mode"}
                </button>
              </div>

              {/* Language / currency */}
              <div className="px-5 py-3">
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  Ngôn ngữ & đơn vị tiền tệ
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Hiện tại: Tiếng Việt / VNĐ (demo).
                </p>
              </div>

              {/* Access */}
              <div className="px-5 py-3">
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  Quyền truy cập
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isLoggedIn ? (
                    <>
                      Bạn đang đăng nhập với tài khoản{" "}
                      <span className="font-semibold">{username}</span>.  
                      Tất cả chức năng quản lý đã được mở khóa.
                    </>
                  ) : (
                    <>
                      Bạn chưa đăng nhập.  
                      Một số chức năng (đơn hàng, kho, khách hàng, v.v.) sẽ bị hạn chế
                      cho đến khi bạn đăng nhập.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-3 text-[11px] dark:border-slate-800">
              <button
                onClick={() => setShowSettings(false)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER INFO MODAL - BẢNG RIÊNG Ở GIỮA MÀN HÌNH */}
      {showCustomerInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-slate-800">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Thông tin khách hàng
              </h2>
              <button
                onClick={() => setShowCustomerInfo(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Body: BẢNG THÔNG TIN */}
            <div className="px-5 py-4 text-xs">
              {/* Avatar + tên */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Tài khoản đang sử dụng
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {username}
                  </p>
                  <p className="text-[11px] text-green-600 dark:text-green-300">
                    {isLoggedIn ? "Trạng thái: Đang đăng nhập" : "Chưa đăng nhập"}
                  </p>
                </div>
              </div>

              {/* Bảng info */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60">
                <table className="w-full text-[11px]">
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="w-32 px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">
                        Họ và tên
                      </td>
                      <td className="px-3 py-2 text-slate-700 dark:text-slate-100">
                        Nguyễn Văn A {/* demo, sau này bạn map từ data thật */}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">
                        Ngày sinh
                      </td>
                      <td className="px-3 py-2 text-slate-700 dark:text-slate-100">
                        01/01/2000
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">
                        Giới tính
                      </td>
                      <td className="px-3 py-2 text-slate-700 dark:text-slate-100">
                        Nam
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">
                        Số điện thoại
                      </td>
                      <td className="px-3 py-2 text-slate-700 dark:text-slate-100">
                        0901 234 567
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">
                        Địa chỉ
                      </td>
                      <td className="px-3 py-2 text-slate-700 dark:text-slate-100">
                        123, Đường ABC, Quận 1, TP. Hồ Chí Minh
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer: NÚT ĐĂNG XUẤT Ở CUỐI BẢNG */}
            <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-[11px] dark:border-slate-800">
              <button
                onClick={() => setShowCustomerInfo(false)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Đóng
              </button>

              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-red-600"
              >
                Đăng xuất khỏi hệ thống
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
