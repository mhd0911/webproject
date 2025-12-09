import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store"; // 
import { loginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginThunk({ username, password }));

    if (loginThunk.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden flex">
        {/* Bên trái: giới thiệu */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-500 to-blue-500 text-white w-1/2">
          <div>
            <h1 className="text-2xl font-bold mb-3">POS Dashboard</h1>
            <p className="text-sm text-indigo-100">
              Đăng nhập để theo dõi doanh thu, đơn hàng và khách hàng.
            </p>
          </div>

          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                📊
              </span>
              <p>Theo dõi doanh thu theo ngày / tháng.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                📦
              </span>
              <p>Quản lý tồn kho, nhập hàng, đơn hàng.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                👥
              </span>
              <p>Quản lý khách hàng thân thiết, lịch sử mua hàng.</p>
            </div>
          </div>

          <p className="text-[11px] text-indigo-200">© 2025 POS Dashboard</p>
        </div>

        {/* Bên phải: form đăng nhập */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Đăng nhập
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Nhập tài khoản để truy cập hệ thống quản lý bán hàng.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                placeholder="VD: admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold py-2.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          {/* 👇 THÊM ĐOẠN NÀY: link sang đăng ký */}
          <div className="mt-4 text-center text-xs text-slate-500">
            <span>Chưa có tài khoản? </span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-indigo-500 font-semibold hover:underline"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
