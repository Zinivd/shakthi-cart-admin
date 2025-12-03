import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./PrivateRoute.jsx";

// CSS
import "../public/assets/css/Style.css";
import "../public/assets/css/Aside.css";
import "../public/assets/css/Navbar.css";
import "../public/assets/css/Form.css";
import "../public/assets/css/List.css";
import "../public/assets/css/Modal.css";
import "../public/assets/css/Select2.css";
import "../public/assets/css/Profile.css";
import "../public/assets/css/Dashboard.css";

// Layouts
import Main from "./layouts/Main";
import Offcanvas from "./layouts/Aside/Offcanvas";

// Login / Dashboard
import Login from "./pages/Portal/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

// Products
import ProductList from "./pages/Product/Products/ProductList.jsx";
import ProductAdd from "./pages/Product/Products/ProductAdd.jsx";
import ProductEdit from "./pages/Product/Products/ProductEdit.jsx";
import ProductView from "./pages/Product/Products/ProductView.jsx";

// Category
import CategoryList from "./pages/Product/Category/CategoryList.jsx";
import CategoryAdd from "./pages/Product/Category/CategoryAdd.jsx";
import CategoryEdit from "./pages/Product/Category/CategoryEdit.jsx";
import CategoryView from "./pages/Product/Category/CategoryView.jsx";

// Customer
import CustomerList from "./pages/Customer/CustomerList.jsx";

// Sales
import OrderList from "./pages/Sales/OrderList.jsx";
import OrderView from "./pages/Sales/OrderView.jsx";

// Support
import TicketList from "./pages/Support/TicketList.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer
          theme="light"
          position="bottom-right"
          autoClose={2000}
        />
        <Offcanvas />
        <Routes>
          {/* Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />}>
            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* Product */}
            <Route path="/product/list" element={<ProductList />} />
            <Route path="/product/add" element={<ProductAdd />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route path="/product/view/:id" element={<ProductView />} />
            {/* Category */}
            <Route path="/product/category/list" element={<CategoryList />} />
            <Route path="/product/category/add" element={<CategoryAdd />} />
            <Route
              path="/product/category/edit/:id"
              element={<CategoryEdit />}
            />
            <Route
              path="/product/category/view/:id"
              element={<CategoryView />}
            />
            {/* Customer */}
            <Route path="/customer/list" element={<CustomerList />} />
            {/* Sales */}
            <Route path="/sales/order/list" element={<OrderList />} />
            <Route path="/sales/order/view/:id" element={<OrderView />} />
            {/* Support */}
            <Route path="/support/ticket/list" element={<TicketList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
