import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/landing/Landing";
import LoginPage from "./pages/landing/login";
import ProductFeed from "./pages/product/ProductFeed";
import Productdesc from "./pages/product/Productdesc";
import UpdateDetails from "./updateDetails/UpdateDetails";
import AddProduct from "./pages/product/AddProduct";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<ProductFeed />}></Route> */}
          {/* <Route path="/Signin" element={<LoginPage />}></Route> */}
          {/* <Route path="/product/:productId" Component={Productdesc}></Route> */}
          <Route path="/update" element={<UpdateDetails/>}></Route>
          <Route path="/addproduct" element={<AddProduct/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
