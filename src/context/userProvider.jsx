import { useState } from "react";
import { UserContext } from "./createContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const [myPost, setMyPost] = useState(false);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const createPost = (status) => {
    setIsCreatePost(status);
  };

  const triggerMenu = (status) => {
    setIsMenu(!isMenu);
    console.log(isMenu);
  };

  const myPostSection = (status) => {
    setMyPost(status);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        createPost,
        isCreatePost,
        isMenu,
        myPost,
        myPostSection,
        triggerMenu,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
