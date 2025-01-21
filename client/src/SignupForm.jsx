// // src/SignupForm.jsx
// // eslint-disable-next-line
// import React, { useState } from "react";

// export default function SignupForm({ onSignupSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:4000/api/users/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.error || "Signup failed");
//       }

//       const data = await response.json();
//       // Assuming the backend returns a token and user info upon successful signup
//       onSignupSuccess(data.token, data.user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h3>Sign Up</h3>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>{" "}
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>{" "}
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

//eslint-disable-next-line
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function SignupForm({ onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // new state for success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Signup failed");
      }

      const data = await response.json();
      setSuccess(true); // indicate success
      onSignupSuccess(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Signup successful!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

SignupForm.propTypes = {
  onSignupSuccess: PropTypes.func.isRequired,
};
