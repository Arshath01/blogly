import React, { useEffect, useState } from "react";
import { decodeToken } from "../../utils/decodeToken";
import { useUser } from "../../context/useContext";
import { listOfCategory } from "../Blog/Category";

const CreatePost = () => {
  const { createPost, myPostSection } = useUser();

  const local_storage = localStorage.getItem("authToken");
  const decodedToken = decodeToken(local_storage);
  // scroll to top
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  npm;

  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    description: "",
    links: [],
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [linkEventChange, setLinkEventChange] = useState("");

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle adding a link to the links array
  const handleAddLink = (e) => {
    e.preventDefault();
    linkEventChange &&
      setFormData((prevFormData) => ({
        ...prevFormData,
        links: [...prevFormData.links, linkEventChange],
      }));
    setLinkEventChange("");
  };

  // handle Linke delete
  function handleLinkDelete(e, link) {
    e.preventDefault();
    const filteredLink = formData.links.filter((prevLink) => prevLink !== link);
    setFormData({
      ...formData,
      links: filteredLink,
    });
  }

  // Function to handle changing a link in the links array
  const handleLinkChange = (e) => {
    setLinkEventChange(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, picture, sub } = decodedToken;

    const postData = {
      name: name,
      email: email,
      profile_url: picture,
      uid: sub,
      posts: formData,
    };
    console.log(formData);
    fetch("https://blogly-api.vercel.app/api/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        createPost(false);
        myPostSection(false);
        console.log("post created", response);
      })
      .catch((err) => console.log("error in creating post", err));
  };

  // handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    // Check if an image has been selected
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.click();

    // Using useState callback to get the updated image state
    fileInput.addEventListener("change", async (e) => {
      const selectedImage = e.target.files[0];
      console.log("Selected image:", selectedImage);

      const upload_preset = "mvwvohnn";
      const cloud_name = "dvkkopg5w";
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", upload_preset);
      formData.append("cloud_name", cloud_name);

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const imageData = await response.json();
          setFormData((prevFormData) => ({
            ...prevFormData,
            image_url: imageData.url,
          }));
        } else {
          console.error("Error uploading image to Cloudinary:", response);
        }
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className=" mt-8 p-2 bg-white rounded-md ">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-600"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="upload_image"
            className="block text-sm font-semibold text-gray-600"
          >
            Upload Image:
          </label>
          <div className="h-[300px] w-full flex justify-center items-center border border-dashed  rounded-lg">
            {formData.image_url ? (
              <img
                src={formData.image_url}
                alt="post-image"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col justify-end items-end h-full w-full relative">
                <input
                  type="file"
                  id="upload_image"
                  style={{ display: "none" }}
                  name="upload_image"
                  className="bg-gray-200 none"
                />
                {loading ? (
                  <span className="h-5 w-5 border-t rounded-full border-blue-900 animate-spin"></span>
                ) : (
                  <div className="flex flex-col relative h-full w-full">
                    <img
                      src="https://www.appsierra.com/_next/image?url=https%3A%2F%2Fduws858oznvmq.cloudfront.net%2FFunctionality_With_J_Meter_0f039feee0.webp&w=640&q=100"
                      className="h-[90%] object-cover lg:object-center w-full"
                      alt="preview"
                    />
                    <button
                      className="bg-blue-500 text-white rounded-t-lg font-bold text-sm p-2 w-full"
                      onClick={handleImageUpload}
                    >
                      Upload
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="my-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-600"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="links"
            className="block text-sm font-semibold text-gray-600"
          >
            Add Links
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              id="links"
              name="links"
              value={linkEventChange}
              onChange={handleLinkChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
            <button
              className="btn bg-blue-500 text-sm font-bold  w-[15%] rounded-lg text-white"
              onClick={handleAddLink}
            >
              Add
            </button>
          </div>
          <ul className="my-2  w-full  bg-slate-100 ">
            {formData.links &&
              formData.links.map((link, index) => (
                <div key={index} className="flex justify-between">
                  <li className="text-sm text-blue-700 p-2 w-full  border-b">
                    {link}
                  </li>
                  <button
                    className="bg-red-600 p-2 w-10"
                    onClick={(e) => handleLinkDelete(e, link)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                      fill="white"
                      className="mx-auto"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>
                </div>
              ))}
          </ul>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-600"
          >
            Category:
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          >
            <option value="">---Select Category---</option>
            {listOfCategory.slice(1, -1).map((category, index) => (
              <option key={index} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
