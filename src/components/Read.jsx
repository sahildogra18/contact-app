import { FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import NavBar from "./NavBar";
import { MdAutoDelete } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillAccountBook } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function Read() {
  let [data, setData] = useState([]);
  let [search, setSearch] = useState("");

  const filteredData = Object.entries(data).filter(([id, detail]) =>
    detail.name.toLowerCase().includes(search.toLowerCase())
  );

  let navigate = useNavigate();

  function callData() {
    axios
      .get(
        `https://contact-app-abb9f-default-rtdb.firebaseio.com/contacts.json`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(
        `https://contact-app-abb9f-default-rtdb.firebaseio.com/contacts/${id}.json`
      )
      .then((res) => {
        callData();
      });
  }
  useEffect(() => {
    callData();
  }, []);

  function sendDataToLocalStoarage(name, phone, id) {
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("id", id);
    navigate("/edit");
  }

  return (
    <div className="container">
      <NavBar />
      <div className="plus">
        <Link to={"/create"}>
          <div>
            <FaPlus />
          </div>
        </Link>
        <div className="e">EDIT</div>

        <div>
          <input
            type="text"
            placeholder="search your contacts"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <h1>my Contacts</h1>
      <main>
        <div className="cont">
          {filteredData.map(([id, detail]) => {
            return (
              <div key={id} className="contact-card">
                <div key={id} className="contact-info">
                  <h3>{detail.name}</h3>
                  <h4>{detail.phone}</h4>
                </div>
                <div className="actions">
                  <div
                    className="delete"
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    <MdDeleteOutline />
                  </div>
                  <div
                    className="edit"
                    onClick={() => {
                      sendDataToLocalStoarage(detail.name, detail.phone, id);
                    }}
                  >
                    <CiEdit />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Read;
