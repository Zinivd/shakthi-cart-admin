import axios from "axios";
import BASE_URL from "./baseUrl";
import ENDPOINTS from "./endpoints";
import { toast } from "react-toastify";

// AXIOS INSTANCE
const api = axios.create({
  baseURL: BASE_URL,
});

// ADD TOKEN AUTOMATICALLY
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (
    config.url.includes(ENDPOINTS.LOGIN) ||
    config.url.includes(ENDPOINTS.REGISTER)
  ) {
    return config;
  }
  if (!token) {
    localStorage.clear();
    window.location.href = "/login";
    return config;
  }
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Accept"] = "application/json";
  return config;
});

// ERROR HANDLING
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      toast.error("Unauthorized — logging out...!");
      localStorage.clear();
      window.location.href = "/login";
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

// GET USER DETAILS
export const getUserDetails = (email) => {
  return api.get(ENDPOINTS.GETUSER, {
    params: { email: email },
  });
};

// DELETE USER DETAILS
export const deleteUserDetails = (email) => {
  return api.delete(ENDPOINTS.DELETEUSER, {
    params: { email },
  });
};

// GET CATEGORY BY ID
export const getUserById = async (id, email) => {
  const res = await getUserDetails(email);
  const users = res.data?.data || [];
  return users.find((user) => Number(user.auth_user_id) === Number(id));
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

// ADD PRODUCTS
export const addProduct = (payload) => {
  return api.post(ENDPOINTS.ADDPRODUCT, payload);
};

// ADD CATEGORY
export const addCategory = (payload) => {
  return api.post(ENDPOINTS.ADDCATEGORY, payload);
};

// UPDATE CATEGORY
export const updateCategory = (payload) => {
  return api.put(ENDPOINTS.EDITCATEGORY, payload);
};

// ADD SUBCATEGORY
export const addSubcategory = (payload) => {
  return api.post(ENDPOINTS.ADDSUBCATEGORY, payload);
};

// UPDATE SUBCATEGORY
export const updateSubCategory = (payload) => {
  return api.put(ENDPOINTS.EDITSUBCATEGORY, payload);
};

// GET CATEGORIES
export const getCategories = () => {
  return api.get(ENDPOINTS.CATEGORIES);
};

// GET CATEGORY BY ID
export const getCategoryById = async (id) => {
  const res = await getCategories();
  const categories = res.data?.data || [];
  const category = categories.find(
    (cat) =>
      Number(cat.id) === Number(id) || String(cat.category_id) === String(id)
  );
  return category;
};

// GET SUBCATEGORIES
export const getSubcategories = () => {
  return api.get(ENDPOINTS.SUBCATEGORIES);
};

// ERROR HANDLER
export const errorHandler = (error) => {
  return {
    statusCode: error?.response?.status || 500,
    message: error?.response?.data?.message || "Something went wrong",
  };
};

export default api;
