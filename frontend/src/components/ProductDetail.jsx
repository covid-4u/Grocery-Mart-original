import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCart } from "./api.js";
import "../Style/ProductDetail.css";

const ProductDetail = (props) => {
  const location = useLocation();
  const product = location.state?.product;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      alert("No product found. Please go back and try again.");
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!props.user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    // Check if the product is in stock
    if (product.stock <= 0) {
      alert("This product is out of stock and cannot be added to the cart.");
      return;
    }

    try {
      await addToCart(product.id);
      setMessage("Product added successfully!");
      setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("You need to be logged in to add items to the cart.");
      if (error.response && error.response.status === 401) {
        alert("You need to be logged in to add items to the cart.");
      }
    }
  };

  const backgroundImage = product.image
    ? product.image.startsWith("http://127.0.0.1:8000")
      ? product.image
      : `http://127.0.0.1:8000${product.image}`
    : "http://127.0.0.1:8000/media/path/to/default/image.jpg";

  return (
    <div className="container product-detail-container">
      <div className="row">
        <div className="card h-100 product-card">
          <img
            src={backgroundImage}
            className="card-img-top product-img"
            alt={product.name}
          />
          <div className="card-body">
            <p className="card-title product-title">
              <b>{product.name}</b>
            </p>
            <p className="card-text product-text">
              <strong>Price:</strong> ${product.price} <br />
              <strong>Description:</strong> {product.description} <br />
              <strong>Ratings:</strong>{" "}
              <span className="text-dark">
                {"★".repeat(Math.floor(product.ratings))}
                {"☆".repeat(5 - Math.floor(product.ratings))} ({product.ratings}
                )
              </span>
              <br />
              <strong>Stock:</strong> {product.stock} left in stock
            </p>
            {product.stock <= 0 && (
              <div className="alert alert-danger">Out of stock</div>
            )}
            {message && <div className="alert alert-success">{message}</div>}
          </div>
          <div className="card-footer">
            <center>
              <button
                className="btn btn-primary mx-2"
                onClick={handleAddToCart}
                disabled={product.stock <= 0} // Disable button if out of stock
              >
                Add to Cart
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
