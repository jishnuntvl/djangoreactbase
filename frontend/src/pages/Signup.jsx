import React, { useState } from "react";
import axios from "../axios"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("signup/", {
        username,
        password,
      });
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => {
        navigate("/"); // Redirect to login page after signup
      }, 2000);
    } catch (error) {
      setMessage("Signup failed: " + error.response.data.username[0]);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
