import React, { useState } from "react";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function UpdateDetails() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [shopUrl, setShopUrl] = useState('');
    const [gstIN, setGstIN] = useState('');
    
    
  const [isEditing, setIsEditing] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // You can handle the form data here, e.g., send it to a server
    console.log('Form submitted:', { firstName, middleName ,lastName, email, phone, isSeller , shopUrl , gstIN});
  };

  const toggleExtraFields = () => {
    setIsSeller(!isSeller);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between p-3">
          <Link to="/Signin" className="font-semibold">
            &lt; Back
          </Link>
          <div className="space-x-2 w-[130px] p-2 rounded-lg">
            <img src={"/translate.png"} alt="" />
          </div>
        </div>
        <div className="px-16 w-[80%] block self-center">
          <span className="text-2xl block text-center font-semibold">
            Basic Details
          </span>
          <div className="flex justify-end">
            <button
              className="bg-red-500 font-medium text-white p-2 px-4 rounded-lg hover:text-gray-200"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Edit..." : "Edit"}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center mt-5">
            <label  htmlFor="firstName"></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter First Name "
              value={firstName}
              className="border-2 w-full rounded-3xl block self-center p-2 py-3"
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing} // Disable the field if not in editing mode
              />
            <br />
            <label  htmlFor="middleName"></label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              placeholder="Enter Middle Name "
              value={middleName}
              className="border-2 w-full rounded-3xl block self-center p-2 py-3"
              onChange={(e) => setMiddleName(e.target.value)}
              disabled={!isEditing} // Disable the field if not in editing mode
              />
            <br />

            <label htmlFor="lastName"></label>
            <input
              type="text"
              id="lastName"
              className="border-2 w-full rounded-3xl block self-center p-2 py-3"
              placeholder="Enter Last Name "
              name="lastNam"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing} // Disable the field if not in editing mode
              />
            <br />

            <input
              type="email"
              id="email"
              placeholder="Enter Email Here"
              name="emai"
              className="border-2 w-full rounded-3xl block self-center p-2 py-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled="true" // Disable the field if not in editing mode
            />
            <br />
            <label htmlFor="phone"></label>
            <input
              type="number"
              id="phone"
              placeholder="Enter Phone Number *"
              name="Phon"
              className="border-2 w-full rounded-3xl block self-center p-2 py-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing} // Disable the field if not in editing mode
            />
            <br />

            <label>
              <input
                type="checkbox"
                checked={isSeller}
                onChange={toggleExtraFields}
              />
              I’m a Seller
            </label>
            {isSeller && (
              <>
                <label htmlFor="shopURL" className="mt-4"></label>
                <input
                  type="text"
                  id="shopURL"
                  name="shopURL"
                  required
                  placeholder="Enter Shop URL *"
                  className="border-2 w-full rounded-3xl block self-center p-2 py-3"
                  onChange={(e) => setShopUrl(e.target.value)}
                  disabled={!isEditing}
                />
                <br />
                <label htmlFor=""></label>
                <input
                  type="number"
                  id="GSTIN Number"
                  name="GSTIN Number"
                  required
                  placeholder="GSTIN Number *"
                  className="border-2 w-full rounded-3xl block self-center p-2 py-3 mb-9"
                  onChange={(e) => setGstIN(e.target.value)}
                  disabled={!isEditing}
                />
                <br />
              </>
            )}


            {isEditing && (
              <input type="submit" value="Proceed" className="text-2xl p-3 bg-yellow-500 w-fit self-center rounded-2xl mb-7 text-white hover:text-gray-300"/>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
