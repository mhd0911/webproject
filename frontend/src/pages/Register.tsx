import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !username || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }

    // DEMO: không lưu thật, chỉ giả lập
    setSuccess("Đăng ký thành công (demo). Vui lòng đăng nhập lại.");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="mx-4 grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        {/* BÊN TRÁI – INTRO (GIỐNG LOGIN CHO ĐỒNG BỘ) */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-500 p-8 text-white md:flex">
          <div>
            <h1 className="text-2xl font-bold">POS Dashboard</h1>
            <p className="mt-2 text-sm text-indigo-100">
              Đăng ký tài khoản để bắt đầu quản lý bán hàng hiệu quả.
            </p>
          </div>

          <div className="mt-8 space-y-3 text-sm text-indigo-100">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">🚀</span>
              <p>Khởi động hệ thống bán hàng chỉ trong vài phút.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">🔐</span>
              <p>Tài khoản bảo mật, phân quyền rõ ràng.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">📈</span>
              <p>Theo dõi hiệu suất kinh doanh mọi lúc, mọi nơi.</p>
            </div>
          </div>

          <p className="mt-8 text-xs text-indigo-100/80">
            © {new Date().getFullYear()} POS Dashboard
          </p>
        </div>

        {/* BÊN PHẢI – FORM ĐĂNG KÝ */}
        <div className="flex flex-col justify-center px-8 py-10">
          <h2 className="text-2xl font-bold text-slate-900">Đăng ký</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tạo tài khoản mới để sử dụng hệ thống quản lý bán hàng.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="VD: Nguyễn Văn A"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Tên đăng nhập
              </label>
              <input
                type="text"
                placeholder="Tên đăng nhập"
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
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-600 hover:shadow-lg active:scale-[0.99]"
            >
              Đăng ký
            </button>
          </form>

          {/* ĐĂNG NHẬP */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-sm">
            <span className="text-slate-500">Đã có tài khoản? </span>
            <button
              type="button"
              onClick={handleGoLogin}
              className="font-semibold text-indigo-500 hover:underline"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
