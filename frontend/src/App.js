import { React, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Only use BrowserRouter here
import "./App.css";
import Home from "./Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import ProductDetail from "./components/ProductDetail";
import Category from "./components/Category";
import CategoryProducts from "./components/CategoryProducts";
import About from "./components/About";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import ShowCart from "./components/ShowCart";
import OrderList from "./components/OrderLIst";
import OrderDetail from "./components/OrderDetaill";
import CreateOrder from "./components/CreateOrder";
import CreditCardPayment from "./components/CreditCardPayment";
import PayPalPayment from "./components/PayPalPayment";
import BankTransferPayment from "./components/BankTransferPayment";
import Stores from "./components/Stores";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Contact from "./components/Contact";

function App() {
  const [user, setUser] = useState(null); // State to manage user login status

  // Function to check for user in local storage
  const userLoginStatus = () => {
    const savedUser = localStorage.getItem("user"); // Get user from localStorage
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse and set the user state
    }
  };

  // Save user to localStorage after login
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
    setUser(userData); // Set the user state
  };

  // Handle logout by clearing localStorage
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setUser(null); // Clear user state
  };

  useEffect(() => {
    userLoginStatus(); // Check login status on component mount (or page load)
  }, []);

  return (
    <div className="main-page">
      <BrowserRouter>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home userLoggedInStatus={user} />} />
            <Route path="/login" element={<Login setUser={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/product_detail"
              element={<ProductDetail user={user} />}
            />
            <Route
              path="/category/:categoryName"
              element={<CategoryProducts />}
            />
            <Route path="/category" element={<Category />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/product_list" element={<ProductList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/cart" element={<ShowCart />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/CC" element={<CreditCardPayment />} />
            <Route path="/PP" element={<PayPalPayment />} />
            <Route path="/BT" element={<BankTransferPayment />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
