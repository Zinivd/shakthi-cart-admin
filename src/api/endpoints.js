const ENDPOINTS = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: (id) => `/products/${id}`,
  ADDPRODUCT: "/product/create",
  CATEGORIES: "/category/all",
  SUBCATEGORIES: "/subcategories",
  ADDCATEGORY: "/category/create",
  ADDSUBCATEGORY: "/subcategory/create",
  EDITCATEGORY: `/category/update`,
  EDITSUBCATEGORY: `/subcategories/update`,
  ORDERS: "/orders",
  USERINFO: "/user/info"
};

export default ENDPOINTS;
