const ENDPOINTS = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  GETCUSTOMER: "/customers-list",
  GETCUSTOMERBYID: "/customers-list-byId",
  GETADDRESS: "/address/by-user",
  DELETECUSTOMER: "/user/delete",
  GETPRODUCTS: "/product/all",
  GETPRODUCTBYID: "/product/by-id",
  ADDPRODUCT: "/product/create",
  EDITPRODUCT: "/product/update",
  ADDREVIEW: "/admin/product/review",
  CATEGORIES: "/category/all",
  SUBCATEGORIES: "/subcategories",
  ADDCATEGORY: "/category/create",
  ADDSUBCATEGORY: "/subcategory/create",
  EDITCATEGORY: `/category/update`,
  EDITSUBCATEGORY: `/subcategories/update`,
  GETORDERS: "/order/list",
  UPDATEORDERSTS: "/order/update-status",
  USERINFO: "/user/info"
};

export default ENDPOINTS;
