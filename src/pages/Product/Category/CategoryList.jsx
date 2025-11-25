import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../../layouts/Table/useTable.jsx";

const CategoryList = () => {
  const [data] = useState([
    {
      id: 1,
      code: "CAT001",
      category: "Women",
      subCategory: 3,
      description: "Women Category",
      status: "Active",
    },
    {
      id: 2,
      code: "CAT002",
      category: "Men",
      subCategory: 2,
      description: "Men Category",
      status: "Inactive",
    },
    {
      id: 3,
      code: "CAT003",
      category: "Kids",
      subCategory: 1,
      description: "Kids Category",
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
        <h4>Category List</h4>
        <Link to="/category/add">
          <button className="listbtn">Add Category</button>
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
                <th>Category</th>
                <th>SubCategory</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.code}</td>
                    <td>{item.category}</td>
                    <td>{item.subCategory}</td>
                    <td>{item.description}</td>
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
                      <div className="d-flex align-items-center gap-2">
                        <Link to={`/category/view/${item.id}`} title="View">
                          <i className="fas fa-external-link"></i>
                        </Link>
                        <Link to={`/category/edit/${item.id}`} title="Edit">
                          <i className="fas fa-pen-to-square"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
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

export default CategoryList;
