import React from "react";

const BankTransferPayment = () => {
  return (
    <div className="container mt-5">
      <h1>Bank Transfer</h1>
      {/* Bank transfer instructions go here */}
      <p>Please transfer the amount to the following bank details:</p>
      <p>Account Number: 1234567890</p>
      <p>Bank Name: Example Bank</p>
      <button className="btn btn-primary">Confirm Transfer</button>
    </div>
  );
};

export default BankTransferPayment;
