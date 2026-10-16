
import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("YOUR_API_URL");
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        setUsers(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <p>User ID: {user.id}</p>
        </div>
      ))}
    </div>
  );
}
