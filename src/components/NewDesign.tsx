import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosCode } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import "./NewDesign.css";

const NewDesign = ()=>{

    return (
        <div className="n-root">
            <div className="search-cntr">
                <CiSearch className="icon"/>
                <input  className="search" placeholder="100 contacts"/>
            </div>
            <div className="sm ml-1 all-calls">
                All calls 
                <IoIosCode className="icon" />
            </div>

            <div className="ml-1 contant-item">
                <div className="avatar">
                    A
                </div>
                <div className="details">
                    <div className="name">sumit dtpr</div>
                    <div className="number">+91 87654 36485</div>
                </div>
                    <IoIosArrowForward className="icon action"/>
            </div>

            <div className="ml-1 contant-item">
                <div className="avatar">
                    A
                </div>
                <div className="details">
                    <div className="name">sumit dtpr</div>
                    <div className="number">+91 87654 36485</div>
                </div>
                    <IoIosArrowForward className="icon action"/>
            </div>


        </div>
    )
}

export default NewDesign;