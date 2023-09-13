import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/landing/Landing";
import LoginPage from "./pages/landing/login";
import ProductFeed from "./pages/product/ProductFeed";
import Productdesc from "./pages/productdesc/Productdesc";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ProductFeed />}></Route>
          <Route path="/Signin" element={<LoginPage />}></Route>
          <Route path="/product/:productId" Component={Productdesc}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;