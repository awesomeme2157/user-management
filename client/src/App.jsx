// src/App.jsx
//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserList from "./components/UserList";
import LoginHistory from "./components/LoginHistory";
import ActivityLog from "./components/ActivityLog"; // Import ActivityLog component
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./App.css"; // Optional: for global styles

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");

  // On mount, check for existing token and user info in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser && savedUser !== "undefined") {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        setError("Failed to load user data. Please log in again.");
        handleLogout(); // Clear invalid data
      }
    }
  }, []);

  const handleLoginSuccess = (jwtToken, userInfo) => {
    setToken(jwtToken);
    setUser(userInfo);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setError("");
    toast.success("Login successful!"); // Toast notification for login
  };

  const handleSignupSuccess = (jwtToken, userInfo) => {
    setToken(jwtToken);
    setUser(userInfo);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setError("");
    toast.success("Signup successful! Head to login!"); // Toast notification for signup
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("You have logged out."); // Toast notification for logout
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>
      {error && <p className="error-message">{error}</p>}
      {!token ? (
        <>
          {showSignup ? (
            <SignupForm onSignupSuccess={handleSignupSuccess} />
          ) : (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          )}
          <button onClick={() => setShowSignup(!showSignup)}>
            {showSignup ? "Have an account? Login" : "New user? Sign up"}
          </button>
        </>
      ) : (
        <div>
          <p>Logged in as: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <hr />

      {/* Render admin-only components */}
      {token && user?.role === "Admin" ? (
        <>
          <UserList token={token} />
          <hr />
          <LoginHistory token={token} />
          <hr />
          <ActivityLog token={token} />
        </>
      ) : token ? (
        <p>You are not authorized to view admin sections.</p>
      ) : (
        <p>Please log in to see admin sections.</p>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
