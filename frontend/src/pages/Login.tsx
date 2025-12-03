import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // DEMO: login cứng
    if (username === "admin" && password === "123456") {
      dispatch(
        loginSuccess({
          username,
          token: "fake-jwt-token",
        })
      );
      navigate("/dashboard");
    } else {
      setError("Sai username hoặc mật khẩu");
    }
  };

  const handleGoRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="mx-4 grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        {/* BÊN TRÁI – INTRO */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-500 p-8 text-white md:flex">
          <div>
            <h1 className="text-2xl font-bold">POS Dashboard</h1>
            <p className="mt-2 text-sm text-indigo-100">
              Hệ thống quản lý bán hàng, khách hàng, sản phẩm và kho.
            </p>
          </div>

          <div className="mt-8 space-y-3 text-sm text-indigo-100">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">📊</span>
              <p>Theo dõi doanh thu theo ngày / tháng.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">📦</span>
              <p>Quản lý tồn kho, nhập hàng, đơn hàng.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">👥</span>
              <p>Quản lý khách hàng thân thiết, lịch sử mua hàng.</p>
            </div>
          </div>

          <p className="mt-8 text-xs text-indigo-100/80">
            © {new Date().getFullYear()} POS Dashboard
          </p>
        </div>

        {/* BÊN PHẢI – FORM ĐĂNG NHẬP */}
        <div className="flex flex-col justify-center px-8 py-10">
          <h2 className="text-2xl font-bold text-slate-900">Đăng nhập</h2>
          <p className="mt-1 text-sm text-slate-500">
            Đăng nhập để truy cập vào hệ thống quản lý bán hàng.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Tên đăng nhập
              </label>
              <input
                type="text"
                placeholder="VD: admin"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-1 flex justify-end">
                <button
                  type="button"
                  className="text-xs text-slate-400 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-600 hover:shadow-lg active:scale-[0.99]"
            >
              Đăng nhập
            </button>
          </form>

          {/* ĐĂNG KÝ */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-sm">
            <span className="text-slate-500">Chưa có tài khoản? </span>
            <button
              type="button"
              onClick={handleGoRegister}
              className="font-semibold text-indigo-500 hover:underline"
            >
              Đăng ký ngay
            </button>
          </div>

          {/* GỢI Ý DEMO */}
          <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
            <p className="font-medium text-slate-600">Tài khoản demo:</p>
            <p>
              Username: <span className="font-mono">admin</span>
            </p>
            <p>
              Password: <span className="font-mono">123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
