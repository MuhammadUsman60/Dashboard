import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex bg-lightBody dark:bg-darkBody">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}  />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
