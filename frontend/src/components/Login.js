import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./auth.js"; // Adjust the path as necessary
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import "../assets/login.css";
import loginimage from "../assets/images/login.jpg";

export default function Login(props) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on submit
    try {
      const { token, user } = await login(
        loginData.username,
        loginData.password
      );

      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);
      localStorage.setItem("email", user.email);

      // Update user state in parent component
      props.setUser(user);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed", error.message);
      // Adjust this message based on your backend's response structure
      setErrorMessage(
        error.response?.data?.detail || "Invalid username or password."
      ); // Set error message for user
    }
  };

  return (
    <div>
      <section className="h-100" style={{ overflow: "hidden" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                ></i>
                <span className="h1 fw-bold mb-0">Grocey Mart</span>
              </div>
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                  <h3
                    className="fw-normal text-center mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
                  </h3>

                  {errorMessage && ( // Display error message if exists
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control form-control-lg mb-4"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={handleChange}
                    required // Added required attribute
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg mb-4"
                    placeholder="Password"
                    onChange={handleChange}
                    value={loginData.password}
                    required // Added required attribute
                  />
                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info w-100 btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <p className="small mb-5 pb-lg-2">
                    <Link to="/forgotpass" style={{ textDecoration: "none" }}>
                      Forgot password?
                    </Link>
                    <Link
                      to="/signup"
                      className="float-end"
                      style={{ textDecoration: "none" }}
                    >
                      New user?
                    </Link>
                  </p>
                </form>
              </div>
            </div>

            <div className="col-sm-6 px-0 d-none d-sm-block login-image">
              <img
                src={loginimage}
                alt="Login"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
