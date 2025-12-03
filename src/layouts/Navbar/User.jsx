import React from "react";
import { Avatar } from "../../../public/assets/Assets";

const User = () => {
  const user = localStorage.getItem("user_type") || "user";
  return (
    <div id="user">
      <div className="user">
        <img src={Avatar} className="avatar-40" alt="" />
        <h6 className="px-3 py-1 m-0 rounded-1 text-capitalize">{user}</h6>
      </div>
    </div>
  );
};

export default User;
