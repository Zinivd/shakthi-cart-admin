import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/Assets";
import User from "./User";

const Navbar = ({ collapsed, setCollapsed }) => {
  return (
    <nav className="navbar">
      <div className="icons login col-sm-12 col-md-12 d-flex justify-content-between align-items-center">
        <i className="bx bx-menu-alt-left fs-4 cursor-pointer collapsebtn" onClick={() => setCollapsed(!collapsed)}></i>
        <div className="navlogo">
          <Link to="/" className="mx-auto">
            <img src={Logo} alt="" height="40px" className="mx-auto" />
          </Link>
        </div>
        <div className="d-flex align-items-center column-gap-2">
          <button
            className="border-0 m-0 p-0 responsive_button"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navOffcanvas"
            aria-controls="navOffcanvas"
          >
            <i className="bx bx-menu-alt-right"></i>
          </button>
          <div className="user-main">
            <User />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
