import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../layouts/Table/useTable.jsx";

const CustomerList = () => {
  const [data] = useState([
    {
      id: 1,
      name: "Sheik",
      email: "sheik@gmail.com",
      contact: "+91 8608338833",
      package: "Basic",
      wallet: "100",
      status: "Active",
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
        <h4>Customer List</h4>
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
                <th>Name</th>
                <th>Email ID</th>
                <th>Contact Number</th>
                <th>Package</th>
                <th>Wallet Balance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.package}</td>
                    <td>₹ {item.wallet}</td>
                    <td>
                      <span
                        className={`${
                          item.status === "Active"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center column-gap-2">
                        <a title="Edit">
                          <i className="fas fa-pen-to-square"></i>
                        </a>
                        <a title="Inactive">
                          <i className="fas fa-circle-xmark text-danger"></i>
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
                  <td colSpan="8" className="text-center">
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

export default CustomerList;
