import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/landing/Landing";
import Navbar from "./components/navbar/Navbar"
import ProductFeed from "./pages/landing/product/ProductFeed";


function App() {
  return (

    <div>
    <Router>
      <Routes>
        <Route path="/" element={<ProductFeed/>}>
        </Route>
      </Routes>
    </Router>
  </div>
    )
}

export default App;
