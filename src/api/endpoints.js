const ENDPOINTS = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: (id) => `/products/${id}`,
  ORDERS: "/orders",
  USERINFO: "/user-info"
};

export default ENDPOINTS;
