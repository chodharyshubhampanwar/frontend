import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SignIn from "@/components/SignIn";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuthStore();

  if (!user) return <SignIn />;

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar setSidebarOpen={setSidebarOpen} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main
          className={`mt-16 h-[calc(100vh-4rem)] overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-16"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
