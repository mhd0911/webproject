import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store"; // 👈 IMPORT DẠNG TYPE
import { loginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(loginThunk({ username, password }));

    // Nếu login thành công thì chuyển sang /dashboard
    if (loginThunk.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
    // nếu fail thì error đã được lưu trong state.auth.error và hiển thị dưới form
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl overflow-hidden flex">
        {/* Khối bên trái (giữ UI cũ) */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-500 to-blue-500 text-white w-1/2">
          <div>
            <h1 className="text-2xl font-bold mb-3">POS Dashboard</h1>
            <p className="text-sm text-indigo-100">
              Đăng nhập để theo dõi doanh thu, đơn hàng và khách hàng.
            </p>
          </div>

          <ul className="space-y-3 text-sm mt-6">
            <li className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">
                📊
              </span>
              Theo dõi doanh thu theo ngày / tháng.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">
                📦
              </span>
              Quản lý tồn kho, nhập hàng, đơn hàng.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">
                👥
              </span>
              Quản lý khách hàng thân thiết, lịch sử mua hàng.
            </li>
          </ul>

          <p className="text-[11px] text-indigo-100/80 mt-4">
            © 2025 POS Dashboard
          </p>
        </div>

        {/* Khối bên phải: form đăng nhập (giữ UI cũ) */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-slate-800">Đăng nhập</h2>
          <p className="text-sm text-slate-500 mb-6">
            Nhập tài khoản để truy cập hệ thống quản lý bán hàng.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          {/* Demo account info giữ nguyên nếu bạn đang dùng */}
          <div className="mt-6 rounded-lg bg-slate-50 border border-slate-100 p-3 text-[11px] text-slate-500">
            <div className="font-semibold mb-1 text-slate-600">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
