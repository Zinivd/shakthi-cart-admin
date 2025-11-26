import React from "react";
import { Avatar } from "../../../public/assets/Assets";

const User = () => {
  return (
    <div id="user">
      <div className="user">
        <img src={Avatar} className="avatar-40" alt="" />
        <h6 className="px-3 py-1 m-0 rounded-1">Admin</h6>
      </div>
    </div>
  );
};

export default User;
