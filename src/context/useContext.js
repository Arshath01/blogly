import { useContext } from "react";
import { UserContext } from "./createContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be within in a useProvider");
  }
  return context;
};
