import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../layouts/Table/useTable.jsx";
import { getOrders } from "../../api/api.js";
import Loader from "../../components/Loader/Loader.jsx";
import { toast } from "react-toastify";

const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        if (res.data.success) {
          setData(res.data.data);
        } else {
          toast.error("Failed to fetch orders");
        }
      } catch (error) {
        toast.error("Server Error While Fetching Orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  if (loading) return <Loader />;

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
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.order_id}</td>
                    <td>{item.items.length}</td>
                    <td>{item.user_name}</td>
                    <td>₹ {item.total_amount}</td>
                    <td>{item.payment_mode}</td>
                    <td
                      className={
                        item.payment_status === "PAID"
                          ? "text-success"
                          : "text-warning"
                      }
                    >
                      {item.payment_status}
                    </td>
                    <td
                      className={
                        item.order_status === "Delivered"
                          ? "text-success"
                          : "text-primary"
                      }
                    >
                      {item.order_status}
                    </td>
                    <td>
                      <div className="d-flex align-items-center column-gap-2">
                        <Link to={`/sales/order/view/${item.id}`} title="View">
                          <i className="fas fa-external-link"></i>
                        </Link>
                        <a>
                          <i className="fas fa-download"></i>
                        </a>
                        {/* <a title="Delete">
                          <i className="fas fa-trash text-danger"></i>
                        </a> */}
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
