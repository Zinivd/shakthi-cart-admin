import React from "react";
import { Logo } from "../../../public/assets/Assets";
import Menu from "./Menu";
import User from "../Navbar/User";

const Offcanvas = () => {
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="navOffcanvas"
      aria-labelledby="navOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <User />
        <button
          type="button"
          className="btn-close bg-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body p-0">
        <div className="flex-shrink-0 sidebar">
          <ul className="list-unstyled mt-2 ps-0">
            <Menu />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;
