import axios from "axios";
import { getAuth } from "firebase/auth";

const apiUrl = import.meta.env.VITE_DEV_API_URL;

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add interceptor to dynamically get the current token
api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
