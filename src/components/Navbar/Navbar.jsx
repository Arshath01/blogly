import { useState } from "react";
import Login from "../auth/Login";
import { useUser } from "../../context/useContext";

export default function Navbar() {
  const { createPost, triggerMenu, myPostSection, isMenu } = useUser();
  // login(user_exist);
  function handleTitleBtn() {
    createPost(false);
    myPostSection(false);
    if (isMenu) {
      triggerMenu();
    }
  }
  return (
    <div className="p-3 bg-gray-800 text-white fixed w-full z-10">
      <div className="flex lg:w-[900px] mx-auto justify-between items-center  ">
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
