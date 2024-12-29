import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  let navigate = useNavigate();

  let [name, setName] = useState("");
  let [id, setId] = useState("");
  let [phone, setPhone] = useState("");

  function getDataFromLocalStorage() {
    setName(localStorage.getItem("name") || "");
    setPhone(localStorage.getItem("phone") || "");
    setId(localStorage.getItem("id") || "");
  }

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  function handleUpdate(e) {
    e.preventDefault();
    axios
      .put(
        `https://contact-app-abb9f-default-rtdb.firebaseio.com/contacts/${id}.json`,
        {
          name: name,
          phone: phone,
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating contact:", err);
      });
  }

  return (
    <div className="container">
      <NavBar />
      <div className="upper">
        <div>
          <Link to={"/"}>
            <span>Cancel</span>
          </Link>
        </div>
        <div>Edit Contact</div>
        <div>
          <span className="df">
            <button type="submit" onClick={handleUpdate}>
              Done
            </button>
          </span>
        </div>
      </div>
      <div>
        <form onSubmit={handleUpdate}>
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
          <div>
            <button type="submit" className="adi">
              <div className="as">
                <IoIosAddCircleOutline />
              </div>
              <div className="rq">Save</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
