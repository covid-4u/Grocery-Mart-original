import React from "react";
import Ads from "./components/Ad-section";
import "./Home.css";
import ProductList from "./components/ProductList";
import Category from "./components/Category";

export default function Home({ userLoggedInStatus }) {
  return (
    <div>
      <Ads isLoggedIn={userLoggedInStatus} />
      <Category />
      <ProductList />
    </div>
  );
}
