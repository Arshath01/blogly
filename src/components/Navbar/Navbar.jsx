import { useState } from "react";
import Login from "../auth/Login";
import { useUser } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { createPost, triggerMenu, myPostSection, isMenu } = useUser();
  // login(user_exist);
  function handleTitleBtn() {
    navigate("/");
  }
  return (
    <div className="p-3 bg-gray-800 text-white sticky top-0 rounded-md  z-10">
      <div className="flex mx-auto  justify-between items-center  ">
        <button onClick={handleTitleBtn}>
          <h1>Blogly</h1>
        </button>
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
}
