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

  if (loading) return <Loader />;

  return (
    <div className="container-fluid px-0">
      <div className="page-header-bar mb-3">
        <h4>Categories</h4>
        <Link to="/product/category/add">
          <button className="listbtn">
            <i className="fas fa-plus"></i> Add Category
          </button>
        </Link>
      </div>

      <div className="list-table">
        <div className="filter-container mb-2">
          <div className="filter-container-start">
            <input
              type="text"
              placeholder="Search ..."
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
                <th>S.NO</th>
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
                    <td>
                      <img
                        src={item.image}
                        className="cat-thumb rounded object-fit-cover object-top"
                      />
                    </td>
                    <td>{item.category || "-"}</td>
                    <td>{item.subCategory || "-"}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2 action-icons">
                        <Link to={`/product/category/view/${item.id}`} title="View">
                          <span className="icon-circle">
                            <i className="fas fa-eye"></i>
                          </span>
                        </Link>
                        <Link to={`/product/category/edit/${item.id}`} title="Edit">
                          <span className="icon-circle">
                            <i className="fas fa-pen-to-square"></i>
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
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

export default CategoryList;