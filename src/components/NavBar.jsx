import React from "react";
import { FaSignal } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { IoBatteryChargingOutline } from "react-icons/io5";

function NavBar() {
  return (
    <nav>
      <div>9:43</div>

      <div className="icons">
        <div>
          <FaSignal />
        </div>
        <div>
          <FaWifi />
        </div>
        <div>
          <IoBatteryChargingOutline />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
