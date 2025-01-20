// src/UserList.jsx
import React, { useEffect, useState } from "react";

export default function UserList({ token }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
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
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="user-list">
      <h3>User List (Admin-Only)</h3>
      {error && <p className="error">{error}</p>}
      {users.length === 0 && !error && <p>No users found.</p>}
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.email} — Role: {u.role} — Status: {u.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
