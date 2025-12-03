import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme"; // 👈 đường dẫn đúng

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/customers", label: "Customers", icon: "👥" },
  { to: "/products", label: "Products", icon: "📦" },
  { to: "/orders", label: "Orders", icon: "🧾" },
  { to: "/stockin", label: "Stock In", icon: "📥" },
];

const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside
      className="
        w-60 min-h-screen flex flex-col
        border-r bg-white text-slate-700
        dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800
      "
    >
      {/* Top: tiêu đề + nút đổi theme */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Menu
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Quản lý cửa hàng
          </span>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="
            flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium
            border border-slate-200 bg-slate-50 text-slate-600
            hover:bg-slate-100
            dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700
          "
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isDark ? "bg-yellow-300" : "bg-slate-700"
            }`}
          />
          {isDark ? "Light" : "Dark"}
        </button>
      </div>

      {/* Menu items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium",
                "transition-colors duration-150",
                "hover:bg-violet-50 hover:text-violet-600",
                "dark:hover:bg-slate-800 dark:hover:text-violet-200",
                isActive
                  ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-100"
                  : "text-slate-600 dark:text-slate-200",
              ].join(" ")
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
