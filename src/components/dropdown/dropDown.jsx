import React, { useState } from "react";
import { useUser } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export default function DropDown() {
  const { user, isMenu, logout, myPostSection, triggerMenu, createPost } =
    useUser();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    triggerMenu();
  }

  function handleCreateNewPost() {
    navigate("/createpost");
    createPost(true);
    triggerMenu();
  }

  function handleMyPost() {
    navigate("/mypost");
    triggerMenu();
    if (user) {
      const { sub } = user;
      fetch(`http://localhost:3001/api/mypost/${sub}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
      myPostSection(true);
      triggerMenu();
      createPost(false);
    }
  }

  return (
    <div className="flex  flex-col   w-full fixed top-2 items-center z-10">
      {isMenu && (
        <ul className="lg:rounded-xl p-5 absolute  lg:w-[300px] flex flex-col items-center justify-center   mt-16 bg-gray-100 text-center  text-black w-full">
          <div className="flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <li className=" w-full p-2 ">{user.name}</li>
          </div>
          <li className=" w-full p-2 ">
            <button onClick={handleCreateNewPost}>Create New Post</button>
          </li>

          <li className="w-full p-2 ">
            <button onClick={handleMyPost}>My Posts</button>
          </li>

          <li className=" w-full p-2  ">
            <button
              onClick={handleLogout}
              className="bg-red-600 p-2 w-full text-white  font-bold text-sm uppercase rounded-lg"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
