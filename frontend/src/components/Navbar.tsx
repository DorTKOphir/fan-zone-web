import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import UserAvatar from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Don’t show on auth pages
  if (location.pathname === "/signIn" || location.pathname === "/signUp") return null;

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4 shadow-lg">
      {/* Logo */}
      <div className="text-xl font-semibold">
        <Link to="/" className="hover:text-gray-300 transition">FanZone</Link>
      </div>

      {/* Center navigation */}
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

      {/* User avatar with dropdown */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-4 rounded-full hover:bg-blue-500 p-1">
              <UserAvatar profilePicUrl={user.fullProfilePicture} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <div className="px-3 py-2 text-sm font-semibold">{user.username}</div>
            <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default Navbar;
