import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTable from "../../layouts/Table/useTable.jsx";
import { getCustomer, deleteCustomer } from "../../api/api.js";
import Loader from "../../components/Loader/Loader.jsx";
import { toast } from "react-toastify";

const CustomerList = () => {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) return;
    const fetchData = async () => {
      try {
        const res = await getCustomer(email);
        const users = res.data.data;
        setUsers(users);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!email) return;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getCustomer(email);
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (unique_id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteCustomer(unique_id);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.unique_id !== unique_id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete user");
    }
  };

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
  } = useTable(user, 5);

  if (loading) return <Loader />;
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
                <th>Code</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email ID</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.unique_id}</td>
                    <td>{item.name}</td>
                    <td>+91 {item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                      <span className="text-capitalize">{item.user_type}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center column-gap-2">
                        <a
                          onClick={() => handleDelete(item.unique_id)}
                          title="Delete"
                        >
                          <i className="fas fa-trash text-danger"></i>
                        </a>
                        <Link
                          to={`/customer/view/${item.unique_id}`}
                          title="View"
                        >
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

export default CustomerList;
