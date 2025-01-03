import { FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
// import NavBar from "./NavBar";
import { MdAutoDelete } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiCalling } from "../features/contactsData";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";

import { FaUserCircle } from "react-icons/fa";
import Loader from "./Loader";

function Read() {
  let userLogo = <FaUserCircle />;
  console.log(userLogo);
  let [data, setData] = useState([]);
  let [search, setSearch] = useState("");

  const filteredData = Object.entries(data).filter(([id, detail]) =>
    detail.name.toLowerCase().includes(search.toLowerCase())
  );
  let dispatch = useDispatch();

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
    if (handleDelete) {
      window.confirm("Are you sure to Delete this contact");
    }
    axios
      .delete(
        `https://contact-app-abb9f-default-rtdb.firebaseio.com/contacts/${id}.json`
      )
      .then(() => {
        callData();
      });
  }
  useEffect(() => {
    callData();
    console.log(dispatch(apiCalling()));
  }, []);

  function sendDataToLocalStoarage(name, phone, id) {
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("id", id);
    navigate("/edit");
  }

  return (
    <div className="container ramos">
      <div className="top-logos">
        <div className="n">
          <FaPhoneAlt />
        </div>
        <div>
          <IoMdContact />
        </div>

        <div>
          <IoIosSettings />
        </div>
      </div>
      {/* <NavBar /> */}
      <div className="plus">
        <Link to={"/create"}>
          <div>
            <IoMdAddCircle />
            <span className="addi">Add Contact</span>
          </div>
        </Link>
      </div>

      <div className="serach-bar">
        <div>
          <input
            className="ki"
            type="text"
            placeholder="serch your contacts"
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
          {filteredData.length > 0 ? (
            filteredData.map(([id, detail]) => {
              return (
                <div key={id} className="contact-card">
                  <div className="user-logo">{userLogo}</div>
                  <div key={id} className="contact-info">
                    <h3 className="nombre">{detail.name}</h3>
                    <h4>{detail.phone}</h4>
                  </div>
                  <div className="actions">
                    <div
                      className="delete"
                      onClick={() => {
                        handleDelete(id);
                      }}
                    >
                      <MdAutoDelete />
                    </div>
                    <div
                      className="edit"
                      onClick={() => {
                        sendDataToLocalStoarage(detail.name, detail.phone, id);
                      }}
                    >
                      <FaRegEdit />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </main>
    </div>
  );
}

export default Read;
