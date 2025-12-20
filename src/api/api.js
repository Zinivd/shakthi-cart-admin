import axios from "axios";
import BASE_URL from "./baseUrl";
import ENDPOINTS from "./endpoints";
import { toast } from "react-toastify";

// AXIOS INSTANCE
const api = axios.create({
  baseURL: BASE_URL,
});

// API CALLS
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (
    config.url &&
    (config.url.includes(ENDPOINTS.LOGIN) ||
      config.url.includes(ENDPOINTS.REGISTER))
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

    // Unauthorized
    if (status === 401) {
      toast.error("Unauthorized — logging out...");
      localStorage.clear();
      window.location.href = "/login";
    }

    // API not found / invalid token / session issue
    if (status === 404) {
      console.error("API not found or invalid session");
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

// GET CUSTOMER DETAILS
export const getCustomer = (email) => {
  return api.get(ENDPOINTS.GETCUSTOMER, {
    params: { email: email },
  });
};

// DELETE CUUSTOMER DETAILS
export const deleteCustomer = (unique_id) => {
  return api.delete(ENDPOINTS.DELETECUSTOMER, {
    data: { unique_id },
  });
};

// GET CUSTOMER BY ID
export const getCustomerById = (unique_id) => {
  return api.get(ENDPOINTS.GETCUSTOMERBYID, {
    params: { unique_id },
  });
};

// GET CUSTOMER ADDRESS
export const getCustomerAddress = (user_id) => {
  return api.get(ENDPOINTS.GETADDRESS, {
    params: { user_id },
  });
};

// GET ALL PRODUCTS
export const getProducts = () => {
  return api.get(ENDPOINTS.GETPRODUCTS);
};

// GET PRODUCT BY ID
export const getProductById = async (productId) => {
  return api.get(`${ENDPOINTS.GETPRODUCTBYID}`, {
    params: { product_id: productId },
  });
};

// ADD PRODUCTS
export const addProduct = (payload) => {
  return api.post(ENDPOINTS.ADDPRODUCT, payload);
};

// EDIT PRODUCTS
export const editProduct = (payload) => {
  return api.post(ENDPOINTS.EDITPRODUCT, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ADD REVIEW
export const addReview = (payload) => {
  return api.post(ENDPOINTS.ADDREVIEW, payload);
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

// GET ORDERS
export const getOrders = () => {
  return api.get(ENDPOINTS.GETORDERS);
};

// GET ORDER BY ID
export const getOrderById = async (id) => {
  const res = await getOrders();
  const orders = res.data?.data || [];
  const order = orders.find(
    (item) =>
      String(item.id) === String(id) || String(item.order_id) === String(id)
  );
  return order || null;
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (payload) => {
  return api.put(ENDPOINTS.UPDATEORDERSTS, payload);
};

// ERROR HANDLER
export const errorHandler = (error) => {
  return {
    statusCode: error?.response?.status || 500,
    message: error?.response?.data?.message || "Something went wrong",
  };
};

export default api;
