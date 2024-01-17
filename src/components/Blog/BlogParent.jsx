import Post from "./Post";
import Category from "./Category";
import { useEffect, useState } from "react";
import { useUser } from "../../context/useContext";

export default function BlogParent() {
  const [selectedCat, setSelectedCat] = useState();
  const user_exist = localStorage.getItem("authToken");

  useEffect(() => {
    window.scroll(0, 0);
    function fetchData() {
      fetch("http://localhost:3001/api/getposts")
        .then((response) => response.json().then((data) => console.log(data)))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  function categoryHandler(category) {
    setSelectedCat(category);
    console.log(category);
  }

  return (
    <div className="py-2 ">
      <Category selectedCat={categoryHandler} />

      <Post selectedCat={selectedCat} />
    </div>
  );
}
