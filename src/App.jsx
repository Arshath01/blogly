import "./App.css";
import UserProvider from "./context/userProvider";
import Layout from "./layout/layout";
import { Home } from "./page";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <GoogleOAuthProvider clientId="69850234397-lb7jmp0fl3vpujrdfgnrtsbvt036q76u.apps.googleusercontent.com">
      <UserProvider>
        <Home />
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
