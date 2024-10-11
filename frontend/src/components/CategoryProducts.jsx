import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../Style/Category.css'
export default function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/products/category/${categoryName}/`
        );
        console.log("Products fetched:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const fetchProduct = (product_id) => {
    const product = products.find((product) => product.id === product_id);
    if (product) {
      navigate("/product_detail", { state: { product } });
    }
  };

  if (!products.length) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="container mt-5">
      <center>
        <div className="mb-4 p-4 category-header">
          <h2 className="header-text">Products in {categoryName} Category</h2>
        </div>
      </center>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => {
            const backgroundImage = product.image
              ? `http://127.0.0.1:8000${product.image}`
              : "http://127.0.0.1:8000/media/path/to/default/image.jpg";

            return (
              <div
                key={product.id}
                className="col-md-4 mb-4 hover-container"
                onClick={() => fetchProduct(product.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="card text-center">
                  <div
                    className="card-body position-relative container-body"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "250px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                      borderRadius: "15px",
                    }}
                  >
                    <div className="text-white w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 position-absolute top-0 start-0">
                      <h1 className="m-0 text-content">{product.name}</h1>
                    </div>
                  </div>
                  <div className="card-footer">
                    <strong>Price:</strong> ${product.price}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No products found for this category.</div>
        )}
      </div>
      <hr />
    </div>
  );
}
