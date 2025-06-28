import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoContact } from "../features/contactsData";
import { FaUserCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function Create() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleAddToContacts(e) {
    e.preventDefault();
    if (name && phone && phone.length <= 10) {
      try {
        await dispatch(addtoContact({ name, phone }));
        setName("");
        setPhone("");
        navigate("/");
      } catch (error) {
        alert("Something went wrong while adding contact.");
      }
    } else {
      alert("Please fill all fields and ensure phone number is max 10 digits.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-red-500 text-2xl">
          <MdCancel />
        </Link>
        <h1 className="text-xl font-bold">New Contact</h1>
        <button
          onClick={handleAddToContacts}
          disabled={!name || !phone}
          className={`text-green-400 text-2xl hover:text-green-600 transition ${
            (!name || !phone) && "opacity-50 cursor-not-allowed"
          }`}
        >
          <IoCheckmarkDoneSharp />
        </button>
      </div>

      {/* User Icon */}
      <div className="flex justify-center mb-4">
        <FaUserCircle size={60} className="text-gray-500" />
      </div>

      {/* Form */}
      <form onSubmit={handleAddToContacts} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => {
            if (e.target.value.length <= 10) setPhone(e.target.value);
          }}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
        />
      </form>
    </div>
  );
}

export default Create;
