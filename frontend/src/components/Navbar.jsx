import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import "../assets/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ searchTerm: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const searchProducts = (e) => {
    e.preventDefault();
    if (!props.user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    if (!searchData.searchTerm) {
      alert("Please enter a search term!");
      return;
    }
    localStorage.setItem("searchTerm", searchData.searchTerm);
    navigate(
      `/product_list?search=${encodeURIComponent(searchData.searchTerm)}`
    );
    setSearchData({ searchTerm: "" });
  };

  const handleLogout = () => {
    props.onLogout(); // Call the logout function passed from Home
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-main-body fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt="Grocery Mart Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "1px solid white", backgroundColor: "white" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mx-5 me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link nv-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nv-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nv-link" to="/stores">
                Stores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nv-link" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={searchProducts}>
            <input
              className="form-control me-2 search-bar"
              type="search"
              placeholder="Search for products"
              aria-label="Search"
              name="searchTerm"
              value={searchData.searchTerm}
              onChange={handleChange}
            />
            <button
              className="btn btn-accent text-light search-button"
              type="submit"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          {props.user ? (
            <>
              <Link
                to="/profile"
                className="btn btn-light mx-3"
                style={{ borderRadius: "50%" }}
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <button onClick={handleLogout} className="btn btn-danger mx-3">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-light mx-3">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
