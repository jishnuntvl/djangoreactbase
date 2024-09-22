import React, { useState } from "react";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("login/", {
        username,
        password,
      });
      setMessage(response.data.message);
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("username", username);
      navigate("/note");
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <Link to={'/signup'}>Sign up</Link>
    </div>
  );
}

export default Login;
