import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/category-products-effect.css"; // Your existing styles

export default function Category() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/category/"); // Update with your API endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mt-5">
      <center>
        <div className="mb-4 p-4 category-header">
          <h2 className="header-text">
            What Are You Looking For <span className="text-primary">?</span>
          </h2>
        </div>
      </center>

      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-4 mb-4 hover-container">
            <Link
              to={`/category/${category.name}`}
              className="card text-center"
              style={{ textDecoration: "none" }}
            >
              <div
                className="card-body position-relative container-body"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <div className="text-white w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 position-absolute top-0 start-0">
                  <h1 className="m-0 text-content">{category.name}</h1>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}
