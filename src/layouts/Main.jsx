import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside/Aside";
import Navbar from "./Navbar/Navbar";

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="main">
      <Aside collapsed={collapsed} />
      <div className="body-main">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="body-div py-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
