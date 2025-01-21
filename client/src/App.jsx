// // src/App.jsx
// import React, { useEffect, useState } from "react";
// import LoginForm from "./LoginForm";
// import UserList from "./UserList";

// function App() {
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState(null);

//   // On app load, check if there's a token in localStorage
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//       // You might also store user info in localStorage if you want
//     }
//   }, []);

//   const handleLoginSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//   };

//   const handleLogout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <div className="container">
//       <h1>React + Vite Frontend</h1>

//       {!token ? (
//         <LoginForm onLoginSuccess={handleLoginSuccess} />
//       ) : (
//         <div className="loggedin">
//           <p>Logged in as: {user?.email}</p>
//           <p>Role: {user?.role}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}

//       <hr />

//       {/* Show UserList if we have a token */}
//       {token && <UserList token={token} />}
//     </div>
//   );
// }

// export default App;

// src/App.jsx
// // eslint-disable-next-line
// import React, { useState, useEffect } from "react";
// import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";
// import UserList from "./UserList";

// function App() {
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState(null);
//   const [showSignup, setShowSignup] = useState(false);

//   // On mount, check for existing token and user info in localStorage
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");

//     // Check for valid savedUser before parsing
//     if (savedToken && savedUser && savedUser !== "undefined") {
//       setToken(savedToken);
//       try {
//         setUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing saved user data:", error);
//       }
//     }
//   }, []);

//   const handleLoginSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     navigate("/dashboard"); // example navigation
//   };

//   const handleSignupSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     navigate("/dashboard"); // example navigation
//   };

//   const handleLogout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>User-Management</h1>
//       {!token ? (
//         <>
//           {showSignup ? (
//             <SignupForm onSignupSuccess={handleLoginSuccess} />
//           ) : (
//             <LoginForm onLoginSuccess={handleLoginSuccess} />
//           )}
//           <button onClick={() => setShowSignup(!showSignup)}>
//             {showSignup ? "Have an account? Login" : "New user? Sign up"}
//           </button>
//         </>
//       ) : (
//         <div>
//           <p>Logged in as: {user.email}</p>
//           <p>Role: {user.role}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}

//       <hr />

//       {token && user.role === "Admin" ? (
//         <UserList token={token} />
//       ) : token ? (
//         <p>You are not authorized to view the user list.</p>
//       ) : (
//         <p>Please log in to see user list.</p>
//       )}
//     </div>
//   );
// }

// export default App;

// // src/App.jsx
// //eslint-disable-next-line
// import React, { useState, useEffect } from "react";
// import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";
// import UserList from "./UserList";

// function App() {
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState(null);
//   const [showSignup, setShowSignup] = useState(false);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");
//     if (savedToken && savedUser && savedUser !== "undefined") {
//       setToken(savedToken);
//       try {
//         setUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing saved user data:", error);
//       }
//     }
//   }, []);

//   const handleLoginSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     // Removed navigate call
//   };

//   const handleSignupSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     // Removed navigate call
//   };

//   const handleLogout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>React + Vite Frontend</h1>
//       {!token ? (
//         <>
//           {showSignup ? (
//             <SignupForm onSignupSuccess={handleSignupSuccess} />
//           ) : (
//             <LoginForm onLoginSuccess={handleLoginSuccess} />
//           )}
//           <button onClick={() => setShowSignup(!showSignup)}>
//             {showSignup ? "Have an account? Login" : "New user? Sign up"}
//           </button>
//         </>
//       ) : (
//         <div>
//           <p>Logged in as: {user?.email}</p>
//           <p>Role: {user?.role}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}

//       <hr />

//       {token && user?.role === "Admin" ? (
//         <UserList token={token} />
//       ) : token ? (
//         <p>You are not authorized to view the user list.</p>
//       ) : (
//         <p>Please log in to see user list.</p>
//       )}
//     </div>
//   );
// }

// export default App;

//----------------------------------------------------------------
// // src/App.jsx
// //eslint-disable-next-line
// import React, { useState, useEffect } from "react";
// import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";
// import UserList from "./UserList";
// import "./App.css"; // Optional: for global styles

// function App() {
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState(null);
//   const [showSignup, setShowSignup] = useState(false);
//   const [error, setError] = useState("");

//   // On mount, check for existing token and user info in localStorage
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");

//     if (savedToken && savedUser && savedUser !== "undefined") {
//       try {
//         setToken(savedToken);
//         setUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing saved user data:", error);
//         setError("Failed to load user data. Please log in again.");
//         handleLogout(); // Clear invalid data
//       }
//     }
//   }, []);

//   const handleLoginSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     setError("");
//   };

//   const handleSignupSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     setError("");
//   };

//   const handleLogout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>React + Vite Frontend</h1>
//       {error && <p className="error-message">{error}</p>}
//       {!token ? (
//         <>
//           {showSignup ? (
//             <SignupForm onSignupSuccess={handleSignupSuccess} />
//           ) : (
//             <LoginForm onLoginSuccess={handleLoginSuccess} />
//           )}
//           <button onClick={() => setShowSignup(!showSignup)}>
//             {showSignup ? "Have an account? Login" : "New user? Sign up"}
//           </button>
//         </>
//       ) : (
//         <div>
//           <p>Logged in as: {user?.email}</p>
//           <p>Role: {user?.role}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}

//       <hr />

//       {token && user?.role === "Admin" ? (
//         <UserList token={token} />
//       ) : token ? (
//         <p>You are not authorized to view the user list.</p>
//       ) : (
//         <p>Please log in to see user list.</p>
//       )}
//     </div>
//   );
// }

// export default App;

//----------------------------------------------------------------

// // src/App.jsx
// // eslint-disable-next-line
// import React, { useState, useEffect } from "react";
// import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";
// import UserList from "./UserList";
// import LoginHistory from "./LoginHistory"; // Import the LoginHistory component
// import "./App.css"; // Optional: for global styles

// function App() {
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState(null);
//   const [showSignup, setShowSignup] = useState(false);
//   const [error, setError] = useState("");

//   // On mount, check for existing token and user info in localStorage
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");

//     if (savedToken && savedUser && savedUser !== "undefined") {
//       try {
//         setToken(savedToken);
//         setUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing saved user data:", error);
//         setError("Failed to load user data. Please log in again.");
//         handleLogout(); // Clear invalid data
//       }
//     }
//   }, []);

//   const handleLoginSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     setError("");
//   };

//   const handleSignupSuccess = (jwtToken, userInfo) => {
//     setToken(jwtToken);
//     setUser(userInfo);
//     localStorage.setItem("token", jwtToken);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     setError("");
//   };

//   const handleLogout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>React + Vite Frontend</h1>
//       {error && <p className="error-message">{error}</p>}
//       {!token ? (
//         <>
//           {showSignup ? (
//             <SignupForm onSignupSuccess={handleSignupSuccess} />
//           ) : (
//             <LoginForm onLoginSuccess={handleLoginSuccess} />
//           )}
//           <button onClick={() => setShowSignup(!showSignup)}>
//             {showSignup ? "Have an account? Login" : "New user? Sign up"}
//           </button>
//         </>
//       ) : (
//         <div>
//           <p>Logged in as: {user?.email}</p>
//           <p>Role: {user?.role}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}

//       <hr />

//       {/* Render both UserList and LoginHistory for Admin users */}
//       {token && user?.role === "Admin" ? (
//         <>
//           <UserList token={token} />
//           <hr />
//           <LoginHistory token={token} />
//         </>
//       ) : token ? (
//         <p>You are not authorized to view the admin sections.</p>
//       ) : (
//         <p>Please log in to see user list and login history.</p>
//       )}
//     </div>
//   );
// }

// export default App;

// src/App.jsx
//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UserList from "./UserList";
import LoginHistory from "./LoginHistory";
import ActivityLog from "./ActivityLog"; // Import ActivityLog component
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
  };

  const handleSignupSuccess = (jwtToken, userInfo) => {
    setToken(jwtToken);
    setUser(userInfo);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setError("");
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    </div>
  );
}

export default App;
