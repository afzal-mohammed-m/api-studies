
import { useState } from "react";
import "./App.css";

const API_URL = "YOUR_LOGIN_API_URL";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser({
        username: data.user?.username || data.username || username,
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
      setUser(null);
    }
  };

  return (
    <div className="app">
      {!user ? (
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Login</h2>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>
      ) : (
        <div className="stat-card">
          <h2>Hi, Welcome {user.username}!</h2>
          <p>Login successful.</p>

          <div className="stat">
            <span>Username</span>
            <h3>{user.username}</h3>
          </div>

          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      )}
    </div>
  );
}
