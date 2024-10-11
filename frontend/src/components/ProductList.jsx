import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../Style/ProductList.css"; // Custom styles

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search");
  const startIndex = currentPage * itemsPerPage;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products!", error);
      });
  }, []);

const filteredProducts = searchTerm
  ? products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : products;


  const selectedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const fetchProduct = (product_id) => {
    const product = products.find((product) => product.id === product_id);
    if (product) {
      navigate("/product_detail", { state: { product } });
    }
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="container my-5">
        <br />
        <br />
        <div className="alert alert-danger text-center" role="alert">
          <h4 className="alert-heading">Oops! No Products Found</h4>
          <p>We couldn't find any products matching your search.</p>
          <hr />
          <p className="mb-0">Try adjusting your search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <br />
      <h2 className="text-center mb-4" style={{ fontFamily: "Georgia, serif" }}>
        Explore Our Products
      </h2>
      <div className="row">
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => fetchProduct(product.id)}
            className="col-md-3 mb-4" // Adjusted column size
            style={{ cursor: "pointer" }}
          >
            <div
              className="product-card shadow-sm"
              style={{ borderRadius: "8px" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }} // Reduced height
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ color: "#2a9d8f", fontSize: "1rem" }}
                >
                  {product.name}
                </h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">
                  <span className="text-warning">
                    {"★".repeat(Math.floor(product.ratings))}
                    {"☆".repeat(5 - Math.floor(product.ratings))} (
                    {product.ratings})
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ProductList;
