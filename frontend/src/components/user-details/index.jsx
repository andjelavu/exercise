import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorMessage from "../error-message";

const USER_FIELDS = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "age", label: "Age" },
  { name: "gender", label: "Gender" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
];

export const UserDetails = ({ user, onUserUpdate, onUsersUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [error, setError] = useState(null);

  const handleInputChange = ({ target: { name, value } }) => {
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/users/${editedUser.id}`,
        editedUser
      );
      onUserUpdate(response.data);
      onUsersUpdate((prevUsers) =>
          prevUsers.map((user) => (user.id === response.data.id ? response.data : user))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    }
  };

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  return (
    <div className="bg-white rounded-xl p-5">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      {error && <ErrorMessage message={error} />}
      {!isEditing ? (
        <div>
          {["id", ...USER_FIELDS.map((field) => field.name)].map((field) => (
            <p key={field}>
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
              {user[field]}
            </p>
          ))}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-[rgb(234,96,32)] text-white rounded-xl hover:scale-105 hover:ease-out transition-transform duration-200"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {USER_FIELDS.map(({ name, label }) => (
            <div key={name}>
              <label className="block font-medium">{label}:</label>
              <input
                type="text"
                name={name}
                value={editedUser[name]}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-[rgb(234,96,32)] text-white rounded-xl hover:scale-105 hover:ease-out transition-transform duration-200"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
