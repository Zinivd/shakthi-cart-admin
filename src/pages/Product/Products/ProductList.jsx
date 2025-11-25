import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../../layouts/Table/useTable.jsx";

const ProductList = () => {
  const [data] = useState([
    {
      id: 1,
      code: "PRDT001",
      name: "T-Shirt",
      actual: "1000",
      selling: "990",
      stock: "10",
      published: "Yes",
      availability: "In Stock",
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
        <h4>Products List</h4>
        <Link to="/product/add">
          <button className="listbtn">Add Product</button>
        </Link>
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
                <th>Code</th>
                <th>Name</th>
                <th>Info</th>
                <th>Stock</th>
                <th>Published</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>
                      Acutal - <span>₹ {item.actual}</span> <br />
                      Selling - <span>₹ {item.selling}</span>
                    </td>
                    <td>{item.stock}</td>
                    <td>{item.published}</td>
                    <td>
                      <span
                        className={`${
                          item.availability === "In Stock"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {item.availability}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link to={`/product/view/${item.id}`} title="View">
                          <i className="fas fa-external-link"></i>
                        </Link>
                        <Link to={`/product/edit/${item.id}`} title="Edit">
                          <i className="fas fa-pen-to-square"></i>
                        </Link>
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

export default ProductList;
