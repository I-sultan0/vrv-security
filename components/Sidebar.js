// components/Sidebar.js
import React from "react";
import Image from "next/image"; // Ensure you import Image if you're using it
import logo from "../assets/logo.png"; // Adjust the path as necessary
import { FaUsers } from "react-icons/fa"; // Importing the user icon
import { RiAdminFill } from "react-icons/ri"; // Importing the roles icon

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div
      className={`bg-gray-800 text-white ${
        isCollapsed ? "w-16" : "w-64"
      } h-screen transition-width`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-2 text-3xl border-2 border-black"
      >
        {isCollapsed ? ">" : "<"}
      </button>

      {/* Logo */}
      {!isCollapsed ? (
        <Image
          className="border-2 border-black mx-auto mt-4"
          src={logo}
          alt="logo"
        />
      ) : (
        ""
      )}

      <div className="flex flex-col items-center mt-8 text-2xl">
        <div className="flex items-center p-2">
          <FaUsers className="mr-4" />
          <span className={`${isCollapsed ? "hidden" : ""}`}> Users</span>
        </div>
        <div className="flex items-center p-2">
          <RiAdminFill className="mr-4" />
          <span className={`${isCollapsed ? "hidden" : ""}`}>Roles</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
