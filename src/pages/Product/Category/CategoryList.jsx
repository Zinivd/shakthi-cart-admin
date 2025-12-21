import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTable from "../../../layouts/Table/useTable.jsx";
import { getCategories, getSubcategories } from "../../../api/api.js";
import Loader from "../../../components/Loader/Loader.jsx";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getCategories();
        const subRes = await getSubcategories();

        const categories = catRes.data.data;
        const subcategories = subRes.data.data;

        // Attach subcategory count to each category
        const finalData = categories.map((cat) => ({
          id: cat.category_id,
          category: cat.category_name,
          image: cat.image,
          subCategory: subcategories.filter(
            (sub) => sub.category_id === cat.category_id
          ).length,
        }));

        setData(finalData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  } = useTable(data, 5);

  if (loading)
    return (
      <Loader />
    );
  return (
    <div className="container-fluid px-0">
      <div className="body-head mb-3">
        <h4>Category List</h4>
        <Link to="/product/category/add">
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
                <th>Image</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id || "-"}</td>
                    <td><img src={item.image} height="50px" width="50px" className="rounded object-fit-cover object-top" /></td>
                    <td>{item.category || "-"}</td>
                    <td>{item.subCategory || "-"}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={`/product/category/view/${item.id}`}
                          title="View"
                        >
                          <i className="fas fa-external-link"></i>
                        </Link>

                        <Link
                          to={`/product/category/edit/${item.id}`}
                          title="Edit"
                        >
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