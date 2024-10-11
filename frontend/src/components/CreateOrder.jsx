import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import getCartItems from "./api.js";

const CreateOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems(); // Fetch cart items
        setCartItems(items);
        const response = await axios.get(`http://127.0.0.1:8000/carts/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCart(response.data[0].id);
      } catch (err) {
        setError("Failed to load cart items");
        console.error(err);
      }
    };
    fetchCartItems();
  }, []);

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.total_price) || 0; // Ensure it's a number
        return total + price;
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare order data
    const orderData = {
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      // Include cart items in the order data if necessary
    };

    // If payment method is COD, proceed with order creation
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/orders/",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Order created:", response.data);
      navigate("/"); // Redirect after successful order creation
    } catch (error) {
      console.error(
        "There was an error creating the order!",
        error.response.data
      );
      setError("Error creating order. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create New Order</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Shipping Address:</label>
          <input
            type="text"
            className="form-control"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Method:</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="CC">Credit Card</option>
            <option value="PP">PayPal</option>
            <option value="BT">Bank Transfer</option>
          </select>
        </div>

        <h3>Cart Items:</h3>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div className="mb-3" key={item.id}>
                <p>
                  <strong>Product: {item.product_name}</strong>
                </p>
                <p>
                  <strong>Price:</strong> $
                  {parseFloat(item.total_price).toFixed(2)}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
            ))}
            <h4>Total Price: ${calculateTotalPrice()}</h4>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={cartItems.length === 0}
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
