// // src/App.tsx
// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Nav";

// const Dashboard: React.FC = () => {
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

//   // When the hamburger is clicked, use screen width to decide:
//   // - On mobile (<768px), toggle the mobile sidebar overlay.
//   // - On desktop, toggle the expanded/collapsed state.
//   const handleHamburgerClick = () => {
//     if (window.innerWidth < 768) {
//       setIsMobileSidebarOpen((prev) => !prev);
//     } else {
//       setIsSidebarExpanded((prev) => !prev);
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar
//         isExpanded={isSidebarExpanded}
//         isMobileOpen={isMobileSidebarOpen}
//         onCloseMobile={() => setIsMobileSidebarOpen(false)}
//       />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         <Navbar onHamburgerClick={handleHamburgerClick} />
//         <main className="flex-1 overflow-y-auto p-4">
//           <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
//           <p>
//             Your content goes here. This area scrolls vertically if the content
//             overflows.
//           </p>
//           {/* Add additional content as needed */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Upload,
  User,
  Home,
  Video,
  History,
  ThumbsUp,
  Clock,
} from "lucide-react";

// Custom hook to track window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const sidebarItems = [
  { id: 1, title: "Home", icon: Home },
  { id: 2, title: "Subscriptions", icon: Video },
  { id: 3, title: "History", icon: History },
  { id: 4, title: "Liked Videos", icon: ThumbsUp },
  { id: 5, title: "Watch Later", icon: Clock },
];

const Dashboard = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleHamburgerClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="h-screen overflow-hidden">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center px-4 z-50">
        <div className="flex items-center flex-1">
          <button
            onClick={handleHamburgerClick}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Upload className="w-6 h-6" />
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white z-40 transform transition-all duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex md:w-${
          isSidebarCollapsed ? "20" : "64"
        } w-64 md:w-${isSidebarCollapsed ? "20" : "64"}`}
      >
        <div className="flex flex-col p-4 h-full overflow-y-auto">
          {sidebarItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <item.icon className="w-6 h-6" />
              <span className={`ml-4 ${isSidebarCollapsed ? "md:hidden" : ""}`}>
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto mt-16 transition-margin duration-300 ${
          isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <div className="p-8 min-h-screen bg-gray-50">
          {/* Your content here */}
          <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-32 bg-white p-4 rounded-lg shadow">
                Card {i + 1}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
