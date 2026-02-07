import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col md:ml-64">
          <Topbar toggleSidebar={() => setSidebarOpen(true)} />

          <main className="flex-1 px-4 py-6 md:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
