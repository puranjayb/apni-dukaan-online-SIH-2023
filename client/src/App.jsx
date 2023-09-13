import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/landing/Landing";
// import Navbar from "./components/navbar/Navbar"
import ProductFeed from "./pages/product/ProductFeed";
import { MockProductDesc } from "./pages/productdesc/MockProductDesc";
import Productdesc from "./pages/productdesc/Productdesc";
import Footer from "./components/footer/Footer";


function App() {
  return (

    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Productdesc/>}></Route>
        <Route path="/product-feed" element={<ProductFeed/>}>
        </Route>
      </Routes>
    </Router>
    <Footer/>
  </div>
    )
}

export default App;