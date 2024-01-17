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
      {!user ? (
        <GoogleLogin
          buttonText="Login"
          onSuccess={handleLogin}
          onError={handleLoginFailure}
        />
      ) : (
        <div className="flex space-x-4 items-center justify-end w-full">
          <img
            src={user.picture}
            className="rounded-full h-10 w-10"
            alt="profile"
            onClick={() => triggerMenu()}
          />
        </div>
      )}
    </div>
  );
}
