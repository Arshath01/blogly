import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserProvider from "./context/userProvider";
import Layout from "./layout/layout";
import { Home } from "./page";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Mypost from "./components/Mypost/Mypost";
import CreatePost from "./components/CreatePost/CreatePost";
import { Navbar } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="69850234397-lb7jmp0fl3vpujrdfgnrtsbvt036q76u.apps.googleusercontent.com">
        <UserProvider>
          <Layout>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mypost" element={<Mypost />} />
              <Route path="/createpost" element={<CreatePost />} />
            </Routes>
          </Layout>
        </UserProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}
