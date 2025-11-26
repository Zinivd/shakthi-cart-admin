import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../layouts/Table/useTable.jsx";

const OrderList = () => {
  const [data] = useState([
    {
      id: 1,
      orderid: "ORD001",
      products: "6",
      customer: "Sheik",
      seller: "Inhouse Order",
      amount: "1000",
      method: "UPI",
      status: "Paid",
    },
  ]);

  const {
    search,
    setSearch,
    sortColumn,
    sortOrder,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  } = useTable(data, 5);
  return (
    <div className="container-fluid px-0">
      <div className="body-head mb-3">
        <h4>Order List</h4>
      </div>
      <div className="list-table">
        <div className="filter-container mb-2">
          <div className="filter-container-start">
            <input
              type="text"
              placeholder="Search Here..."
              className="form-control"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Products</th>
                <th>Customer</th>
                <th>Seller</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.orderid}</td>
                    <td>{item.products}</td>
                    <td>{item.customer}</td>
                    <td>{item.seller}</td>
                    <td>₹ {item.amount}</td>
                    <td>{item.method}</td>
                    <td>
                      <span
                        className={`${
                          item.status === "Paid"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center column-gap-2">
                        <Link to={`/sales/order/view/${item.id}`}>
                          <i className="fas fa-external-link"></i>
                        </Link>
                        <a>
                          <i className="fas fa-download"></i>
                        </a>
                        <a title="Delete">
                          <i className="fas fa-trash text-danger"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="paginate-div mt-3">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="d-flex gap-2">
            <button
              className="paginatebtn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>
            <button
              className="paginatebtn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
