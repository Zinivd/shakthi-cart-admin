import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  IconDashboard,
  IconDropdown,
  IconLogout,
  IconOrder,
  IconProduct,
  IconUser,
} from "../../assets/Assets";

const Menu = () => {
  // Track which section is open
  const [openMenu, setOpenMenu] = useState(null);

  const toggleCollapse = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  // Get Location
  const location = useLocation();

  // Button Active / Inactive
  const dashboardActive = location.pathname.startsWith("/");
  const productActive = location.pathname.startsWith("/product");
  const categoryActive = location.pathname.startsWith("/category");
  const customerActive = location.pathname.startsWith("/customer");
  const orderActive = location.pathname.startsWith("/order");
  const ticketActive = location.pathname.startsWith("/ticket");

  return (
    <>
      {/* Dashboard */}
      <li className="mb-2">
        <NavLink to="/">
          <button className="asidebtn mx-auto">
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
            openMenu === "product" ? "active" : ""
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
                to="/product/list"
                className="d-inline-flex text-decoration-none rounded mt-3"
              >
                Products List
              </Link>
            </li>
            <li>
              <Link
                to="/category/list"
                className="d-inline-flex text-decoration-none rounded"
              >
                Category List
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Customer */}
      <li className="mb-2">
        <button
          className={`asidebtn mx-auto collapsed ${
            openMenu === "customer" ? "active" : ""
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
            openMenu === "sales" ? "active" : ""
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
                to="/order/list"
                className="d-inline-flex text-decoration-none rounded mt-3"
              >
                Orders List
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Support */}
      <li className="mb-2">
        <button
          className={`asidebtn mx-auto collapsed ${
            openMenu === "support" ? "active" : ""
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
                to="/ticket/list"
                className="d-inline-flex text-decoration-none rounded mt-3"
              >
                Tickets List
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Logout */}
      <li className="mb-2">
        <NavLink to="/logout">
          <button className="asidebtn mx-auto">
            <div className="btnname">
              <img src={IconLogout} height="20px" alt="" />
              <span>Logout</span>
            </div>
            <div className="righticon d-flex ms-auto">
              <i className="fas fa-angle-right toggle-icon"></i>
            </div>
          </button>
        </NavLink>
      </li>
    </>
  );
};

export default Menu;
