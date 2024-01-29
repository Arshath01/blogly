import React, { useEffect, useState } from "react";
import { useUser } from "../../context/useContext";
import Post from "../Blog/Post";
import Loading from "../Loading/Loading";

export default function Mypost() {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      console.log(user);
      try {
        const response = await fetch(
          `https://blogly-api.vercel.app/api/mypost/${user.sub}`
        );

        if (response.ok) {
          const data = await response.json();
          setData(data);
          setLoading(false);
          console.log(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Welcome, {user.name} </h2>
      <Post myPost={data} />
    </div>
  );
}
