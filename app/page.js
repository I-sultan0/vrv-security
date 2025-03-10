"use client";

import { useState } from "react";
import UserModal from "../components/UserModal";
import Sidebar from "../components/Sidebar";
import { RiUserAddFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosSearch, IoIosMenu, IoIosClose } from "react-icons/io";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Security Analyst",
      status: false,
    },
    {
      id: 3,
      name: "John Smith",
      email: "smith@example.com",
      role: "Pen Tester",
      status: true,
    },
    {
      id: 4,
      name: "Man Smith",
      email: "man@example.com",
      role: "Software Developer",
      status: false,
    },
    {
      id: 5,
      name: "Pan Smith",
      email: "pan@example.com",
      role: "Network Engineer",
      status: true,
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: true,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRole, setSelectedRole] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsOpen(true);
  };

  const handleAddUser = () => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...newUser } : user
        )
      );
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
    setNewUser({ name: "", email: "", role: "", status: true });
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (id) => {
    setUserIdToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== userIdToDelete));
    setIsConfirmOpen(false);
    setUserIdToDelete(null);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setUserIdToDelete(null);
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    const matchesStatus = selectedStatus
      ? user.status === (selectedStatus === "active")
      : true;
    return matchesName && matchesRole && matchesStatus;
  });

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-[#e5e7eb] text-[#29292F]">
      {/* Hamburger Icon (only visible on small screens) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 z-50 md:hidden"
      >
        {isSidebarOpen ? <IoIosClose size={30} /> : <IoIosMenu size={30} />}
      </button>

      {/* Sidebar (always visible on medium screens and above) */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#29292F] text-white w-48 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block z-50`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-4 transition-all duration-300  md:ml-48`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white p-4">
          <h1 className="text-2xl font-medium mb-2 self-start md:self-auto">
            Administrator
          </h1>{" "}
          <button
            onClick={() => {
              setIsOpen(true);
              setSelectedUser(null);
              setNewUser({ name: "", email: "", role: "", status: true });
            }}
            className="bg-[#BAC3FF] text-[#222c61] px-4 py-2 rounded hover:bg-blue-600 transition flex items-center w-full md:w-auto mx-auto md:mx-0 max-w-[80%] md:max-w-none justify-center md:justify-start"
          >
            <RiUserAddFill className="mx-1" />
            Add User
          </button>
        </div>

        {/* Adjustments for small devices */}
        <div className="flex flex-col items-center md:hidden">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 z-50"
          >
            {isSidebarOpen ? <IoIosClose size={30} /> : <IoIosMenu size={30} />}
          </button>
        </div>

        {/* Search and Role Filter */}
        <div className="mb-4 py-4 flex flex-col md:flex-row md:space-x-4 sticky top-0 bg-[#e5e7eb] z-10">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 pl-10 pr-4 rounded-lg w-full"
            />
            <span className="absolute left-3 top-3 text-gray-500">
              <IoIosSearch />
            </span>
          </div>

          {/* Status Filter Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border p-2  rounded-lg w-full md:w-1/3 my-2 md:my-0"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Role Filter Dropdown */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border p-2  w-full md:w-1/3 rounded-lg"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Security Analyst">Security Analyst</option>
            <option value="Pen Tester">Pen Tester</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Network Engineer">Network Engineer</option>
            <option value="Threat Intelligence">Threat Intelligence</option>
            <option value="Incident Responder">Incident Responder</option>
            <option value="Compliance Officer">Compliance Officer</option>
          </select>
        </div>

        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white rounded-lg shadow-md ">
            <thead className=" text-center">
              <tr>
                <th className="py-3 px-2  text-gray-600">Name</th>
                <th className="py-3 px-2  text-gray-600 hidden sm:table-cell">
                  Email
                </th>
                <th className="py-3 px-2  text-gray-600 ">Role</th>
                <th className="py-3 px-2  text-gray-600 hidden sm:table-cell">
                  Status
                </th>
                <th className="py-3 px-2  text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="text-center border-b hover:bg-gray-100"
                >
                  <td className="py-4 px-2">{user.name}</td>
                  <td className="py-4 px-2 hidden sm:table-cell">
                    {user.email}
                  </td>
                  <td className="py-4 px-2">{user.role}</td>
                  <td className="py-4 px-2 hidden sm:table-cell">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={user.status}
                        onChange={() => toggleUserStatus(user.id)}
                        className="hidden"
                      />
                      <span
                        className={`toggle ${
                          user.status ? "bg-blue-600" : "bg-gray-300"
                        } relative inline-block w-8 h-4 rounded-full transition duration-200 ease-in-out`}
                      >
                        <span
                          className={`dot absolute left-0 top-0 bg-white w-4 h-4 rounded-full transition duration-200 ease-in-out ${
                            user.status ? "transform translate-x-full" : ""
                          }`}
                        ></span>
                      </span>
                    </label>
                    <span className="ml-2">
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-2 py-2 flex items-center justify-evenly mt-1 border-black">
                    <div
                      className="flex items-center bg-[#BAC3FF] text-[#222c61] px-1 rounded hover:bg-blue-600 transition duration-200 "
                      onClick={() => handleEdit(user)}
                    >
                      <MdEdit className="text-2xl md:text-xl" />
                      <button className=" px-2 py-1 hidden sm:table-cell ">
                        Edit
                      </button>
                    </div>
                    <div
                      className="flex items-center bg-red-500 text-white px-1  rounded hover:bg-red-600 transition duration-200 ml-2 "
                      onClick={() => handleDelete(user.id)}
                    >
                      <MdDelete className="text-2xl md:text-xl" />
                      <button className=" px-2 py-1 hidden sm:table-cell ">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding or Editing User */}
      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddUser}
        newUser={newUser}
        setNewUser={setNewUser}
      />

      {/* Confirmation Modal for Deletion */}
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg">
              Are you sure you want to delete this user?
            </h2>
            <div className="mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Ok
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing User */}
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default page;
