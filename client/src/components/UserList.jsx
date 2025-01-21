// src/UserList.jsx
//eslint-disable-next-line
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./UserList.css"; // Ensure you have corresponding CSS for styling

export default function UserList({ token }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});

  // Fetch users when component mounts or token changes
  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
        // Initialize selectedRoles with current user roles
        const rolesMap = {};
        data.forEach((user) => {
          rolesMap[user._id] = user.role;
        });
        setSelectedRoles(rolesMap);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Handle role selection change
  const handleRoleChange = (userId, newRole) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  // Handle role update submission with confirmation
  const handleUpdateRole = async (userId, userEmail) => {
    const updatedRole = selectedRoles[userId];
    if (!updatedRole) {
      setError("Please select a valid role.");
      return;
    }

    // Confirmation
    const confirmUpdate = window.confirm(
      `Are you sure you want to change the role of ${userEmail} to ${updatedRole}?`
    );

    if (!confirmUpdate) return;

    setUpdatingUserId(userId);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: updatedRole }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update role");
      }

      const updatedUser = await res.json();
      // Update the user in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: updatedUser.role } : user
        )
      );
      setSuccess(
        `Role updated for ${updatedUser.email} to ${updatedUser.role}.`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingUserId(null);
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  };

  // Define available roles
  const roles = ["User", "Admin"];

  return (
    <div className="user-list-container">
      <h3>User List (Admin-Only)</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          {users.length === 0 && !error && <p>No users found.</p>}
          {users.length > 0 && (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.email}</td>
                    <td>
                      <select
                        value={selectedRoles[u._id] || u.role}
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                        disabled={updatingUserId === u._id}
                      >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{u.status}</td>
                    <td>
                      <button
                        onClick={() => handleUpdateRole(u._id, u.email)}
                        disabled={
                          updatingUserId === u._id ||
                          selectedRoles[u._id] === u.role
                        }
                      >
                        {updatingUserId === u._id ? "Updating..." : "Save Role"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

UserList.propTypes = {
  token: PropTypes.string.isRequired,
};
