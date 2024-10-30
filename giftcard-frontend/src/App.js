import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import './App.css';
import Cart from "./components/Cart";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
