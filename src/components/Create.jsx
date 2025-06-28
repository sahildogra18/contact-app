import React, { useState } from "react";
import NavBar from "./NavBar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoContact } from "../features/contactsData";
import { FaUserCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function Create() {
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");

  let navigate = useNavigate();

  let dispatch = useDispatch();

  function handleAddToContacts(e) {
    e.preventDefault();
    if (name && phone && phone.length <= 10) {
      dispatch(addtoContact({ name, phone }));
      setName("");
      setPhone("");
      navigate("/");
    } else {
      alert("Please fill out all fields!");
    }
  }

  return (
    <div className="create">
      {/* <NavBar /> */}
      <div className="upper">
        <div>
          <Link to={"/"}>
            <span>
              <MdCancel />
            </span>
          </Link>
        </div>
        <div className="t">New Contact</div>
        <button className="ok" onClick={handleAddToContacts}>
          <IoCheckmarkDoneSharp />
        </button>
      </div>
      <div className="user">
        <FaUserCircle />
      </div>
      <div>
        <form onSubmit={handleAddToContacts}>
          <div>
            <input
              type="text"
              placeholder="Enter their Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              type="number"
              placeholder="Enter their Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <br />
          {/* <button type="submit" className="adi">
            <div className="as">
              <IoIosAddCircleOutline />
            </div>
            <div type="submit" className="rq">
              Add Phone
            </div>
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Create;
