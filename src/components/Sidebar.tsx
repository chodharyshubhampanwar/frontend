// src/components/Sidebar.tsx
import React from "react";
import { Home, Video, Music, Settings } from "lucide-react";
import { X } from "lucide-react";

interface SidebarProps {
  isExpanded: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const menuItems = [
  { title: "Home", icon: Home },
  { title: "Videos", icon: Video },
  { title: "Music", icon: Music },
  { title: "Settings", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  isMobileOpen,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-800`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={onCloseMobile}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <Icon className="w-6 h-6" />
                <span className="ml-4">{item.title}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-gray-800 text-white transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        } h-full`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          {isExpanded ? (
            <span className="text-xl font-bold">Dashboard</span>
          ) : (
            <span className="text-xl font-bold">DB</span>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <Icon className="w-6 h-6" />
                {isExpanded && <span className="ml-4">{item.title}</span>}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
