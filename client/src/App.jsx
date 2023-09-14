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
          {/* <Route path="/Signin" element={<LoginPage />}></Route> */}
          <Route path="/update" element={<UpdateDetails />}></Route>
          <Route path="/:url/addproduct" element={<AddProduct />}></Route>
          <Route path={`/:url`} element={<ProductFeed />}></Route>
          <Route path="/:store/products/:id" element={<Productdesc />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
