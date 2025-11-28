import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-900 text-white h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/customers" className="hover:text-blue-400">Customers</Link>
        <Link to="/products" className="hover:text-blue-400">Products</Link>
        <Link to="/orders" className="hover:text-blue-400">Orders</Link>
        <Link to="/stockin" className="hover:text-blue-400">Stock In</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
