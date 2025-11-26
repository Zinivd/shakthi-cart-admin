import axios from "axios";
import BASE_URL from "./baseUrl";
import ENDPOINTS from "./endpoints";

// AXIOS INSTANCE
const api = axios.create({
  baseURL: BASE_URL,
});

// ADD TOKEN AUTOMATICALLY
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.url === ENDPOINTS.LOGIN || config.url === ENDPOINTS.REGISTER) {
    return config;
  }
  if (!token) {
    localStorage.clear();
    window.location.href = "/";
    return config;
  }
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["Accept"] = "application/json";

  return config;
});

// ERROR HANDLING
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status >= 400 && status <= 599) {
      console.warn("API error:", status, "- Logging out...");
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// API FUNCTIONS (map endpoints here)
// LOGIN
export const loginApi = (payload) => {
  return api.post(ENDPOINTS.LOGIN, payload);
};

// LOGOUT
export const logoutApi = (payload) => {
  return api.post(ENDPOINTS.LOGOUT, payload);
};

// REGISTER
export const registerApi = (payload) => {
  return api.post(ENDPOINTS.REGISTER, payload);
};

// USER INFO
export const getUserInfo = (email) => {
  return api.get(ENDPOINTS.USERINFO, {
    params: { email: email },
  });
};

// GET ALL PRODUCTS
export const getProducts = () => {
  return api.get(ENDPOINTS.PRODUCTS);
};

// GET PRODUCT BY ID
export const getProductById = (id) => {
  return api.get(ENDPOINTS.PRODUCT_DETAILS(id));
};

// CREATE ORDER
export const createOrder = (payload) => {
  return api.post(ENDPOINTS.ORDERS, payload);
};

// ERROR HANDLER
export const errorHandler = (error) => {
  return {
    statusCode: error?.response?.status || 500,
    message: error?.response?.data?.message || "Something went wrong",
  };
};

export default api;
