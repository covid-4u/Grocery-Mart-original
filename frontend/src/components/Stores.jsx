import React from "react";
import "../Style/Stores.css";

const storeLocations = [
  {
    id: 1,
    name: "Grocery Mart - Downtown",
    address: "123 Main St, Downtown City, State",
    phone: "(123) 456-7890",
    hours: "8:00 AM - 10:00 PM",
  },
  {
    id: 2,
    name: "Grocery Mart - Suburb",
    address: "456 Suburb Ave, Suburb City, State",
    phone: "(987) 654-3210",
    hours: "9:00 AM - 9:00 PM",
  },
  {
    id: 3,
    name: "Grocery Mart - West End",
    address: "789 West St, West End City, State",
    phone: "(555) 123-4567",
    hours: "7:00 AM - 11:00 PM",
  },
  // Add more stores as needed
];

export default function Stores() {
  return (
    <div className="container">
      <br />
      <h1>Our Stores</h1>
      <p>Find a Grocery Mart store near you.</p>

      <div className="row">
        {storeLocations.map((store) => (
          <div className="col-md-4" key={store.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{store.name}</h5>
                <p className="card-text">
                  <strong>Address:</strong> {store.address} <br />
                  <strong>Phone:</strong> {store.phone} <br />
                  <strong>Hours:</strong> {store.hours}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
