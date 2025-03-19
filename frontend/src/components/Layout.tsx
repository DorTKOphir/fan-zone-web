import React from "react";
import { Outlet } from "react-router-dom";
import ProfileIndicator from "./ProfileIndicator";

const Layout: React.FC = () => {
  return (
    <div className="relative">
      <ProfileIndicator/>
      
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
