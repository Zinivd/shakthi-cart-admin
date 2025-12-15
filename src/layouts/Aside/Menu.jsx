import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  IconDashboard,
  IconDropdown,
  IconLogout,
  IconOrder,
  IconProduct,
  IconUser,
} from "../../../public/assets/Assets";
import { logoutApi } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Menu = () => {
  // Track which section is open
  const [openMenu, setOpenMenu] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleCollapse = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  // Get Location
  const location = useLocation();

  // Button Active / Inactive
  const dashboardActive = location.pathname.startsWith("/dashboard");
  const productActive = location.pathname.startsWith("/product");
  const customerActive = location.pathname.startsWith("/customer");
  const userActive = location.pathname.startsWith("/user");
  const salesActive = location.pathname.startsWith("/sales");
  const supportActive = location.pathname.startsWith("/support");

  const navigate = useNavigate();

  const handleLogout = async () => {
    const payload = {
      email: localStorage.getItem("email"),
    };
    setLoading(true);
    try {
      const res = await logoutApi(payload);
      toast.success(res.data.message || "Logout successful!");
      localStorage.clear();
      // Redirect
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Dashboard */}
      <li className="mb-2">
        <NavLink to="/dashboard">
          <button
            className={`asidebtn mx-auto ${dashboardActive ? "active" : ""}`}
          >
            <div className="btnname">
              <img src={IconDashboard} height="20px" alt="" />
              <span>Dashboard</span>
            </div>
            <div className="righticon d-flex ms-auto">
              <i className="fas fa-angle-right toggle-icon"></i>
            </div>
          </button>
        </NavLink>
      </li>

      {/* Product */}
      <li className="mb-2">
        <button
          className={`asidebtn mx-auto collapsed ${
            openMenu === "product" || productActive ? "active" : ""
          }`}
          onClick={() => toggleCollapse("product")}
          aria-expanded={openMenu === "product"}
        >
          <div className="btnname">
            <img src={IconProduct} height="20px" alt="" />
            <span>Products</span>
          </div>
          <div className="righticon d-flex ms-auto">
            <i
              className={`toggle-icon fas ${
                openMenu === "product" ? "fa-angle-down" : "fa-angle-right"
              }`}
            ></i>
          </div>
        </button>
        <div
          className={`collapse-wrapper ${openMenu === "product" ? "open" : ""}`}
        >
          <ul className="btn-toggle-nav list-unstyled text-start ps-5 pe-0 pb-3">
            <li>
              <Link
                to="/product/category/list"
                className="d-inline-flex text-decoration-none rounded mt-3"
              >
                Category List
              </Link>
            </li>
            <li>
              <Link
                to="/product/list"
                className="d-inline-flex text-decoration-none rounded"
              >
                Products List
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Customer */}
      <li className="mb-2">
        <button
          className={`asidebtn mx-auto collapsed ${
            openMenu === "customer" || customerActive ? "active" : ""
          }`}
          onClick={() => toggleCollapse("customer")}
          aria-expanded={openMenu === "customer"}
        >
          <div className="btnname">
            <img src={IconUser} height="20px" alt="" />
            <span>Customer</span>
          </div>
          <div className="righticon d-flex ms-auto">
            <i
              className={`toggle-icon fas ${
                openMenu === "customer" ? "fa-angle-down" : "fa-angle-right"
              }`}
            ></i>
          </div>
        </button>
        <div
          className={`collapse-wrapper ${
            openMenu === "customer" ? "open" : ""
          }`}
        >
          <ul className="btn-toggle-nav list-unstyled text-start ps-5 pe-0 pb-3">
            <li>
              <Link
                to="/customer/list"
                className="d-inline-flex text-decoration-none rounded mt-3"
              >
                Customers List
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Sales */}
      <li className="mb-2">
        <button
          className={`asidebtn mx-auto collapsed ${
            openMenu === "sales" || salesActive ? "active" : ""
          }`}
          onClick={() => toggleCollapse("sales")}
          aria-expanded={openMenu === "sales"}
        >
          <div className="btnname">
            <img src={IconOrder} height="20px" alt="" />
            <span>Sales</span>
          </div>
          <div className="righticon d-flex ms-auto">
            <i
              className={`toggle-icon fas ${
                openMenu === "sales" ? "fa-angle-down" : "fa-angle-right"
              }`}
            ></i>
          </div>
        </button>
        <div
          className={`collapse-wrapper ${openMenu === "sales" ? "open" : ""}`}
        >
          <ul className="btn-toggle-nav list-unstyled text-start ps-5 pe-0 pb-3">
            <li>
              <Link
                to="/sales/order/list"
                className="d-inline-flex text-decoration-none rounded mt-3"
              >
                Orders List
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Support */}
      {/* <li className="mb-2">
        <button
          className={`asidebtn mx-auto collapsed ${
            openMenu === "support" || supportActive ? "active" : ""
          }`}
          onClick={() => toggleCollapse("support")}
          aria-expanded={openMenu === "support"}
        >
          <div className="btnname">
            <img src={IconDropdown} height="20px" alt="" />
            <span>Support</span>
          </div>
          <div className="righticon d-flex ms-auto">
            <i
              className={`toggle-icon fas ${
                openMenu === "support" ? "fa-angle-down" : "fa-angle-right"
              }`}
            ></i>
          </div>
        </button>
        <div
          className={`collapse-wrapper ${openMenu === "support" ? "open" : ""}`}
        >
          <ul className="btn-toggle-nav list-unstyled text-start ps-5 pe-0 pb-3">
            <li>
              <Link
                to="/support/ticket/list"
                className="d-inline-flex text-decoration-none rounded mt-3"
              >
                Tickets List
              </Link>
            </li>
          </ul>
        </div>
      </li> */}

      {/* Logout */}
      <li className="mb-2">
        <button
          type="submit"
          disabled={loading}
          onClick={handleLogout}
          className="asidebtn mx-auto"
        >
          <div className="btnname">
            <img src={IconLogout} height="20px" alt="" />
            <span>
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Logout"
              )}
            </span>
          </div>
          <div className="righticon d-flex ms-auto">
            <i className="fas fa-angle-right toggle-icon"></i>
          </div>
        </button>
      </li>
    </>
  );
};

export default Menu;
