// components/UserModal.js
import React from "react";

const UserModal = ({ isOpen, onClose, onSubmit, newUser, setNewUser }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl">{newUser.id ? "Edit User" : "Add User"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Role</label>
            <input
              type="text"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Status</label>
            <select
              value={newUser.status ? "active" : "inactive"}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value === "active" })
              }
              className="border p-2 w-full"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white p-2 mt-2 ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
