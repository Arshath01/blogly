import { useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";

export default function Post({ selectedCat, myPost }) {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Use a function to set the category based on conditions
    const setCategoryBasedOnConditions = async () => {
      try {
        if (myPost) {
          // If myPost is available, set the category directly
          setCategory(myPost);
          console.log(myPost);
          return;
        }
        setLoading(true);

        // Fetch data from the API
        const response = await fetch(
          "https://blogly-api.onrender.com/api/getposts"
        );

        if (!response.ok) {
          console.error("Failed to fetch data");
          return;
        }
        setLoading(false);
        // Assuming response.json() returns an array of posts
        const { posts } = await response.json();

        if (selectedCat && selectedCat !== "All") {
          console.log(selectedCat);
          // Filter the data based on the selected category
          const categoryBasedData = posts.filter(
            (cat) => cat.category === selectedCat.toLowerCase()
          );
          setCategory(categoryBasedData);
        } else {
          // Set the entire data if no category selected or "All" is selected
          setCategory(posts);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    // Call the function
    setCategoryBasedOnConditions();
  }, [selectedCat, myPost]);
  return (
    <div className="">
      {category.length > 0 ? (
        loading ? (
          <Loading />
        ) : (
          Array.isArray(category) &&
          category.map((post, index) => (
            <div key={index} className="space-y-2 border-b-2 py-4">
              <div className="flex justify-between items-center">
                <h1>{post.title}</h1>
              </div>
              {post.image_url ? (
                <img
                  src={post.image_url}
                  alt="post-image"
                  className="w-full h-[250px] lg:h-[330px] object-cover"
                />
              ) : (
                <img
                  src="https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                  alt="preview-image"
                  className="w-[330px] mx-auto h-[330px]"
                />
              )}

              <div className="p-2 space-y-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={post.profile_url}
                    alt="profile-pic"
                    className="h-10 w-10 rounded-full object-cover"
                  />{" "}
                  <h3>{post.name}</h3>
                </div>

                <p>{post.description}</p>

                <ul className="">
                  {post.links &&
                    post.links.map((data, index) => (
                      <li
                        key={index}
                        className="text-sm text-blue-500 flex gap-2 items-center"
                      >
                        <div className="text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="20"
                            viewBox="0 0 640 512"
                          >
                            <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                          </svg>
                        </div>
                        <a href={data} target="blank">
                          {data.length > 40 ? data.slice(0, 40) + "..." : data}
                        </a>
                      </li>
                    ))}
                </ul>

                <div className="flex justify-between items-center text-sm py-1">
                  <span className="p-1 px-2 rounded-md bg-gray-800 text-white font-bold uppercase">
                    {post.category}
                  </span>
                  <span>{post.createdAt.split("T")[0]}</span>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <div className="h-[500px] flex flex-col justify-center items-center w-full rounded-lg  lg:p-4">
          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705104000&semt=ais"
            alt="no-posts"
            className="h-[300px] w-[300px] mx-auto object-cover"
          />
          <center className="text-red-500 font-bold uppercase">
            OOPS ! no posts
          </center>
        </div>
      )}
    </div>
  );
}
