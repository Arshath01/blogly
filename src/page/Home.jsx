import { useEffect } from "react";
import { Navbar, BlogContent, Footer } from "../components";
import CreatePost from "../components/CreatePost/CreatePost";
import DropDown from "../components/dropdown/dropDown";
import { useUser } from "../context/useContext";
import Layout from "../layout/layout";
import { decodeToken } from "../utils/decodeToken";
import Mypost from "../components/Mypost/Mypost";

export default function Home() {
  const { isCreatePost, myPost, user, login } = useUser();
  const user_exist = localStorage.getItem("authToken");
  let decodedToken;
  let userData;
  if (user_exist) {
    decodedToken = decodeToken(user_exist);
    userData = decodedToken;
  }

  useEffect(() => {
    login(userData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <DropDown />

      <BlogContent />

      <Footer />
    </div>
  );
}
