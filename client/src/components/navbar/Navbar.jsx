import React from "react";

const Navbar = () => {
  return (
    <div className="flex h-fit w-full bg-[#000] mt-2">
      <a href="">
        <div className="object-left">
          <img className="w-32 my-1" src={"/postal.png"} alt="" />
        </div>
      </a>
      <div className="text-white text-2xl space-x-16 ml-[20%] mt-6">
        <span>Features</span>
        <span>Categories</span>
        <span>Contact</span>
      </div>
      <div className="w-[150px] mt-6 ml-[30%]">
        <img src={"/search.png"} alt=""/>
      </div>
      <div className="w-[30px] mt-6 ml-[2%]">
        <img src={"/profile.png"} alt=""/>
      </div>
    </div>

  )
};

export default Navbar;