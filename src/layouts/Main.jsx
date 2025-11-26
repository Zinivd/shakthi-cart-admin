import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside/Aside";
import Navbar from "./Navbar/Navbar";
import { getUserInfo } from "../api/api";

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo(email);
        setUserInfo(res.data);
        console.log("USER INFO LOADED:", res.data);
      } catch (err) {
        console.error("USER INFO ERROR:", err);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <div className="main">
      <Aside collapsed={collapsed} userInfo={userInfo} />
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
