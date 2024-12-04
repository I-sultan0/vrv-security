// components/UserModal.js
import React from "react";

const UserModal = ({ isOpen, onClose, onSubmit, newUser, setNewUser }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl  p-6">
        <h2 className="text-xl">{newUser.id ? "Edit User" : "Add User"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mt-4">
            <label>Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border p-1 w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label>Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border p-1 w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label>Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border p-1 w-full"
              required
            >
              <option value="">Select Role</option>
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
          <div className="mt-4">
            <label>Status</label>
            <select
              value={newUser.status ? "active" : "inactive"}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value === "active" })
              }
              className="border p-1 w-full"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className=" justify-center flex mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white p-2"
            >
              Cancel
            </button>

            <button type="submit" className="bg-blue-500 text-white p-2 ml-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
