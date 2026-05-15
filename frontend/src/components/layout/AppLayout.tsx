import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-surface text-on-surface font-body-md h-screen overflow-hidden flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-outline-variant flex justify-between items-center px-lg bg-surface sticky top-0 z-30">
          <div className="flex items-center gap-md">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-sm text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
          <div className="flex items-center gap-md"></div>
        </header>

        {/* Content wrapper */}
        <div className="flex-1 w-full max-w-full flex flex-col overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
