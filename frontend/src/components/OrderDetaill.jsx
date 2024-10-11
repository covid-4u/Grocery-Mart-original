// src/components/OrderDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`/orders/${id}/`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the order details!", error);
      });
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order #{order.id}</h1>
      <p>Total Price: {order.total_price} USD</p>
      <p>Shipping Address: {order.shipping_address}</p>
      <p>Status: {order.status}</p>
      <h3>Order Items:</h3>
      <ul>
        {order.order_items.map((item) => (
          <li key={item.product.id}>
            {item.product.name} - {item.quantity} units - {item.price} USD
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
