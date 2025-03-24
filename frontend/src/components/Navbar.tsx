import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

  if (location.pathname === "/signIn" || location.pathname === "/signUp") return null;

  return (
    <nav
      className="bg-blue-600 text-white px-6 py-4 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold hover:text-gray-300">
          FanZone
        </NavLink>

        {/* Navigation Links */}
        <ul className="hidden sm:flex gap-6 text-lg font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white pb-1"
                  : "hover:text-gray-300"
              }
            >
              Matches
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white pb-1"
                  : "hover:text-gray-300"
              }
            >
              Chat
            </NavLink>
          </li>
        </ul>

        {/* User Avatar */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="ml-4 rounded-full hover:bg-blue-500 p-1"
                aria-label="User menu"
              >
                <UserAvatar profilePicUrl={user.fullProfilePicture} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <div className="px-3 py-2 text-sm font-semibold">{user.username}</div>
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer text-red-500"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;