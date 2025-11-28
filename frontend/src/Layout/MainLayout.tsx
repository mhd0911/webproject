import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
