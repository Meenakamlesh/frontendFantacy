import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";

const AddUserForm = () => {
  const { addUser } = useContext(UserContext);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addUser(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center m-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
        className="border px-2 py-1 rounded"
      />
      <button type="submit" className="ml-2 px-3 py-1 bg-blue-600 text-white rounded">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
