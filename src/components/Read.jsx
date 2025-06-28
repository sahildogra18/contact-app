import { FaRegEdit, FaUserCircle } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function Read() {
  const [data, setData] = useState(null); // can be null initially
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch data from Firebase
  function callData() {
    axios
      .get(`https://contact-app-abb9f-default-rtdb.firebaseio.com/contacts.json`)
      .then((res) => {
        console.log("Firebase data =>", res.data);
        setData(res.data || {}); // fallback to empty object if null
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setData({}); // to avoid crash
      });
  }

  // ✅ Delete contact
  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      axios
        .delete(`https://contact-app-abb9f-default-rtdb.firebaseio.com/contacts/${id}.json`)
        .then(() => callData());
    }
  }

  // ✅ Send contact to localStorage for edit
  function sendDataToLocalStorage(name, phone, id) {
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("id", id);
    navigate("/edit");
  }

  useEffect(() => {
    callData();
  }, []);

  // ✅ Filter and sort data
  const filteredData =
    data && typeof data === "object"
      ? Object.entries(data)
          .filter(([id, detail]) =>
            detail.name.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => a[1].name.localeCompare(b[1].name))
      : [];

  return (
    <div className="container mx-auto p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 text-red-500">CRUD Operations</h1>

  

      {/* Add Contact */}
      <div className="mb-4 flex justify-end">
        <Link to="/create" className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition">
          <IoMdAddCircle size={24} />
          <span>Add Contact</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search your contacts"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <h2 className="text-xl mb-4">My Contacts</h2>
      <main>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data === null ? (
            <Loader />
          ) : filteredData.length > 0 ? (
            filteredData.map(([id, detail]) => (
              <div
                key={id}
                className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaUserCircle size={30} />
                  <div>
                    <h3 className="text-lg font-semibold">{detail.name}</h3>
                    <p className="text-sm text-gray-300">{detail.phone}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => handleDelete(id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <MdAutoDelete size={22} />
                  </button>
                  <button
                    onClick={() => sendDataToLocalStorage(detail.name, detail.phone, id)}
                    className="text-yellow-400 hover:text-yellow-600"
                    title="Edit"
                  >
                    <FaRegEdit size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No contact found for "{search}"
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Read;
