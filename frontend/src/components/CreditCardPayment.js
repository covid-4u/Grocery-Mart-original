import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreditCardPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic validation
    if (!cardNumber || !expirationDate || !cvv) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Here you would handle the payment process
    alert("Payment submitted successfully!");
    // Reset the form
    setCardNumber("");
    setExpirationDate("");
    setCvv("");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1>Credit Card Payment</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Card Number:</label>
          <input
            type="text"
            className="form-control"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Expiration Date:</label>
          <input
            type="text"
            className="form-control"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CVV:</label>
          <input
            type="text"
            className="form-control"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CreditCardPayment;
