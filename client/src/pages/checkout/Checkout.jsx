import React, { useState } from "react";

import UilBars from "@iconscout/react-unicons/icons/uil-bars";
import UilSearch from "@iconscout/react-unicons/icons/uil-search";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [searchValue, setSearchValue] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleInputChange = (event) => {
    // Update the searchValue state with the new input value
    setSearchValue(event.target.value);
    console.log(searchValue);
  };
  const onClickSearch = (event) => {
    // Update the searchValue state with the new input value
    console.log(searchValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // You can handle the form data here, e.g., send it to a server
    console.log("Form submitted:", { productName, category, price, desc ,selectedImage });
  };

  return (
    <div>
      <div className="bg-black flex justify-between text-white px-2 md:px-10 lg:px-24 py-3 text-xs">
        <div className="flex flex-row md:space-x-2">
          <img className="h-[20px]" src={"/phone.png"} alt="" />
          <span className="w-[150px]">Call Us: 987-987-678 </span>
        </div>
        <div className="flex flex-row md:space-x-2">
          <img className="h-[20px]" src={"/truck.png"} alt="" />
          <span>Free Shipping</span>
        </div>
        <a
          href="https://www.mygov.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.mygov.in
        </a>
      </div>

      {/* Searchbar Nav */}
      <div className="bg-[#08122B] flex flex-row px-1 md:px-3 py-3 justify-between items-center">
        <img src={"/Postal.png"} alt="" className="w-24 md:w-auto" />
        <div className="bg-black my-7 rounded-3xl flex-row p-3 space-x-3 items-center hidden md:flex">
          <UilBars size="25" color="#FFF" />
          <span className="text-white">Categories</span>
          <div className="bg-gray-[#D9D9D9] flex relative">
            <input
              type="text"
              placeholder="Search for Toys, Clothes"
              className="p-1 md:p-3 rounded-3xl w-96"
              value={searchValue}
              onChange={(e) => {
                handleInputChange(e);
                onClickSearch(false);
                // Example: handleSecondChange(e);
              }}
            />
            <button onClick={() => onClickSearch(true)}>
              <UilSearch
                size="25"
                color="#000"
                className="absolute right-1 top-1 md:right-4 md:top-3"
              />
            </button>
          </div>
        </div>
        <div className="bg-gray-[#D9D9D9] flex relative md:hidden">
          <input
            type="text"
            placeholder="Search for Toys, Clothes"
            className="p-1 md:p-3 rounded-3xl w-48"
            value={searchValue}
            onChange={(e) => {
              handleInputChange(e);
              onClickSearch(false);
              // Example: handleSecondChange(e);
            }}
          />
          <button onClick={() => onClickSearch(true)}>
            <UilSearch
              size="25"
              color="#000"
              className="absolute right-1 top-1 md:right-4 md:top-3"
            />
          </button>
        </div>
        <button>
          <img src={"/profile.png"} width="40" alt="profile" />
        </button>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between p-3">
          <Link to="/update" className="font-semibold">
            &lt; Back
          </Link>
        </div>
      </div>
      <div className="px-24 flex flex-col items-center">
        <span className="text-2xl block text-center font-semibold">
          Add Product
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:w-[60%] justify-center items-center mt-5"
        >
          <label htmlFor="productname"></label>
          <input
            type="text"
            id="Productname"
            name="Productname"
            placeholder="Enter Product Name"
            required
            value={productName}
            className="border-2 w-full rounded-3xl block self-center p-2 py-3"
            onChange={(e) => setProductName(e.target.value)}
          />
          <br />
          <label htmlFor="Catefory"></label>
          <input
            type="text"
            id="Category"
            name="Category"
            placeholder="Enter Category"
            required
            value={category}
            className="border-2 w-full rounded-3xl block self-center p-2 py-3"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />

          <label htmlFor="Price"></label>
          <input
            type="number"
            id="Price"
            className="border-2 w-full rounded-3xl block self-center p-2 py-3"
            placeholder="Enter Price "
            name="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label htmlFor="Description"></label>
          <input
            type="text"
            id="Description"
            className="border-2 w-full rounded-3xl block self-center p-2 py-3"
            placeholder="Enter Product Description "
            name="Description"
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <br />

          <div class="relative">
            <label
              title="Click to upload"
              for="button2"
              class="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300  before:bg-gray-100 before:absolute before:inset-0 before:rounded-2xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
            >
              <div class="w-max relative">
                <img
                  class="w-12"
                  src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                  alt="file upload icon"
                  width="512"
                  height="512"
                />
              </div>
              <div class="relative">
                <span class="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
                  Upload a file
                </span>
                <span class="mt-0.5 block text-sm text-gray-500">
                  Max 2 MB
                </span>
              </div>
            </label>
            <input hidden="" type="file" name="button2" id="button2" onChange={handleImageChange}/>
          </div>
          <br />
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
          <br />
          <span className="w-full border-b-2 border-black"></span>

          <div className="flex flex-col md:flex-row justify-even px-10 mb-10 space-x-10 mt-8">
            <input
              type="submit"
              value="Add"
              className="text-2xl p-3 bg-yellow-500  rounded-2xl text-white hover:text-gray-300"
            />
          </div>
        </form>
        <button className="bg-[#0075FF] text-white p-3 text-2xl rounded-2xl hover:text-gray-300">
          Done
        </button>
      </div>
      <Footer />
    </div>
  );
}
