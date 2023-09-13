import React, { useState } from "react";
import UilBars from "@iconscout/react-unicons/icons/uil-bars";
import UilSearch from "@iconscout/react-unicons/icons/uil-search";
import UilProfile from "@iconscout/react-unicons/icons/uil-user-circle";
import { MockDB } from "./MockDB.js";

export default function ProductFeed() {
  const [searchValue, setSearchValue] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);
  const [searchResults, setSearchResults] = useState(MockDB);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = MockDB.slice(firstIndex, lastIndex);
  const npage = Math.ceil(MockDB.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const totalPages = Math.ceil((searchTrue ? searchResults.length : MockDB.length) / recordsPerPage);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Create a function to handle changes in the search input
  const handleInputChange = (event) => {
    // Update the searchValue state with the new input value
    setSearchValue(event.target.value);
    console.log(searchValue);
  };
  const onClickSearch = (event) => {
    // Update the searchValue state with the new input value
    console.log(searchValue);

    const filteredResults = [...MockDB];
    // Filter items whose title contains the search value (case-insensitive)
    filteredResults = filteredResults.filter((product) => {
      return product.title.indexOf(searchValue.toLowerCase()) == -1;
    });

    setSearchResults(filteredResults);
    setSearchTrue(event);
  };

  return (
    <div>
      {/* Top Nav */}
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

      {/* Feed */}
      <div className="flex flex-row">
        {/* Filter */}
        <div className="hidden md:flex flex-col border-black border-r-[3px] w-[30%] space-y-4 items-center">
          <div className="border-2 flex justify-center p-3 rounded-2xl my-2">
            <div className="border-r-2 border-black px-2">
              <img
                src={"/Filter.png"}
                width="25"
                alt="Filter"
                className="mx-2"
              />
            </div>
            <span className="w-[80px]] px-8 font-serif">Filter</span>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col items-center w-full border-l-2">
          {searchTrue ? (
            <div className="mt-4 text-lg text-gray-700 text-center">
              Showing results for "<strong>{searchValue}</strong>"
            </div>
          ) : null}
          <div className="flex flex-wrap p-4 justify-center">
            {records.map((product, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-md hover:shadow-xl rounded-lg max-w-sm m-5 "
              >
                <a href="#">
                  <img
                    className="rounded-xl p-8"
                    src={product.imageUrl}
                    alt={product.imageAlt}
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tightw">
                      {product.title}
                    </h3>
                  </a>
                  {product.description}
                  <div className="flex items-center mt-2.5 mb-5">
                    {/* Render rating and other details here */}
                  </div>
                  <div className="flex items-center justify-between">
                    ₹ {product.price} / piece
                  </div>
                </div>
              </div>
            ))}
          </div>
        <nav className="m-4 justify-center">
        <ul className="pagination flex flex-row space-x-5">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link bg-black text-white p-2 rounded-md" onClick={() => {if(currentPage!=1){handlePageChange(currentPage - 1)}}}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item mt-2 ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link bg-black text-white p-2 rounded-md" onClick={() => {if(currentPage!=totalPages)handlePageChange(currentPage + 1)}}>
              Next
            </button>
          </li>
        </ul>
      </nav>
        </div>
      </div>
    </div>
  );
}
