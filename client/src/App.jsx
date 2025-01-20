// src/App.jsx
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import UserList from "./UserList";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  // On app load, check if there's a token in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      // You might also store user info in localStorage if you want
    }
  }, []);

  const handleLoginSuccess = (jwtToken, userInfo) => {
    setToken(jwtToken);
    setUser(userInfo);
    localStorage.setItem("token", jwtToken);
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="container">
      <h1>React + Vite Frontend</h1>

      {!token ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="loggedin">
          <p>Logged in as: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <hr />

      {/* Show UserList if we have a token */}
      {token && <UserList token={token} />}
    </div>
  );
}

export default App;
