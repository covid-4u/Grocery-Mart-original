import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Adjust as necessary
});

export const login = async (username, password) => {
  try {
    const response = await API.post("/login/", { username, password });
    const token = response.data.access;

    // Decode token
    const decodedToken = jwtDecode(token);

    return {
      token,
      user: {
        username: decodedToken.username,
        email: decodedToken.email,
      },
    };
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Login failed");
  }
};
