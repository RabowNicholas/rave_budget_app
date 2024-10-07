"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [userName, setUserName] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setPhoneNumber(data.phone);
        setUserName(data.name);
        setNewName(data.name);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setUserName(data.name);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center p-6 text-white">Loading...</div>;
  }

  if (!userName) {
    return (
      <div className="text-center p-6 text-white">No profile data found.</div>
    );
  }

  const handleSignOutClick = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col p-6 bg-shadowGray rounded-lg shadow-lg space-y-6 text-black">
      <h2 className="text-3xl font-semibold bg-clip-text text-darkBackground">
        Profile
      </h2>
      <div className="flex flex-col">
        <label>Phone</label>
        <span className="text-lg font-medium">{phoneNumber}</span>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <label>Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="input-primary w-full text-black p-2 border border-gray-300 rounded"
          />
          <button onClick={handleSave} className="button-primary-filled">
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <label>Name</label>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">{userName}</span>
            <button
              onClick={() => setIsEditing(true)}
              className="button-primary-transparent"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleSignOutClick}
        className="button-primary-transparent"
      >
        sign out
      </button>
    </div>
  );
}
