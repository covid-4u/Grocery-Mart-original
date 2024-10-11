import React from "react";
import "../Style/About.css"; // Custom CSS if you want to add more style
import shopping from "../assets/images/shopping.jpg";
import FarmersMarket from "../assets/images/FarmersMarket.jpg";

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="container mt-5">
        {/* Hero Section */}
        <div className="jumbotron text-center bg-light py-5 mb-5 shadow-sm">
          <h1 className="display-4">Who We Are</h1>
          <p className="lead">
            At Grocery Mart, we believe in delivering freshness, quality, and
            convenience to your doorstep. Our mission is to revolutionize the
            way you shop for groceries.
          </p>
        </div>

        {/* Mission Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src={shopping}
              alt="Groceries"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-4">Our Mission</h2>
            <p style={{ fontSize: "1.1rem" }}>
              Our goal is simple: to provide you with a seamless and hassle-free
              grocery shopping experience. From fresh produce to household
              essentials, we ensure everything is sourced responsibly and
              delivered with care.
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              We are committed to making your life easier while ensuring
              sustainability and supporting local farmers and suppliers.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section text-center mb-5">
          <h2 className="mb-4">Meet the Team</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Ankita Vakeriya</h5>
                  <p className="card-text">
                    Div: A5
                    <br /> Branch: CE
                    <br />
                    Roll no. 142 <br />
                    Enrollment no. 22002170110___
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Vaibhav Solanki</h5>
                  <p className="card-text">
                    Div: A5
                    <br /> Branch: CE
                    <br />
                    Roll no. 143 <br />
                    Enrollment no. 22002170110184
                    <br />
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Vasu Lee</h5>
                  <p className="card-text">
                    Div: A5
                    <br /> Branch: CE
                    <br />
                    Roll no. 143 <br />
                    Enrollment no. 22002170110184
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Akal </h5>
                  <p className="card-text">
                    Div: A5
                    <br /> Branch: CE
                    <br />
                    Roll no. 143 <br />
                    Enrollment no. 22002170110184
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Helly Patel</h5>
                  <p className="card-text">
                    Div: A5
                    <br /> Branch: CE
                    <br />
                    Roll no. 164 <br />
                    Enrollment no. 22002170110___
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <img
              src={FarmersMarket}
              alt="Farmers Market"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6 order-md-1">
            <h2 className="mb-4">Our Vision</h2>
            <p style={{ fontSize: "1.1rem" }}>
              We aim to bridge the gap between local producers and consumers. By
              delivering the freshest products and maintaining transparent
              supply chains, we are transforming the future of grocery shopping.
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              Sustainability is at the heart of everything we do. From
              eco-friendly packaging to reducing food waste, we are taking every
              step to protect the planet while serving you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
