// ShowCart.jsx
import React, { useEffect, useState } from "react";
import { fetchCart } from "./api";

const ShowCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCart()
      .then((response) => {
        setCartItems(response.data);
        const total = response.data.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        setTotalPrice(total);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const handleCheckout = () => {
    // Implement checkout functionality here
    alert("Proceeding to checkout!");
  };

  return (
    <div className="show-cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <h4>{item.product.name}</h4>
                <p>
                  Price: ${item.product.price} x {item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default ShowCart;
