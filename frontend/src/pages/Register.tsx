import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { registerThunk } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Mật khẩu nhập lại không khớp");
      return;
    }

    const result = await dispatch(
      registerThunk({
        fullName,
        username,
        password,
        dateOfBirth: dateOfBirth || undefined,
        address: address || undefined,
      })
    );

    if (registerThunk.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl overflow-hidden flex">
        {/* Left info */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-500 to-blue-500 text-white w-1/2">
          <div>
            <h1 className="text-2xl font-bold mb-3">POS Dashboard</h1>
            <p className="text-sm text-indigo-100">
              Đăng ký tài khoản để quản lý bán hàng hiệu quả hơn.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            <li>🚀 Khởi động hệ thống bán hàng chỉ trong vài phút.</li>
            <li>🔐 Tài khoản bảo mật, phân quyền rõ ràng.</li>
            <li>📊 Theo dõi hiệu suất kinh doanh mọi lúc, mọi nơi.</li>
          </ul>
          <p className="text-[11px] text-indigo-100/80">
            © 2025 POS Dashboard
          </p>
        </div>

        {/* Right form */}
        <div className="flex-1 p-8 md:p-10">
          <h2 className="text-2xl font-semibold mb-6">Đăng ký</h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Họ và tên
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="VD: Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Tên đăng nhập
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tên đăng nhập"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Địa chỉ
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="VD: Hà Nội, Việt Nam"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-500 text-white py-2 text-sm font-medium hover:bg-indigo-600 transition disabled:opacity-60"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="mt-6 text-xs text-slate-500 text-center">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-indigo-500 font-medium hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
