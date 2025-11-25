import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../layouts/Table/useTable.jsx";

const TicketList = () => {
  const [data] = useState([
    {
      id: 1,
      ticket: "TKT001",
      sendDate: "10-10-2025",
      subject: "Payment Related",
      user: "Sheik",
      status: "Solved",
      lastReply: "16-10-2025",
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
        <h4>Ticket List</h4>
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
                <th>Ticket ID</th>
                <th>Sending Date</th>
                <th>Subject</th>
                <th>User</th>
                <th>Status</th>
                <th>Last Reply</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.ticket}</td>
                    <td>{item.sendDate}</td>
                    <td>{item.subject}</td>
                    <td>{item.user}</td>
                    <td>
                      <span
                        className={`${
                          item.status === "Solved"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.lastReply}</td>
                    <td>
                      <div className="d-flex align-items-center column-gap-2">
                        <Link to="#" title="View">
                          <i className="fas fa-external-link"></i>
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

export default TicketList;
