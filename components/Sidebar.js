// components/Sidebar.js
import React from "react";
import Image from "next/image"; // Ensure you import Image if you're using it
import logo from "../assets/logo.jpg"; // Adjust the path as necessary
import { FaUsers } from "react-icons/fa"; // Importing the user icon
import { RiAdminFill } from "react-icons/ri"; // Importing the roles icon
// import { FiChevronsLeft } from "react-icons/fi";
// import { FiChevronsRight } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className={`bg-[#29292F] text-white w-48 h-screen transition-width`}>
      <div className="flex justify-between my-4">
        <Image className=" ml-4 w-12 rounded-lg" src={logo} alt="logo" />
      </div>

      <div className="flex flex-col  mt-12 ml-4 text-xl">
        <div className="flex items-center p-2">
          <FaUsers className="mr-4" />
          <span> Users</span>
        </div>
        <div className="flex items-center p-2 mt-2">
          <RiAdminFill className="mr-4" />
          <span>Roles</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
