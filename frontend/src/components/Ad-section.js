import React from "react";
import "../assets/ad-styling.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image1 from "../assets/images/g1.jpg";
import Image2 from "../assets/images/g2.jpg";
import Image3 from "../assets/images/g3.jpg";

export default function HomePage({ isLoggedIn }) {
  const ads = [
    {
      img: Image1,
      title: "Fresh Harvest",
      description:
        "Explore our selection of the freshest organic produce available.",
    },
    {
      img: Image2,
      title: "Homemade Goodness",
      description:
        "Savor the flavors of our artisanal dairy and baked products.",
    },
    {
      img: Image3,
      title: "Flavors of Nature",
      description:
        "Enhance your cooking with our range of unique organic spices.",
    },
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Your Local Market</h1>
      </div>

      <div className="container" id="featured-products">
        <h2 className="section-title">Discover Our Offerings</h2>
        <div className="row">
          {ads.map((ad, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm">
                <img src={ad.img} className="card-img-top" alt={ad.title} />
                <div className="card-body">
                  <h5 className="card-title">{ad.title}</h5>
                  <p className="card-text">{ad.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isLoggedIn && (
        <div className="call-to-action">
          <h2>Join Our Community</h2>
          <p>Sign up for exclusive offers and fresh updates!</p>
          <a href="/signup" className="btn btn-warning">
            Sign Up
          </a>
        </div>
      )}
    </div>
  );
}
