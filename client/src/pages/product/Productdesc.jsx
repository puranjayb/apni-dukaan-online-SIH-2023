import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UilBars from "@iconscout/react-unicons/icons/uil-bars";
import UilSearch from "@iconscout/react-unicons/icons/uil-search";
import Uilcart from "@iconscout/react-unicons/icons/uil-shopping-cart-alt";
import { MockDB } from "./MockDB.js";
import { Link } from "react-router-dom";
import ProductFeed from "./ProductFeed.jsx";
import Footer from "../../components/footer/Footer.jsx";
import axios from "axios";
import qs from "qs";

export default function Productdesc() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  // const product = MockDB.find(
  //   (product) => product.ProductId === parseInt(productId)
  // );
  const [searchValue, setSearchValue] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);

  const handleInputChange = (event) => {
    // Update the searchValue state with the new input value
    setSearchValue(event.target.value);
  };
  const onClickSearch = (event) => {
    // Update the searchValue state with the new input value
    // console.log(searchValue);

    setSearchTrue(event);
  };

  const getData = () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/store/product?id=${id}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setProduct(response.data.product);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getRecommendations = () => {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/store/recommendations`,
      headers: {},
      data: {
        imageUrl: product.image,
      },
    };

    axios(config)
      .then(function (response) {
        setRecommendations(response.data.recommend_products_ids);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    async function fetchData() {
      await getData();
      await getRecommendations();
    }
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden">
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
      <div className="flex flex-col w-fit">
        <div className="flex flex-row justify-between p-3">
          <div className="font-semibold" onClick={() => navigate(-1)}>
            &lt; Back
          </div>
          <div className="border-2 flex flex-row space-x-2 w-[130px] p-2 rounded-lg">
            <Uilcart size="25" color="#000" className="" />
            <span>|</span>
            <span>My Cart</span>
          </div>
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col">
            <div className="border-2 md:w-[20%] p-5 mx-5 flex justify-center items-center rounded-2xl">
              <img src={product.image} alt="img" className="w-screen" />
            </div>
            <div className="flex flex-col md:hidden">
              <span className="text-2xl border-b-2 border-black m-3 text-center">
                {product.name}
              </span>
              <div className="flex flex-row text-2xl border-b-2 border-black m-3 space-x-5">
                <span className="text-red-600 text-center text-lg">
                  -{product.discount}%
                </span>
                <span className=" text-center">₹ {product.price}</span>
                <span className=" text-center text-gray-500 text-sm mt-2 line-through">
                  MRP : {product.price}
                </span>
              </div>
            </div>
            <div className="flex w-fit flex-col ml-[30%] lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10 mt-4 md:ml-5">
              <button className="bg-[#FFD814] p-3 px-8 rounded-lg font-semibold">
                Add To Cart
              </button>
              <button className="bg-[#FFA41C] p-3 px-8 rounded-lg font-semibold">
                Buy Now
              </button>
            </div>
          </div>
          <div className="md:flex flex-col -ml-[90%] hidden w-[50%]">
            <span className="text-2xl py-6 border-b-2 border-black m-3">
              {product.name}
            </span>
            <div className="flex flex-row text-2xl py-6 border-b-2 border-black m-3 space-x-5">
              <span className=" text-center">MRP :₹ {product.price}</span>
            </div>
            <div className="flex flex-col py-6 border-b-2 border-black ml-4">
              <span>Offers</span>
              <div className="flex flex-row space-x-8 my-2">
                <div className="border-2 border-black p-4 rounded-lg">
                  No Cost EMI
                </div>
                <div className="border-2 border-black p-4 rounded-lg">
                  Bank Offer
                </div>
                <div className="border-2 border-black p-4 rounded-lg">
                  Partner Offer
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-4 ml-5">
              <div className="flex flex-row md:space-x-2">
                <img className="h-[20px]" src={"/truckb.png"} alt="truck" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-row md:space-x-2">
                <span>Cash On Delivery</span>
                <img className="h-[20px]" src={"/cash.png"} alt="truck" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-black m-10">
        <div className="flex flex-wrap p-4 justify-center">
          {/* {records.map((product, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-md hover:shadow-xl rounded-lg max-w-sm m-5"
              >
                <a href="#">
                  <img
                    className="rounded-xl p-8 w-64"
                    src={product.imageUrl}
                    alt={product.imageAlt}
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight flex flex-row flex-wrap">
                      {product.title}
                    </h3>
                  </a>
                  {product.description}
                  <div className="flex items-center mt-2.5 mb-5">
                  </div>
                  <div className="flex items-center justify-between">
                    ₹ {product.price} / piece
                  </div>
                </div>
              </div>
            ))} */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
