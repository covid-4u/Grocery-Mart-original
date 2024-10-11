import axios from "axios";

// Create an instance of axios with baseURL
const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Adjust as necessary
});

// Set the Authorization header for each request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust based on how you're storing the token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get the current user's username
const getCurrentUser = () => {
  return localStorage.getItem("username"); // Adjust as needed
};

// API function to add product to the cart
export const addToCart = async (productId, quantity = 1) => {
  const username = getCurrentUser(); // Get the username

  if (!username) {
    throw new Error("User is not logged in");
  }

  try {
    // Step 1: Fetch or create the cart for the user
    const cartResponse = await API.get(`/carts/`, {
      params: { username: username }, // Assuming you have an endpoint to get the cart by username
    });

    const cartId = cartResponse.data.id; // Adjust based on your response structure

    // Step 2: Add a product to the cart
    return API.post(`/cart-items/`, {
      cart: cartId, // Use the cart ID obtained from the previous step
      product: productId, // Adjusted field to match the backend
      quantity: quantity,
    });
  } catch (error) {
    console.error(
      "Error adding to cart:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error for handling in the calling function
  }
};

// API function to create an order
export const createOrder = () => {
  return API.post("/orders/");  
};

// API function to fetch the cart by username
export const fetchCart = async () => {
  try {
    const response = await API.get("/carts/");
    return response.data; // Adjust based on your response structure
  } catch (error) {
    console.error(
      "Error fetching carts:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error for handling in the calling function
  }
};

// Function to get cart items from the backend
const getCartItems = async () => {
  try {
    // Replace with your actual API endpoint for fetching cart items
    const response = await axios.get("http://127.0.0.1:8000/cart-items/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add authorization token if needed
      },
    });

    // Return the cart items from the response
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the cart items:", error);
    return [];
  }
};

export default getCartItems;
