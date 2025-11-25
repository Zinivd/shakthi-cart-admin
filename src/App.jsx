import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "./assets/css/Style.css";
import "./assets/css/Aside.css";
import "./assets/css/Navbar.css";
import "./assets/css/Form.css";
import "./assets/css/List.css";
import "./assets/css/Modal.css";
import "./assets/css/Select2.css";
import "./assets/css/Profile.css";
import "./assets/css/Dashboard.css";

// Layouts
import Main from "./layouts/Main";
import Offcanvas from "./layouts/Aside/Offcanvas";

// Dashboard
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
        <ToastContainer />
        <Offcanvas />
        <Routes>
          <Route path="/" element={<Main />}>
            {/* Dashboard */}
            <Route index element={<Dashboard />} />
            {/* Product */}
            <Route path="/product/list" element={<ProductList />} />
            <Route path="/product/add" element={<ProductAdd />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route path="/product/view/:id" element={<ProductView />} />
            {/* Category */}
            <Route path="/category/list" element={<CategoryList />} />
            <Route path="/category/add" element={<CategoryAdd />} />
            <Route path="/category/edit/:id" element={<CategoryEdit />} />
            <Route path="/category/view/:id" element={<CategoryView />} />
            {/* Customer */}
            <Route path="/customer/list" element={<CustomerList />} />
            {/* Sales */}
            <Route path="/order/list" element={<OrderList />} />
            <Route path="/order/view/:id" element={<OrderView />} />
            {/* Support */}
            <Route path="/ticket/list" element={<TicketList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
