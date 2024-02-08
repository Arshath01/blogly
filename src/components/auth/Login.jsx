import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "../../context/useContext";
import { decodeToken } from "../../utils/decodeToken";
import { useEffect, useState } from "react";

export default function Login() {
  const { user, login, triggerMenu } = useUser();

  async function handleLogin(response) {
    if (response) {
      const { credential } = response;
      const decodedToken = decodeToken(credential);

      if (credential) {
        localStorage.setItem("authToken", credential);
      }

      login(decodedToken);
    }
  }

  function handleLoginFailure(error) {
    if (error.error === "popup_closed_by_user") {
      console.log("User closed the login popup");
    } else {
      console.error("Login failure:", error);
    }
  }

  return (
    <div>
      {user ? (
        <GoogleLogin
          buttonText="Login"
          onSuccess={handleLogin}
          onError={handleLoginFailure}
        />
      ) : (
        <div
          className="flex space-x-2 cursor-pointer items-center justify-end w-full"
          onClick={() => triggerMenu()}
        >
          {/* <img
            src={user.picture}
            className="rounded-full h-10 w-10"
            alt="profile"
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 512 512"
            fill="white"
          >
            <path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87 87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 345c-9.4 9.4-24.6 9.4-33.9 0L135 241z" />
          </svg>
        </div>
      )}
    </div>
  );
}
