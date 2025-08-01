import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users initially
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://backendfantcy.onrender.com/api/users/leaderBoard');
      console.log("API Response:", res.data); // ✅ move this line here

      if (!Array.isArray(res.data.users)) {
        throw new Error("Invalid data format from API");
      }

      setUsers(res.data.users);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);



  // 👉 Function to add user
  const addUser = async (name) => {
    try {
      const res = await axios.post("https://backendfantcy.onrender.com/api/users/addUser", { name });
      setUsers(prev => [...prev, res.data]);
      console.log("api name response", name);
      
    } catch (err) {
      console.error("Error adding user:", err);
      setError(err);
    }
  };

  // 👉 Function to claim points
  const claimPoints = async (userId) => {
    try {
      const res = await axios.post('https://backendfantcy.onrender.com/api/users/claim', { userId });
      const updatedUser = res.data.user;

      // Update user in local state
      setUsers(prevUsers =>
        prevUsers.map(u => u._id === updatedUser._id ? updatedUser : u)
      );

      console.log("Claim api response", userId);
      

      return res.data.claimedPoints; // returning claimed points so frontend can show toast or message
    } catch (err) {
      console.error("Error claiming points:", err);
      setError(err);
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, error, addUser, claimPoints }}>
      {children}
    </UserContext.Provider>
  );
};
