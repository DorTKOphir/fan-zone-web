import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4 shadow-lg">
      {/* Logo or Branding */}
      <div className="text-xl font-semibold">
        <Link to="/" className="hover:text-gray-300 transition">FanZone</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link
          to="/"
          className={`px-4 py-2 rounded-md transition ${
            location.pathname === "/" ? "bg-white text-blue-600" : "hover:bg-blue-500"
          }`}
        >
          Matches
        </Link>

        <Link
          to="/chat"
          className={`px-4 py-2 rounded-md transition ${
            location.pathname === "/chat" ? "bg-white text-blue-600" : "hover:bg-blue-500"
          }`}
        >
          Chat
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
