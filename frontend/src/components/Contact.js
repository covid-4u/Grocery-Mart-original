import React from "react";
import "../Style/Contact.css";

export default function Contact() {
  return (
    <div className="contact-us-container">
      <br />
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Reach out to us with any questions or
          inquiries.
        </p>
      </div>

      <div className="contact-info">
        <div className="contact-card">
          <h2>Customer Support</h2>
          <p>Email: support@grocerymart.com</p>
          <p>Phone: +1 (234) 567-8901</p>
          <p>Hours: 9:00 AM - 6:00 PM (Mon-Fri)</p>
        </div>

        <div className="contact-card">
          <h2>Corporate Office</h2>
          <p>123 Business Ave, Tech City, State, 12345</p>
          <p>Email: corporate@grocerymart.com</p>
          <p>Phone: +1 (987) 654-3210</p>
        </div>
      </div>

      <div className="contact-form-section">
        <div className="contact-section text-center mb-5">
          <h2 className="mb-4">Get in Touch</h2>
          <p style={{ fontSize: "1.2rem" }}>
            We’d love to hear from you! For inquiries, feedback, or support,
            feel free to reach out to us:
          </p>
          <p>
            <strong>Email:</strong> support@grocerymart.com <br />
            <strong>Phone:</strong> +1 (234) 567-8901
          </p>
          <a
            className="btn btn-outline-primary mt-3"
            href="mailto:support@grocerymart.com"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
