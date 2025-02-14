// src/components/Navbar.tsx
import React from "react";
import { Menu, Upload, Search } from "lucide-react";

interface NavbarProps {
  onHamburgerClick: () => void;
}

const Nav: React.FC<NavbarProps> = ({ onHamburgerClick }) => {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
      {/* Left: Hamburger and Title */}
      <div className="flex items-center">
        <button onClick={onHamburgerClick} className="mr-4">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold hidden sm:block">Dashboard</h1>
      </div>

      {/* Center: Search Input */}
      <div className="flex-1 mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Right: Upload and Avatar */}
      <div className="flex items-center space-x-4">
        <button>
          <Upload className="w-6 h-6" />
        </button>
        <img
          src="https://i.pravatar.cc/300"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Nav;
