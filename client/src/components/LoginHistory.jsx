// src/LoginHistory.jsx
//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./LoginHistory.css"; // Assume you have corresponding styling

export default function LoginHistory({ token }) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLoginHistory = async (start, end) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (start) params.append("start", start);
      if (end) params.append("end", end);

      const response = await fetch(
        `http://localhost:4000/api/logs/login-history?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch login history");
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
      fetchLoginHistory();
    }
  }, [token]);

  // Revised handleExportCSV to include token in the request and handle CSV download
  const handleExportCSV = async () => {
    const params = new URLSearchParams();
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);
    params.append("export", "csv");

    try {
      const response = await fetch(
        `http://localhost:4000/api/logs/login-history?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to export CSV");
      }

      // Get the CSV data as a Blob
      const blob = await response.blob();
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      // Create a link element, set its href to the Blob URL, and trigger a download
      const a = document.createElement("a");
      a.href = url;
      a.download = "login_history.csv"; // desired file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApplyFilter = () => {
    fetchLoginHistory(startDate, endDate);
  };

  return (
    <div className="login-history-container">
      <h3>Login History</h3>
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
        <button onClick={handleExportCSV}>Export CSV</button>
      </div>
      <table className="log-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Role</th>
            <th>Timestamp</th>
            <th>IP Address</th>
            <th>Device Info</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.userId?.email || "N/A"}</td>
              <td>{log.userId?.role || "N/A"}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.ipAddress}</td>
              <td>{log.deviceInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

LoginHistory.propTypes = {
  token: PropTypes.string.isRequired,
};
