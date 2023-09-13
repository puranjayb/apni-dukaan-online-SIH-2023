import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/landing/Landing";
import Navbar from "./components/navbar/LoginNavbar"
import LoginPage from "./pages/landing/login";


function App() {
  return (

    <div>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}>
        </Route>
      </Routes>
    </Router>
  </div>
    )
}

export default App;