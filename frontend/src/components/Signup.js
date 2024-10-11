import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import signup from "../assets/images/signup.jpg";

export default function SignupPage() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
    setErrorMessage(""); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (signupData.password1 !== signupData.password2) {
      setErrorMessage("Passwords didn't match");
      return;
    }

    // Check for existing username and email
    try {
      const checkResponse = await axios.post(
        "http://127.0.0.1:8000/check_user/",
        {
          username: signupData.username,
          email: signupData.email,
        }
      );

      if (checkResponse.data.exists) {
        setErrorMessage(checkResponse.data.message);
        return; // Exit if username or email already exists
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "An error occurred");
        return;
      }
    }

    // Prepare the data for signup
    const userData = {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password1,
    };

    // Proceed with signup
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/signup/",
        userData
      );
      setMessage(response.data.message);
      setSignupData({
        username: "",
        email: "",
        password1: "",
        password2: "",
      });
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.error || "An error occurred");
    }
  };

  return (
    <div>
      <section className="vh-100 bg-light">
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {/* Left Section - Product Ad */}
            <div className="col-lg-6 d-none d-lg-flex h-100">
              <img
                src={signup}
                alt="signup Ad"
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Right Section - Signup Form */}
            <div className="col-lg-6 d-flex align-items-center">
              <div className="card-body p-5 text-black">
                <h3 className="mb-5 text-uppercase text-center">Sign Up</h3>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                {message && (
                  <div className="alert alert-success">{message}</div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={signupData.username}
                      className="form-control form-control-lg"
                      onChange={handleChange}
                      placeholder="Create Username"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={signupData.email}
                      className="form-control form-control-lg"
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password1"
                      name="password1"
                      value={signupData.password1}
                      className="form-control form-control-lg"
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      value={signupData.password2}
                      className="form-control form-control-lg"
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Sign Up
                    </button>
                  </div>
                </form>
                <hr className="my-4" />
                <div className="text-center">
                  <Link to="/login" className="text-decoration-none">
                    Already have an account?{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
