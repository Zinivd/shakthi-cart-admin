import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../api/api.js";
import useTable from "../../../layouts/Table/useTable.jsx";
import Loader from "../../../components/Loader/Loader.jsx";
import { toast } from "react-toastify";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const products = res.data?.data || [];
        setData(products);
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  } = useTable(data, 5);

  if (loading) return <Loader />;

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
                <th>Brand</th>
                <th>Name</th>
                <th>Category</th>
                <th>Info</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.product_id}</td>
                    <td>{item.brand}</td>
                    <td>{item.product_name}</td>
                    <td>{item.category_name}</td>
                    <td>
                      Actual - <span>₹ {item.actual_price}</span> <br />
                      Selling - <span>₹ {item.selling_price}</span> <br />
                      Discount - <span>₹ {item.discount}</span>
                    </td>
                    <td>
                      {item.size_unit
                        ?.map((s) => `${s.size} - ${s.qty}`)
                        .join(", ")}
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link to={`/product/view/${item.product_id}`}>
                          <i className="fas fa-external-link"></i>
                        </Link>
                        <Link to={`/product/edit/${item.product_id}`}>
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
