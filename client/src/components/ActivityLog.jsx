// src/ActivityLog.jsx
//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ActivityLog.css"; // Create this CSS file for styling

export default function ActivityLog({ token }) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchActivityLogs = async (start, end) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (start) params.append("start", start);
      if (end) params.append("end", end);

      const response = await fetch(
        `https://user-management-s0d3.onrender.com/api/logs/activity?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch activity logs");
      }

      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchActivityLogs();
    }
  }, [token]);

  const handleApplyFilter = () => {
    fetchActivityLogs(startDate, endDate);
  };

  return (
    <div className="activity-log-container">
      <h3>Activity Log</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="filters">
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleApplyFilter} disabled={loading}>
          {loading ? "Loading..." : "Apply Filter"}
        </button>
      </div>
      <table className="activity-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Action</th>
            <th>Resource</th>
            <th>Details</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.userId?.email || "N/A"}</td>
              <td>{log.action}</td>
              <td>{log.resource}</td>
              <td>{JSON.stringify(log.details)}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ActivityLog.propTypes = {
  token: PropTypes.string.isRequired,
};
