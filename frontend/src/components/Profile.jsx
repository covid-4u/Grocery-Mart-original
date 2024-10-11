import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/profile.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash } from "@fortawesome/free-solid-svg-icons"; // Correct icon import
import axios from "axios";

export default function Profile() {
  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
  });
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
      setUserdata({ username, email });
    }

    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("http://127.0.0.1:8000/cart-items/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/cart-items/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleBuyNow = () => {
    try {
      navigate("/create-order");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("You need to be logged in to add items to the cart.");
      if (error.response && error.response.status === 401) {
        alert("You need to be logged in to add items to the cart.");
      }
    }
  };

  return (
    <div className="container mt-5 profile-container">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="row g-0">
              <div className="col-md-4 text-white text-center bg-primary p-4">
                <FontAwesomeIcon
                  icon={faUser}
                  className="bg-light text-dark p-3 display-4 mb-3 rounded-circle shadow"
                />
                <h4 className="mb-1">{userdata.username}</h4>
                <p className="mb-2">Profile</p>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    Hello, {userdata.username}!
                  </h5>
                  <p className="card-text text-muted">
                    Manage your account details and view the items in your
                    shopping cart. You can update or remove items directly from
                    this page.
                  </p>

                  <hr />

                  <h6 className="mb-4">Account Information</h6>
                  <p>
                    <strong>Email:</strong> {userdata.email}
                  </p>

                  <hr />

                  <h6>Your Shopping Cart</h6>
                  {loading ? (
                    <div className="text-center py-3">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                          <li
                            key={item.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h6 className="mb-1">{item.product_name}</h6>
                              <p className="mb-0 text-muted">
                                Quantity: {item.quantity} | Total: $
                                {item.total_price}
                              </p>
                            </div>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteCartItem(item.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />{" "}
                              {/* Correct icon usage */}
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-center text-muted">
                          Your cart is empty.
                        </li>
                      )}
                    </ul>
                  )}
                  <button
                    className="btn btn-secondary mx-2"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
