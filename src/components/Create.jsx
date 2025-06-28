import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  function handleAddToContacts(e) {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill out all fields!");
      return;
    }

    if (phone.length > 10) {
      alert("Phone number should be 10 digits or less!");
      return;
    }

    axios
      .post(`https://contact-app-abb9f-default-rtdb.firebaseio.com/contacts.json`, {
        name,
        phone,
      })
      .then(() => {
        setName("");
        setPhone("");
        navigate("/read"); // 👈 change route as needed
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
        alert("Something went wrong while adding contact.");
      });
  }

  return (
    <div className="create bg-gray-900 min-h-screen text-white p-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/read">
          <MdCancel className="text-2xl hover:text-red-400" />
        </Link>
        <h2 className="text-xl font-bold">New Contact</h2>
        <button onClick={handleAddToContacts}>
          <IoCheckmarkDoneSharp className="text-2xl text-green-400 hover:text-green-600" />
        </button>
      </div>

      {/* User icon */}
      <div className="flex justify-center text-7xl mb-6">
        <FaUserCircle />
      </div>

      {/* Form */}
      <form onSubmit={handleAddToContacts} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="number"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
      </form>
    </div>
  );
}

export default Create;
