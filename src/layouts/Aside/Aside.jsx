import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu.jsx";
import { Logo } from "../../assets/Assets.js";

const Aside = ({ collapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="flex-shrink-0 sidebar">
        <div className={`${collapsed ? 'd-none' : 'd-flex'} nav col-md-12`}>
          <Link to="/" className="mx-auto">
            <img src={Logo} alt="" height=" 50px" className="mx-auto" />
          </Link>
        </div>
        <ul
          className="main-ul list-unstyled ps-0"
          style={{ marginTop: "20px" }}
        >
          <Menu />
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
